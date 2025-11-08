'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Document {
  id: string
  type: string
  createdAt: string
  updatedAt: string
}

interface Project {
  id: string
  title: string
  description?: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProject()
    fetchDocuments()
  }, [params.id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
      }
    } catch (err) {
      setError('فشل في تحميل المشروع')
      console.error('Error fetching project:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}/documents`)
      if (response.ok) {
        const data = await response.json()
        setDocuments(data)
      }
    } catch (err) {
      console.error('Error fetching documents:', err)
    }
  }

  const getDocumentTypeName = (type: string) => {
    switch (type) {
      case 'SERIES_BIBLE':
        return { en: 'TV Series Bible', ar: 'كتاب المسلسل', icon: '📺' }
      case 'FILM_LOOKBOOK':
        return { en: 'Film Lookbook', ar: 'لوك بوك الفيلم', icon: '🎬' }
      case 'PITCH_DECK':
        return { en: 'Pitch Deck', ar: 'العرض التقديمي', icon: '📊' }
      default:
        return { en: type, ar: type, icon: '📄' }
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

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'المشروع غير موجود'}</p>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
              ← Back
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{project.title}</h1>
              {project.description && (
                <p className="text-sm text-slate-600">{project.description}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">المستندات / Documents</h2>
            <Link
              href={`/projects/${params.id}/documents/new`}
              className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-semibold"
            >
              + مستند جديد
            </Link>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">لا توجد مستندات بعد</h3>
              <p className="text-slate-600 mb-6">ابدأ بإنشاء مستند جديد</p>
              <Link
                href={`/projects/${params.id}/documents/new`}
                className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-semibold"
              >
                + إنشاء مستند جديد
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((document) => {
                const docType = getDocumentTypeName(document.type)
                return (
                  <Link
                    key={document.id}
                    href={`/projects/${params.id}/documents/${document.id}`}
                    className="block bg-white rounded-lg shadow-sm hover:shadow-md transition p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{docType.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-900 mb-1">
                          {docType.en}
                        </h3>
                        <p className="text-sm text-slate-600 mb-2" dir="rtl">
                          {docType.ar}
                        </p>
                        <div className="text-xs text-slate-400">
                          آخر تحديث: {new Date(document.updatedAt).toLocaleDateString('ar-EG')}
                        </div>
                      </div>
                      <div className="text-slate-400">→</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
