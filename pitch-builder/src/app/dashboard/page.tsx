'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Project {
  id: string
  title: string
  description: string | null
  status: string
  createdAt: string
  updatedAt: string
  _count: {
    documents: number
    teamMembers: number
    comments: number
  }
  documents: Array<{
    id: string
    type: string
  }>
}

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'SERIES_BIBLE':
        return 'كتاب مسلسل'
      case 'FILM_LOOKBOOK':
        return 'لوك-بوك سينمائي'
      case 'PITCH_DECK':
        return 'عرض تقديمي'
      default:
        return type
    }
  }

  const getStatusLabel = (status: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800'
      case 'IN_REVIEW':
        return 'bg-blue-100 text-blue-800'
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'ARCHIVED':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-slate-900">Pitch Builder</h1>
          </Link>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.push('/auth/signin')}>
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">مشاريعي</h2>
            <p className="text-slate-600">My Projects</p>
          </div>
          <Link href="/projects/new">
            <Button size="lg">
              <span className="mr-2">+</span>
              مشروع جديد
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-slate-600">جاري التحميل...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-2">لا توجد مشاريع بعد</h3>
              <p className="text-slate-600 mb-6">
                ابدأ بإنشاء مشروعك الأول الآن
              </p>
              <Link href="/projects/new">
                <Button size="lg">
                  <span className="mr-2">+</span>
                  إنشاء مشروع جديد
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Projects Grid */}
        {!isLoading && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl line-clamp-1">
                        {project.title}
                      </CardTitle>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                    {project.description && (
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent>
                    {/* Document Types */}
                    {project.documents.length > 0 && (
                      <div className="mb-4">
                        {project.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded text-sm mr-2 mb-2"
                          >
                            {getDocumentTypeLabel(doc.type)}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex gap-4 text-sm text-slate-600">
                      <div>
                        <span className="font-medium">{project._count.documents}</span>{' '}
                        مستندات
                      </div>
                      <div>
                        <span className="font-medium">{project._count.teamMembers}</span>{' '}
                        أعضاء
                      </div>
                      <div>
                        <span className="font-medium">{project._count.comments}</span>{' '}
                        تعليقات
                      </div>
                    </div>

                    {/* Date */}
                    <div className="mt-4 text-xs text-slate-500">
                      آخر تحديث:{' '}
                      {new Date(project.updatedAt).toLocaleDateString('ar-EG')}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
