'use client'

import { useState, useEffect } from 'react'

interface SeriesBibleEditorProps {
  documentId: string
  sections: any
  onSave: (sections: any) => void
}

export default function SeriesBibleEditor({ documentId, sections, onSave }: SeriesBibleEditorProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [formData, setFormData] = useState({
    // Overview Section
    title: sections?.title || '',
    logline: sections?.logline || '',
    executiveSummary: sections?.executiveSummary || '',
    whyThisWhyNow: sections?.whyThisWhyNow || '',

    // Story Section
    synopsis: sections?.synopsis || '',
    treatment: sections?.treatment || '',

    // Characters Section
    characters: sections?.characters || [],

    // Season Structure
    seasonArc: sections?.seasonArc || '',
    pilotBreakdown: sections?.pilotBreakdown || '',

    // World & Tone
    worldDescription: sections?.worldDescription || '',
    tone: sections?.tone || '',
    visualStyle: sections?.visualStyle || '',
    cinematography: sections?.cinematography || '',
    colorPalette: sections?.colorPalette || '',

    // Market & Audience
    comps: sections?.comps || [],
    targetAudience: sections?.targetAudience || '',
    marketAnalysis: sections?.marketAnalysis || '',

    // Production
    productionPlan: sections?.productionPlan || '',
    budget: sections?.budget || '',
    financing: sections?.financing || '',

    // Distribution
    distributionStrategy: sections?.distributionStrategy || '',
    marketing: sections?.marketing || '',
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
    { id: 'overview', label: 'نظرة عامة / Overview', icon: '📋' },
    { id: 'story', label: 'القصة / Story', icon: '📖' },
    { id: 'characters', label: 'الشخصيات / Characters', icon: '👥' },
    { id: 'season', label: 'الموسم / Season', icon: '📺' },
    { id: 'world', label: 'العالم والنبرة / World & Tone', icon: '🎨' },
    { id: 'market', label: 'السوق / Market', icon: '📊' },
    { id: 'production', label: 'الإنتاج / Production', icon: '🎬' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Overview Section</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="Enter series title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Logline (18-35 words)
              </label>
              <textarea
                value={formData.logline}
                onChange={(e) => handleInputChange('logline', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="One-sentence summary with hero, inciting incident, goal, stakes, and obstacle"
              />
              <p className="text-sm text-slate-500 mt-1">
                Word count: {formData.logline.split(' ').filter((w: string) => w).length}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Executive Summary
              </label>
              <textarea
                value={formData.executiveSummary}
                onChange={(e) => handleInputChange('executiveSummary', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Brief overview of the series concept"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Why This / Why Now
              </label>
              <textarea
                value={formData.whyThisWhyNow}
                onChange={(e) => handleInputChange('whyThisWhyNow', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Why this story matters now and why it will resonate with audiences"
              />
            </div>
          </div>
        )}

        {activeTab === 'story' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Story Section</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Synopsis (Must reveal ending)
              </label>
              <textarea
                value={formData.synopsis}
                onChange={(e) => handleInputChange('synopsis', e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Complete story overview including the ending"
              />
              <p className="text-sm text-slate-500 mt-1">
                Remember to reveal the ending in the synopsis
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Treatment (Present tense, detailed scenes)
              </label>
              <textarea
                value={formData.treatment}
                onChange={(e) => handleInputChange('treatment', e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Detailed scene-by-scene breakdown in present tense"
              />
              <p className="text-sm text-slate-500 mt-1">
                Write in present tense to convey tone and theme
              </p>
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Characters</h2>
              <button
                onClick={() => {
                  const newChar = {
                    id: Date.now(),
                    name: '',
                    description: '',
                    motivation: '',
                    arc: ''
                  }
                  handleInputChange('characters', [...formData.characters, newChar])
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
              >
                + Add Character
              </button>
            </div>

            {formData.characters.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-lg">
                <div className="text-6xl mb-4">👤</div>
                <p className="text-slate-600">No characters yet. Add your first character above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.characters.map((char: any, index: number) => (
                  <div key={char.id} className="border border-slate-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">Character #{index + 1}</h3>
                      <button
                        onClick={() => {
                          handleInputChange(
                            'characters',
                            formData.characters.filter((c: any) => c.id !== char.id)
                          )
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={char.name}
                          onChange={(e) => {
                            const updated = formData.characters.map((c: any) =>
                              c.id === char.id ? { ...c, name: e.target.value } : c
                            )
                            handleInputChange('characters', updated)
                          }}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                          placeholder="Character name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={char.description}
                          onChange={(e) => {
                            const updated = formData.characters.map((c: any) =>
                              c.id === char.id ? { ...c, description: e.target.value } : c
                            )
                            handleInputChange('characters', updated)
                          }}
                          rows={3}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg resize-none"
                          placeholder="Brief character description"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Motivation
                        </label>
                        <input
                          type="text"
                          value={char.motivation}
                          onChange={(e) => {
                            const updated = formData.characters.map((c: any) =>
                              c.id === char.id ? { ...c, motivation: e.target.value } : c
                            )
                            handleInputChange('characters', updated)
                          }}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                          placeholder="What drives this character?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Character Arc
                        </label>
                        <textarea
                          value={char.arc}
                          onChange={(e) => {
                            const updated = formData.characters.map((c: any) =>
                              c.id === char.id ? { ...c, arc: e.target.value } : c
                            )
                            handleInputChange('characters', updated)
                          }}
                          rows={2}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg resize-none"
                          placeholder="How does this character evolve?"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'season' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Season Structure</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Season Arc (Overall story arc for Season 1)
              </label>
              <textarea
                value={formData.seasonArc}
                onChange={(e) => handleInputChange('seasonArc', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Describe the overall narrative arc for the first season"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Pilot Episode Breakdown
              </label>
              <textarea
                value={formData.pilotBreakdown}
                onChange={(e) => handleInputChange('pilotBreakdown', e.target.value)}
                rows={10}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Scene-by-scene breakdown of the pilot episode"
              />
            </div>
          </div>
        )}

        {activeTab === 'world' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">World & Tone</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                World Description
              </label>
              <textarea
                value={formData.worldDescription}
                onChange={(e) => handleInputChange('worldDescription', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Describe the world of your series"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tone
              </label>
              <textarea
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="e.g., Dark comedy, Suspenseful thriller, Heartwarming drama"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Visual Style
              </label>
              <textarea
                value={formData.visualStyle}
                onChange={(e) => handleInputChange('visualStyle', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Overall visual aesthetic and style"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cinematography
              </label>
              <textarea
                value={formData.cinematography}
                onChange={(e) => handleInputChange('cinematography', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Camera style, movement, framing preferences"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Color Palette
              </label>
              <input
                type="text"
                value={formData.colorPalette}
                onChange={(e) => handleInputChange('colorPalette', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="e.g., Muted blues and grays, Warm earth tones, Neon and cyberpunk"
              />
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Market & Audience</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Target Audience
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Demographics, psychographics, viewing habits"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Market Analysis
              </label>
              <textarea
                value={formData.marketAnalysis}
                onChange={(e) => handleInputChange('marketAnalysis', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Market opportunities, competitive landscape, positioning"
              />
            </div>
          </div>
        )}

        {activeTab === 'production' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Production & Distribution</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Production Plan
              </label>
              <textarea
                value={formData.productionPlan}
                onChange={(e) => handleInputChange('productionPlan', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Timeline, phases, milestones"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Budget Overview
              </label>
              <textarea
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Budget breakdown by category"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Financing Strategy
              </label>
              <textarea
                value={formData.financing}
                onChange={(e) => handleInputChange('financing', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Funding sources, partnerships, revenue projections"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Distribution Strategy
              </label>
              <textarea
                value={formData.distributionStrategy}
                onChange={(e) => handleInputChange('distributionStrategy', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Platforms, release strategy, distribution channels"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Marketing Plan
              </label>
              <textarea
                value={formData.marketing}
                onChange={(e) => handleInputChange('marketing', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Marketing channels, timing, target segments"
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
