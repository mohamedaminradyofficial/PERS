'use client'

import { useState, useEffect } from 'react'

interface Episode {
  id: string
  episodeNumber: number
  title: string
  synopsis?: string
}

interface Season {
  id: string
  seasonNumber: number
  title?: string
  arc?: string
  episodes: Episode[]
}

interface SeasonManagerProps {
  documentId: string
}

export default function SeasonManager({ documentId }: SeasonManagerProps) {
  const [seasons, setSeasons] = useState<Season[]>([])
  const [isAddingSeason, setIsAddingSeason] = useState(false)
  const [selectedSeasonId, setSelectedSeasonId] = useState<string | null>(null)
  const [isAddingEpisode, setIsAddingEpisode] = useState(false)
  const [seasonForm, setSeasonForm] = useState({
    seasonNumber: 1,
    title: '',
    arc: ''
  })
  const [episodeForm, setEpisodeForm] = useState({
    episodeNumber: 1,
    title: '',
    synopsis: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSeasons()
  }, [documentId])

  const fetchSeasons = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}/seasons`)
      if (response.ok) {
        const data = await response.json()
        setSeasons(data)
      }
    } catch (error) {
      console.error('Failed to fetch seasons:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSeasonSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/documents/${documentId}/seasons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(seasonForm)
      })

      if (response.ok) {
        const newSeason = await response.json()
        setSeasons([...seasons, newSeason])
        setSeasonForm({
          seasonNumber: seasons.length + 2,
          title: '',
          arc: ''
        })
        setIsAddingSeason(false)
      }
    } catch (error) {
      console.error('Failed to create season:', error)
    }
  }

  const handleEpisodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedSeasonId) return

    try {
      const response = await fetch(`/api/seasons/${selectedSeasonId}/episodes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(episodeForm)
      })

      if (response.ok) {
        const newEpisode = await response.json()
        setSeasons(seasons.map(season => {
          if (season.id === selectedSeasonId) {
            return {
              ...season,
              episodes: [...season.episodes, newEpisode]
            }
          }
          return season
        }))
        setEpisodeForm({
          episodeNumber: episodeForm.episodeNumber + 1,
          title: '',
          synopsis: ''
        })
        setIsAddingEpisode(false)
      }
    } catch (error) {
      console.error('Failed to create episode:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-4">جاري التحميل...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">المواسم / Seasons</h3>
        <button
          onClick={() => setIsAddingSeason(!isAddingSeason)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          {isAddingSeason ? 'إلغاء' : '+ إضافة موسم'}
        </button>
      </div>

      {/* Add Season Form */}
      {isAddingSeason && (
        <form onSubmit={handleSeasonSubmit} className="p-6 bg-slate-50 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              رقم الموسم / Season Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={seasonForm.seasonNumber}
              onChange={(e) => setSeasonForm({ ...seasonForm, seasonNumber: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">العنوان / Title</label>
            <input
              type="text"
              value={seasonForm.title}
              onChange={(e) => setSeasonForm({ ...seasonForm, title: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">قوس القصة / Story Arc</label>
            <textarea
              value={seasonForm.arc}
              onChange={(e) => setSeasonForm({ ...seasonForm, arc: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            إضافة الموسم
          </button>
        </form>
      )}

      {/* Seasons List */}
      {seasons.length === 0 && !isAddingSeason ? (
        <div className="text-center py-12 text-slate-500">
          <p>لا توجد مواسم بعد</p>
          <p className="text-sm mt-1">No seasons added yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {seasons.map((season) => (
            <div key={season.id} className="p-6 bg-white border border-slate-200 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">
                    Season {season.seasonNumber}
                    {season.title && `: ${season.title}`}
                  </h4>
                  {season.arc && (
                    <p className="text-sm text-slate-600 mt-1">{season.arc}</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedSeasonId(season.id)
                    setEpisodeForm({
                      episodeNumber: season.episodes.length + 1,
                      title: '',
                      synopsis: ''
                    })
                    setIsAddingEpisode(true)
                  }}
                  className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200"
                >
                  + إضافة حلقة
                </button>
              </div>

              {/* Add Episode Form */}
              {isAddingEpisode && selectedSeasonId === season.id && (
                <form onSubmit={handleEpisodeSubmit} className="mb-4 p-4 bg-slate-50 rounded space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">رقم الحلقة</label>
                      <input
                        type="number"
                        min="1"
                        value={episodeForm.episodeNumber}
                        onChange={(e) => setEpisodeForm({ ...episodeForm, episodeNumber: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">العنوان</label>
                      <input
                        type="text"
                        value={episodeForm.title}
                        onChange={(e) => setEpisodeForm({ ...episodeForm, title: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">الملخص</label>
                    <textarea
                      value={episodeForm.synopsis}
                      onChange={(e) => setEpisodeForm({ ...episodeForm, synopsis: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900 h-16"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-1 text-sm bg-slate-900 text-white rounded hover:bg-slate-800"
                    >
                      إضافة
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingEpisode(false)}
                      className="px-4 py-1 text-sm bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              )}

              {/* Episodes List */}
              {season.episodes.length > 0 ? (
                <div className="space-y-2">
                  {season.episodes.map((episode) => (
                    <div key={episode.id} className="p-3 bg-slate-50 rounded">
                      <div className="font-medium text-sm">
                        Episode {episode.episodeNumber}: {episode.title}
                      </div>
                      {episode.synopsis && (
                        <p className="text-xs text-slate-600 mt-1">{episode.synopsis}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">
                  لا توجد حلقات / No episodes yet
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
