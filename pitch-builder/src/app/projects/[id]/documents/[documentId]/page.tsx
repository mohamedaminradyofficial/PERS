'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import SeriesBibleEditor from '@/components/editors/SeriesBibleEditor'
import FilmLookbookEditor from '@/components/editors/FilmLookbookEditor'
import PitchDeckEditor from '@/components/editors/PitchDeckEditor'

interface Document {
  id: string
  type: string
  sections: any
  createdAt: string
  updatedAt: string
  project: {
    id: string
    title: string
  }
}

export default function DocumentEditorPage() {
  const params = useParams()
  const router = useRouter()
  const [document, setDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDocument()
  }, [params.documentId])

  const fetchDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${params.documentId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch document')
      }
      const data = await response.json()
      setDocument(data)
    } catch (err) {
      setError('فشل في تحميل المستند')
      console.error('Error fetching document:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (sections: any) => {
    try {
      const response = await fetch(`/api/documents/${params.documentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sections })
      })

      if (!response.ok) {
        throw new Error('Failed to save document')
      }

      const updatedDocument = await response.json()
      setDocument(updatedDocument)
    } catch (err) {
      console.error('Error saving document:', err)
      throw err
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
          <p className="mt-4 text-slate-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'المستند غير موجود'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            العودة إلى لوحة التحكم
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {document.type === 'SERIES_BIBLE' && (
        <SeriesBibleEditor
          documentId={document.id}
          initialSections={document.sections}
          onSave={handleSave}
        />
      )}
      {document.type === 'FILM_LOOKBOOK' && (
        <FilmLookbookEditor
          documentId={document.id}
          initialSections={document.sections}
          onSave={handleSave}
        />
      )}
      {document.type === 'PITCH_DECK' && (
        <PitchDeckEditor
          documentId={document.id}
          initialSections={document.sections}
          onSave={handleSave}
        />
      )}
    </>
  )
}
