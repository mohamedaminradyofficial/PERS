'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Project {
  id: string
  title: string
  description: string | null
  status: string
  createdAt: string
  updatedAt: string
  documents: Array<{
    id: string
    type: string
    createdAt: string
    logline: {
      content: string
      isValid: boolean
    } | null
  }>
  teamMembers: Array<{
    id: string
    name: string
    role: string
  }>
  visualAssets: Array<{
    id: string
    fileName: string
    fileType: string
  }>
  moodboards: Array<{
    id: string
    title: string
  }>
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [projectId])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
      } else if (response.status === 404) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'SERIES_BIBLE':
        return 'كتاب المسلسل التلفزيوني'
      case 'FILM_LOOKBOOK':
        return 'لوك-بوك سينمائي'
      case 'PITCH_DECK':
        return 'عرض تقديمي'
      default:
        return type
    }
  }

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'SERIES_BIBLE':
        return '📺'
      case 'FILM_LOOKBOOK':
        return '🎬'
      case 'PITCH_DECK':
        return '📊'
      default:
        return '📄'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <p className="text-slate-600">جاري التحميل...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <p className="text-slate-600">المشروع غير موجود</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost">← العودة</Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{project.title}</h1>
                {project.description && (
                  <p className="text-sm text-slate-600">{project.description}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">تصدير</Button>
              <Button variant="outline">مشاركة</Button>
              <Button>حفظ</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>المستندات</CardTitle>
                <CardDescription>قوالب المشروع والمحتوى</CardDescription>
              </CardHeader>
              <CardContent>
                {project.documents.length === 0 ? (
                  <p className="text-slate-600 text-center py-8">لا توجد مستندات بعد</p>
                ) : (
                  <div className="space-y-4">
                    {project.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 border rounded-lg hover:bg-slate-50 transition cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="text-3xl">{getDocumentTypeIcon(doc.type)}</div>
                            <div>
                              <h4 className="font-semibold">
                                {getDocumentTypeLabel(doc.type)}
                              </h4>
                              <p className="text-sm text-slate-600">
                                تم الإنشاء: {new Date(doc.createdAt).toLocaleDateString('ar-EG')}
                              </p>
                              {doc.logline && (
                                <div className="mt-2">
                                  <p className="text-sm text-slate-700 italic">
                                    "{doc.logline.content}"
                                  </p>
                                  {doc.logline.isValid ? (
                                    <span className="text-xs text-green-600">✓ Logline صالح</span>
                                  ) : (
                                    <span className="text-xs text-yellow-600">⚠ يحتاج مراجعة</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <Button size="sm">تحرير</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <span className="text-2xl">📝</span>
                    <span>Logline</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <span className="text-2xl">👥</span>
                    <span>الشخصيات</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <span className="text-2xl">🎨</span>
                    <span>Moodboard</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                    <span className="text-2xl">💰</span>
                    <span>الميزانية</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات المشروع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">الحالة</p>
                  <p className="font-medium">
                    {project.status === 'DRAFT' ? 'مسودة' : project.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">تاريخ الإنشاء</p>
                  <p className="font-medium">
                    {new Date(project.createdAt).toLocaleDateString('ar-EG')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">آخر تحديث</p>
                  <p className="font-medium">
                    {new Date(project.updatedAt).toLocaleDateString('ar-EG')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Team */}
            <Card>
              <CardHeader>
                <CardTitle>الفريق</CardTitle>
              </CardHeader>
              <CardContent>
                {project.teamMembers.length === 0 ? (
                  <p className="text-slate-600 text-sm">لا يوجد أعضاء فريق</p>
                ) : (
                  <div className="space-y-2">
                    {project.teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          👤
                        </div>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-slate-600">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  + إضافة عضو
                </Button>
              </CardContent>
            </Card>

            {/* Assets */}
            <Card>
              <CardHeader>
                <CardTitle>الأصول</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">الصور</span>
                    <span className="font-medium">{project.visualAssets.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Moodboards</span>
                    <span className="font-medium">{project.moodboards.length}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  + رفع ملف
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
