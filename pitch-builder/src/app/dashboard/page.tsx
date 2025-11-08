'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AudienceAnalysis from '@/components/AudienceAnalysis'
import MoodboardBuilder from '@/components/MoodboardBuilder'

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

type ActiveTool = 'projects' | 'overview' | 'audience' | 'moodboard'

export default function Dashboard() {
  const router = useRouter()
  const [activeTool, setActiveTool] = useState<ActiveTool>('projects')
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
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-slate-700 transition">
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h2>
          <p className="text-slate-600" dir="rtl">لوحة التحكم - أدوات إنشاء العروض الاحترافية</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveTool('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTool === 'projects'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>📁</span>
              <span>My Projects</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTool('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTool === 'overview'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>📊</span>
              <span>Overview</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTool('audience')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTool === 'audience'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span>Audience Analysis</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTool('moodboard')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTool === 'moodboard'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>🎨</span>
              <span>Moodboard Builder</span>
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="mb-8">
          {/* My Projects Tab */}
          {activeTool === 'projects' && (
            <div>
              {/* Page Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">مشاريعي</h3>
                  <p className="text-slate-600">My Projects</p>
                </div>
                <Link
                  href="/projects/new"
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-semibold"
                >
                  + مشروع جديد
                </Link>
              </div>

              {/* Quick Create Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Link
                  href="/dashboard/documents/new?type=SERIES_BIBLE"
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-slate-900"
                >
                  <div className="text-5xl mb-4">📺</div>
                  <h3 className="text-xl font-semibold mb-2">TV Series Bible</h3>
                  <p className="text-slate-600 text-sm">
                    Create a comprehensive series bible with characters, season arcs, and pilot breakdown
                  </p>
                </Link>

                <Link
                  href="/dashboard/documents/new?type=FILM_LOOKBOOK"
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-slate-900"
                >
                  <div className="text-5xl mb-4">🎬</div>
                  <h3 className="text-xl font-semibold mb-2">Film Lookbook</h3>
                  <p className="text-slate-600 text-sm">
                    Build a visual-first pitch deck for your film with moodboards and style references
                  </p>
                </Link>

                <Link
                  href="/dashboard/documents/new?type=PITCH_DECK"
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-slate-900"
                >
                  <div className="text-5xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-2">Pitch Deck</h3>
                  <p className="text-slate-600 text-sm">
                    Create a concise pitch deck with essential elements for quick pitching
                  </p>
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
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
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
            </div>
          )}

          {/* Overview Tab */}
          {activeTool === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl p-8">
                <h3 className="text-3xl font-bold mb-3">Welcome to Pitch Builder!</h3>
                <p className="text-lg mb-2">Create professional TV & Film pitches with ease</p>
                <p className="text-slate-300" dir="rtl">
                  أنشئ عروضك التلفزيونية والسينمائية الاحترافية بسهولة
                </p>
              </div>

              {/* Quick Access Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  onClick={() => setActiveTool('audience')}
                  className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-5xl mb-4">👥</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Audience Analysis
                  </h3>
                  <p className="text-slate-600 mb-2">
                    Define your target audience with comprehensive demographic, psychographic,
                    behavioral, geographic, and cultural analysis.
                  </p>
                  <p className="text-slate-500" dir="rtl">
                    حدد جمهورك المستهدف بتحليل شامل للخصائص الديموغرافية والسيكوجرافية والسلوكية والجغرافية والثقافية
                  </p>
                  <div className="mt-4 inline-block px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold">
                    Start Analysis →
                  </div>
                </div>

                <div
                  onClick={() => setActiveTool('moodboard')}
                  className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="text-5xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Moodboard Builder
                  </h3>
                  <p className="text-slate-600 mb-2">
                    Create stunning visual moodboards with drag-and-drop functionality
                    and high-quality image grids.
                  </p>
                  <p className="text-slate-500" dir="rtl">
                    أنشئ لوحات مرئية مذهلة مع خاصية السحب والإفلات وشبكة صور عالية الجودة
                  </p>
                  <div className="mt-4 inline-block px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold">
                    Create Moodboard →
                  </div>
                </div>
              </div>

              {/* Features Overview */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Available Tools</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="text-3xl mb-2">📝</div>
                    <h4 className="font-semibold text-slate-900 mb-1">Logline Validator</h4>
                    <p className="text-sm text-slate-600">18-35 words, 5 key elements</p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="text-3xl mb-2">📖</div>
                    <h4 className="font-semibold text-slate-900 mb-1">Synopsis Builder</h4>
                    <p className="text-sm text-slate-600">Professional synopsis templates</p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="text-3xl mb-2">🎭</div>
                    <h4 className="font-semibold text-slate-900 mb-1">Character Pages</h4>
                    <p className="text-sm text-slate-600">Detailed character profiles</p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="text-3xl mb-2">📊</div>
                    <h4 className="font-semibold text-slate-900 mb-1">Market Comps</h4>
                    <p className="text-sm text-slate-600">Comparable projects analysis</p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="text-3xl mb-2">💰</div>
                    <h4 className="font-semibold text-slate-900 mb-1">Budget Planning</h4>
                    <p className="text-sm text-slate-600">Budget & financing tools</p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="text-3xl mb-2">📤</div>
                    <h4 className="font-semibold text-slate-900 mb-1">Export Options</h4>
                    <p className="text-sm text-slate-600">PDF, PPTX, HTML formats</p>
                  </div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Your Statistics</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900 mb-2">{projects.length}</div>
                    <div className="text-sm text-slate-600">Total Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900 mb-2">
                      {projects.filter(p => p.status === 'DRAFT').length}
                    </div>
                    <div className="text-sm text-slate-600">Drafts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900 mb-2">
                      {projects.filter(p => p.status === 'IN_REVIEW').length}
                    </div>
                    <div className="text-sm text-slate-600">In Review</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900 mb-2">
                      {projects.filter(p => p.status === 'APPROVED').length}
                    </</div>
                    <div className="text-sm text-slate-600">Approved</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audience Analysis Tab */}
          {activeTool === 'audience' && <AudienceAnalysis />}

          {/* Moodboard Builder Tab */}
          {activeTool === 'moodboard' && <MoodboardBuilder />}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-12 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>Pitch Builder - Professional TV & Film Pitch Creation Tool</p>
          <p className="text-sm mt-2" dir="rtl">
            أداة إنشاء العروض التلفزيونية والسينمائية الاحترافية
          </p>
        </div>
      </footer>
    </div>
  )
}
