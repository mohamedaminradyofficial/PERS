'use client'

import { useState, useEffect } from 'react'

interface Character {
  id: string
  name: string
  description: string
  motivation?: string
  arc?: string
  imageUrl?: string
  order: number
}

interface CharacterManagerProps {
  documentId: string
}

export default function CharacterManager({ documentId }: CharacterManagerProps) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    motivation: '',
    arc: '',
    imageUrl: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCharacters()
  }, [documentId])

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}/characters`)
      if (response.ok) {
        const data = await response.json()
        setCharacters(data)
      }
    } catch (error) {
      console.error('Failed to fetch characters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/documents/${documentId}/characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          order: characters.length
        })
      })

      if (response.ok) {
        const newCharacter = await response.json()
        setCharacters([...characters, newCharacter])
        setFormData({
          name: '',
          description: '',
          motivation: '',
          arc: '',
          imageUrl: ''
        })
        setIsAdding(false)
      }
    } catch (error) {
      console.error('Failed to create character:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-4">جاري التحميل...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">الشخصيات / Characters</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          {isAdding ? 'إلغاء' : '+ إضافة شخصية'}
        </button>
      </div>

      {/* Add Character Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 bg-slate-50 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              الاسم / Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              الوصف / Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الدوافع / Motivation</label>
            <textarea
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              قوس التطور / Character Arc
            </label>
            <textarea
              value={formData.arc}
              onChange={(e) => setFormData({ ...formData, arc: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">رابط الصورة / Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            إضافة الشخصية
          </button>
        </form>
      )}

      {/* Characters List */}
      {characters.length === 0 && !isAdding ? (
        <div className="text-center py-12 text-slate-500">
          <p>لا توجد شخصيات بعد</p>
          <p className="text-sm mt-1">No characters added yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {characters.map((character) => (
            <div key={character.id} className="p-6 bg-white border border-slate-200 rounded-lg">
              {character.imageUrl && (
                <div className="mb-4">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <h4 className="text-lg font-semibold mb-2">{character.name}</h4>
              <p className="text-sm text-slate-600 mb-3">{character.description}</p>

              {character.motivation && (
                <div className="mb-2">
                  <span className="text-xs font-medium text-slate-500">الدوافع:</span>
                  <p className="text-sm">{character.motivation}</p>
                </div>
              )}

              {character.arc && (
                <div>
                  <span className="text-xs font-medium text-slate-500">قوس التطور:</span>
                  <p className="text-sm">{character.arc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
