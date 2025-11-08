'use client'

import { useState } from 'react'
import Link from 'next/link'
import AudienceAnalysis from '@/components/AudienceAnalysis'
import MoodboardBuilder from '@/components/MoodboardBuilder'

type ActiveTool = 'overview' | 'audience' | 'moodboard'

export default function Dashboard() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('overview')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-slate-900 cursor-pointer hover:text-slate-700 transition">
              Pitch Builder
            </h1>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link
              href="/projects"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition"
            >
              My Projects
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

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl">📄</div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">No recent activity</p>
                      <p className="text-sm text-slate-600">Start creating your first project!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTool === 'audience' && <AudienceAnalysis />}

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
