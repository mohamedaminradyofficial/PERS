'use client'

import { useState } from 'react'

interface PitchDeckEditorProps {
  documentId: string
  sections: any
  onSave: (sections: any) => void
}

export default function PitchDeckEditor({ documentId, sections, onSave }: PitchDeckEditorProps) {
  const [activeTab, setActiveTab] = useState('essentials')
  const [formData, setFormData] = useState({
    // Essential Elements
    title: sections?.title || '',
    logline: sections?.logline || '',
    elevator: sections?.elevator || '',

    // Core Story
    synopsis: sections?.synopsis || '',
    whyThisWhyNow: sections?.whyThisWhyNow || '',

    // Key Characters (Top 3)
    mainCharacters: sections?.mainCharacters || '',

    // Visual Identity (Concise)
    visualStyle: sections?.visualStyle || '',
    tone: sections?.tone || '',

    // Market (2-3 Comps)
    comps: sections?.comps || '',
    targetAudience: sections?.targetAudience || '',

    // Business Essentials
    budgetOverview: sections?.budgetOverview || '',
    financingAsk: sections?.financingAsk || '',
    distributionPlan: sections?.distributionPlan || '',

    // Team (Key people only)
    keyTeam: sections?.keyTeam || '',

    // Call to Action
    ask: sections?.ask || '',
    timeline: sections?.timeline || '',
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    onSave(formData)
  }

  const tabs = [
    { id: 'essentials', label: 'الأساسيات / Essentials', icon: '⚡' },
    { id: 'story', label: 'القصة / Story', icon: '📖' },
    { id: 'visual', label: 'البصريات / Visual', icon: '🎨' },
    { id: 'market', label: 'السوق / Market', icon: '📊' },
    { id: 'business', label: 'الأعمال / Business', icon: '💼' },
    { id: 'team', label: 'الفريق / Team', icon: '👥' },
    { id: 'ask', label: 'الطلب / Ask', icon: '🎯' },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Pitch Deck Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">Pitch Deck: Quick & Impactful</h2>
        <p className="text-blue-100">
          Keep it concise. Focus on essentials. Make every word count.
        </p>
      </div>

      {/* Section Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6 overflow-x-auto">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        {activeTab === 'essentials' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Essential Elements</h2>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-900">
                ⚡ <strong>Pitch Deck Focus:</strong> This is your quick pitch.
                Keep everything tight, clear, and compelling. No fluff.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Logline (18-35 words) - Your Hook
              </label>
              <textarea
                value={formData.logline}
                onChange={(e) => handleInputChange('logline', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="One compelling sentence that sells the concept"
              />
              <p className="text-sm text-slate-500 mt-1">
                Word count: {formData.logline.split(' ').filter((w: string) => w).length} (Target: 18-35)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Elevator Pitch (30 seconds verbal pitch)
              </label>
              <textarea
                value={formData.elevator}
                onChange={(e) => handleInputChange('elevator', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="What you'd say in 30 seconds to hook someone"
              />
            </div>
          </div>
        )}

        {activeTab === 'story' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Core Story</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Synopsis (200-300 words max)
              </label>
              <textarea
                value={formData.synopsis}
                onChange={(e) => handleInputChange('synopsis', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Concise story overview (200-300 words)"
              />
              <p className="text-sm text-slate-500 mt-1">
                Word count: {formData.synopsis.split(' ').filter((w: string) => w).length} (Target: 200-300)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Why This / Why Now (The "So What?")
              </label>
              <textarea
                value={formData.whyThisWhyNow}
                onChange={(e) => handleInputChange('whyThisWhyNow', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Why this project matters RIGHT NOW. What makes it timely and relevant?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Main Characters (Top 3 only)
              </label>
              <textarea
                value={formData.mainCharacters}
                onChange={(e) => handleInputChange('mainCharacters', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Brief description of your 3 main characters (1-2 sentences each)"
              />
            </div>
          </div>
        )}

        {activeTab === 'visual' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Visual Identity</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Visual Style (Concise)
              </label>
              <textarea
                value={formData.visualStyle}
                onChange={(e) => handleInputChange('visualStyle', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Key visual elements in 3-4 sentences"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tone
              </label>
              <input
                type="text"
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="e.g., Dark comedy with heart, Intense thriller, Whimsical drama"
              />
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Market Positioning</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Comparables (2-3 titles with justification)
              </label>
              <textarea
                value={formData.comps}
                onChange={(e) => handleInputChange('comps', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="List 2-3 successful comparable projects and explain why they're relevant"
              />
              <p className="text-sm text-slate-500 mt-1">
                Include title, why it's similar, and what makes your project different/better
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Target Audience (Be specific)
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Who exactly will watch this? Age, interests, viewing habits"
              />
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Business Essentials</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Budget Overview (High-level numbers)
              </label>
              <textarea
                value={formData.budgetOverview}
                onChange={(e) => handleInputChange('budgetOverview', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Total budget and major categories (pre-production, production, post, marketing)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Financing Ask (What you need)
              </label>
              <textarea
                value={formData.financingAsk}
                onChange={(e) => handleInputChange('financingAsk', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="How much funding you're seeking and what it will be used for"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Distribution Plan (Where will it go?)
              </label>
              <textarea
                value={formData.distributionPlan}
                onChange={(e) => handleInputChange('distributionPlan', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Target platforms, release strategy, distribution partners"
              />
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Team</h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-900">
                👥 <strong>Team Tip:</strong> Only include key people with relevant credits.
                Quality over quantity. Show credibility.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Key Team Members (3-5 people max)
              </label>
              <textarea
                value={formData.keyTeam}
                onChange={(e) => handleInputChange('keyTeam', e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="List key team members with roles and relevant experience/credits"
              />
              <p className="text-sm text-slate-500 mt-1">
                Format: Name - Role - Key Credits/Experience
              </p>
            </div>
          </div>
        )}

        {activeTab === 'ask' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Ask</h2>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-900">
                🎯 <strong>Call to Action:</strong> End strong. Be clear about what you want
                and when you need it. Make it easy to say yes.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                What Are You Asking For? (Be specific)
              </label>
              <textarea
                value={formData.ask}
                onChange={(e) => handleInputChange('ask', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Clear, specific ask: funding amount, partnerships, distribution deal, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Timeline & Next Steps
              </label>
              <textarea
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="When do you need a decision? What are the immediate next steps?"
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
