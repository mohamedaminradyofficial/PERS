'use client'

import { useState } from 'react'

interface FilmLookbookEditorProps {
  documentId: string
  sections: any
  onSave: (sections: any) => void
}

export default function FilmLookbookEditor({ documentId, sections, onSave }: FilmLookbookEditorProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [formData, setFormData] = useState({
    // Overview Section (Visual-First)
    title: sections?.title || '',
    logline: sections?.logline || '',
    executiveSummary: sections?.executiveSummary || '',
    whyThisWhyNow: sections?.whyThisWhyNow || '',

    // Story Section (Concise - 300-500 words per section)
    synopsis: sections?.synopsis || '',
    treatment: sections?.treatment || '',

    // Visual Identity (Image-First)
    visualStyle: sections?.visualStyle || '',
    cinematography: sections?.cinematography || '',
    colorPalette: sections?.colorPalette || '',
    lookAndFeel: sections?.lookAndFeel || '',

    // Moodboard
    moodboardImages: sections?.moodboardImages || [],
    moodboardDescription: sections?.moodboardDescription || '',

    // Characters (Brief with visual references)
    characters: sections?.characters || [],

    // Tone & Atmosphere
    tone: sections?.tone || '',
    atmosphere: sections?.atmosphere || '',
    genreInfluences: sections?.genreInfluences || '',

    // Market & Audience
    comps: sections?.comps || [],
    targetAudience: sections?.targetAudience || '',
    marketPosition: sections?.marketPosition || '',

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
    { id: 'visual', label: 'الهوية البصرية / Visual Identity', icon: '🎨' },
    { id: 'moodboard', label: 'لوح المزاج / Moodboard', icon: '🖼️' },
    { id: 'characters', label: 'الشخصيات / Characters', icon: '👥' },
    { id: 'tone', label: 'النبرة / Tone', icon: '🎭' },
    { id: 'market', label: 'السوق / Market', icon: '📊' },
    { id: 'production', label: 'الإنتاج / Production', icon: '🎬' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Visual-First Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">Film Lookbook: Visual-First Approach</h2>
        <p className="text-slate-200">
          Keep text concise (300-500 words per section). Let images tell the story.
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Overview Section</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Film Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="Enter film title"
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
                placeholder="One-sentence hook that captures the essence of the film"
              />
              <p className="text-sm text-slate-500 mt-1">
                Word count: {formData.logline.split(' ').filter((w: string) => w).length}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Executive Summary (Keep brief, 300-500 words)
              </label>
              <textarea
                value={formData.executiveSummary}
                onChange={(e) => handleInputChange('executiveSummary', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Brief overview of the film concept (300-500 words max)"
              />
              <p className="text-sm text-slate-500 mt-1">
                Word count: {formData.executiveSummary.split(' ').filter((w: string) => w).length} (Target: 300-500)
              </p>
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
                placeholder="Why this film matters now (keep concise)"
              />
            </div>
          </div>
        )}

        {activeTab === 'story' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Story Section (Concise)</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                💡 <strong>Lookbook Tip:</strong> Keep story sections brief (300-500 words).
                Focus on visual storytelling. Let images do the heavy lifting.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Synopsis (Must reveal ending, 300-500 words)
              </label>
              <textarea
                value={formData.synopsis}
                onChange={(e) => handleInputChange('synopsis', e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Complete story overview including the ending (300-500 words)"
              />
              <p className="text-sm text-slate-500 mt-1">
                Word count: {formData.synopsis.split(' ').filter((w: string) => w).length} (Target: 300-500)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Treatment (Present tense, 300-500 words)
              </label>
              <textarea
                value={formData.treatment}
                onChange={(e) => handleInputChange('treatment', e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Key scenes and sequences in present tense (300-500 words)"
              />
              <p className="text-sm text-slate-500 mt-1">
                Word count: {formData.treatment.split(' ').filter((w: string) => w).length} (Target: 300-500)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'visual' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Visual Identity</h2>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-900">
                🎨 <strong>Visual-First:</strong> This is where your lookbook shines.
                Use rich descriptions that paint a clear visual picture.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Visual Style & Look
              </label>
              <textarea
                value={formData.visualStyle}
                onChange={(e) => handleInputChange('visualStyle', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Overall visual aesthetic - be specific and evocative"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cinematography
              </label>
              <textarea
                value={formData.cinematography}
                onChange={(e) => handleInputChange('cinematography', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Camera work, framing, movement - describe the visual language"
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
                placeholder="e.g., Desaturated blues and grays with splashes of vibrant red"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Look & Feel
              </label>
              <textarea
                value={formData.lookAndFeel}
                onChange={(e) => handleInputChange('lookAndFeel', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Overall sensory experience - how should the film feel visually?"
              />
            </div>
          </div>
        )}

        {activeTab === 'moodboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Moodboard</h2>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-purple-900">
                🖼️ <strong>Visual References:</strong> Collect high-quality reference images
                that capture your film's visual identity. Each image should tell a story.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Moodboard Description
              </label>
              <textarea
                value={formData.moodboardDescription}
                onChange={(e) => handleInputChange('moodboardDescription', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Describe the visual themes and references in your moodboard"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Image References
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-slate-600 mb-4">
                  Image upload functionality will be integrated with the asset management system
                </p>
                <p className="text-sm text-slate-500">
                  For now, describe your intended images in the description field above
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Characters</h2>
                <p className="text-sm text-slate-600 mt-1">Brief descriptions with visual references</p>
              </div>
              <button
                onClick={() => {
                  const newChar = {
                    id: Date.now(),
                    name: '',
                    description: '',
                    visualReference: ''
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
                          Brief Description
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
                          placeholder="Concise character description (2-3 sentences)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Visual Reference
                        </label>
                        <input
                          type="text"
                          value={char.visualReference}
                          onChange={(e) => {
                            const updated = formData.characters.map((c: any) =>
                              c.id === char.id ? { ...c, visualReference: e.target.value } : c
                            )
                            handleInputChange('characters', updated)
                          }}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                          placeholder="e.g., Think young Marlon Brando meets modern streetwear"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'tone' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Tone & Atmosphere</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tone
              </label>
              <textarea
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="e.g., Gritty and raw, Dreamy and surreal, Fast-paced and energetic"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Atmosphere
              </label>
              <textarea
                value={formData.atmosphere}
                onChange={(e) => handleInputChange('atmosphere', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="The overall mood and feeling of the film"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Genre Influences & References
              </label>
              <textarea
                value={formData.genreInfluences}
                onChange={(e) => handleInputChange('genreInfluences', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="What genres and films inspire this project?"
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
                placeholder="Who is this film for? Demographics, interests, viewing habits"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Market Position
              </label>
              <textarea
                value={formData.marketPosition}
                onChange={(e) => handleInputChange('marketPosition', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="How does this film fit in the current market? What makes it unique?"
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
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Timeline, phases, key milestones"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Budget Overview
              </label>
              <textarea
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                placeholder="Budget breakdown by major categories"
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
                placeholder="Funding sources and financial strategy"
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
                placeholder="Distribution channels and release strategy"
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
                placeholder="Marketing approach and key messaging"
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
