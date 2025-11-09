'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

type DocumentType = 'SERIES_BIBLE' | 'FILM_LOOKBOOK' | 'PITCH_DECK'

export default function NewDocument() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type = (searchParams.get('type') as DocumentType) || 'SERIES_BIBLE'

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create project first
      const projectRes = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
        }),
      })

      if (!projectRes.ok) throw new Error('Failed to create project')

      const project = await projectRes.json()

      // Create document
      const docRes = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          type,
          sections: {},
        }),
      })

      if (!docRes.ok) throw new Error('Failed to create document')

      const document = await docRes.json()

      // Redirect to appropriate editor
      router.push(`/dashboard/documents/${document.id}/edit`)
    } catch (error) {
      console.error('Error creating document:', error)
      alert('Failed to create document. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const typeLabels = {
    SERIES_BIBLE: { title: 'TV Series Bible', icon: '📺' },
    FILM_LOOKBOOK: { title: 'Film Lookbook', icon: '🎬' },
    PITCH_DECK: { title: 'Pitch Deck', icon: '📊' },
  }

  const currentType = typeLabels[type]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Pitch Builder
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-slate-600 hover:text-slate-900 transition"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{currentType.icon}</div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Create {currentType.title}
              </h1>
              <p className="text-slate-600">
                Fill in the basic information to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter your project title"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Brief description of your project"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading || !title.trim()}
                  className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating...' : 'Create & Start Editing'}
                </button>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
