'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Project {
  id: string
  title: string
  description?: string
  status: string
  createdAt: string
  updatedAt: string
  _count: {
    documents: number
    teamMembers: number
    comments: number
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError('فشل في تحميل المشاريع')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800'
      case 'IN_REVIEW':
        return 'bg-blue-100 text-blue-800'
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'مسودة'
      case 'IN_REVIEW':
        return 'قيد المراجعة'
      case 'APPROVED':
        return 'معتمد'
      case 'ARCHIVED':
        return 'مؤرشف'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              Pitch Builder
            </Link>
            <div className="text-sm text-slate-600">Dashboard</div>
          </div>
          <nav className="flex gap-4">
            <Link
              href="/templates"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition"
            >
              Templates
            </Link>
            <Link
              href="/profile"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">مشاريعي</h1>
            <p className="text-slate-600">My Projects</p>
          </div>
          <Link
            href="/projects/new"
            className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-semibold"
          >
            + مشروع جديد
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-900 border-t-transparent"></div>
            <p className="mt-4 text-slate-600">جاري التحميل...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">لا توجد مشاريع بعد</h2>
            <p className="text-slate-600 mb-6">ابدأ بإنشاء مشروعك الأول</p>
            <Link
              href="/projects/new"
              className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-semibold"
            >
              + إنشاء مشروع جديد
            </Link>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="block bg-white rounded-lg shadow-sm hover:shadow-md transition p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>

                {project.description && (
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="flex gap-4 text-sm text-slate-500 mb-4">
                  <div>📄 {project._count.documents} مستندات</div>
                  <div>👥 {project._count.teamMembers} أعضاء</div>
                  <div>💬 {project._count.comments} تعليقات</div>
                </div>

                <div className="text-xs text-slate-400">
                  آخر تحديث: {new Date(project.updatedAt).toLocaleDateString('ar-EG')}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
