'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SeriesBibleEditor from '@/components/editors/SeriesBibleEditor'
import FilmLookbookEditor from '@/components/editors/FilmLookbookEditor'
import PitchDeckEditor from '@/components/editors/PitchDeckEditor'

type DocumentType = 'SERIES_BIBLE' | 'FILM_LOOKBOOK' | 'PITCH_DECK'

interface Document {
  id: string
  type: DocumentType
  sections: any
  project: {
    id: string
    title: string
  }
}

export default function EditDocument({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [document, setDocument] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchDocument()
  }, [resolvedParams.id])

  const fetchDocument = async () => {
    try {
      const res = await fetch(`/api/documents/${resolvedParams.id}`)
      if (!res.ok) throw new Error('Failed to fetch document')
      const data = await res.json()
      setDocument(data)
    } catch (error) {
      console.error('Error fetching document:', error)
      alert('Failed to load document')
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (sections: any) => {
    setIsSaving(true)
    try {
      const res = await fetch(`/api/documents/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
      })

      if (!res.ok) throw new Error('Failed to save document')

      setDocument((prev) => prev ? { ...prev, sections } : null)
      alert('Document saved successfully!')
    } catch (error) {
      console.error('Error saving document:', error)
      alert('Failed to save document')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-slate-600">Loading document...</p>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-xl text-slate-600">Document not found</p>
          <Link href="/dashboard" className="mt-4 inline-block px-6 py-3 bg-slate-900 text-white rounded-lg">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
              ← Back
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {document.project.title}
              </h1>
              <p className="text-sm text-slate-600">
                {document.type.replace('_', ' ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSave(document.sections)}
            disabled={isSaving}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      {/* Editor */}
      <main className="container mx-auto px-4 py-8">
        {document.type === 'SERIES_BIBLE' && (
          <SeriesBibleEditor
            documentId={document.id}
            sections={document.sections}
            onSave={handleSave}
          />
        )}
        {document.type === 'FILM_LOOKBOOK' && (
          <FilmLookbookEditor
            documentId={document.id}
            sections={document.sections}
            onSave={handleSave}
          />
        )}
        {document.type === 'PITCH_DECK' && (
          <PitchDeckEditor
            documentId={document.id}
            sections={document.sections}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  )
}
