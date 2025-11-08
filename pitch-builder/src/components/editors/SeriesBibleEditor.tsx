'use client'

import { useState } from 'react'
import CharacterManager from '@/components/characters/CharacterManager'
import SeasonManager from '@/components/seasons/SeasonManager'

interface Section {
  [key: string]: any
}

interface SeriesBibleEditorProps {
  documentId: string
  initialSections: Section
  onSave: (sections: Section) => Promise<void>
}

export default function SeriesBibleEditor({
  documentId,
  initialSections,
  onSave
}: SeriesBibleEditorProps) {
  const [sections, setSections] = useState<Section>(initialSections)
  const [activeSection, setActiveSection] = useState('logline')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const sectionsList = [
    { id: 'coverPage', title: 'غلاف', titleEn: 'Cover Page', icon: '📄' },
    { id: 'logline', title: 'اللوج لاين', titleEn: 'Logline', icon: '✍️' },
    { id: 'synopsis', title: 'الملخص', titleEn: 'Synopsis', icon: '📝' },
    { id: 'treatment', title: 'السيناريو', titleEn: 'Treatment', icon: '📖' },
    { id: 'world', title: 'العالم', titleEn: 'World', icon: '🌍' },
    { id: 'toneAndStyle', title: 'النبرة والأسلوب', titleEn: 'Tone & Style', icon: '🎨' },
    { id: 'characters', title: 'الشخصيات', titleEn: 'Characters', icon: '👥' },
    { id: 'seasons', title: 'المواسم', titleEn: 'Seasons', icon: '📺' },
    { id: 'pilot', title: 'الحلقة التجريبية', titleEn: 'Pilot Episode', icon: '🎬' }
  ]

  const handleSectionChange = (sectionId: string, field: string, value: any) => {
    setSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      await onSave(sections)
      setSaveMessage('✓ تم الحفظ بنجاح')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      setSaveMessage('✗ فشل الحفظ')
      console.error('Failed to save:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'coverPage':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">غلاف المشروع / Cover Page</h2>

            <div>
              <label className="block text-sm font-medium mb-2">العنوان / Title</label>
              <input
                type="text"
                value={sections.coverPage?.title || ''}
                onChange={(e) => handleSectionChange('coverPage', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="عنوان المسلسل..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الشعار / Tagline</label>
              <input
                type="text"
                value={sections.coverPage?.tagline || ''}
                onChange={(e) => handleSectionChange('coverPage', 'tagline', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="شعار جذاب..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الكاتب / Created By</label>
              <input
                type="text"
                value={sections.coverPage?.createdBy || ''}
                onChange={(e) => handleSectionChange('coverPage', 'createdBy', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="اسم الكاتب..."
              />
            </div>
          </div>
        )

      case 'logline':
        const wordCount = sections.logline?.content?.split(/\s+/).filter((w: string) => w).length || 0
        const isValidLength = wordCount >= 18 && wordCount <= 35

        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">اللوج لاين / Logline</h2>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold mb-2">المتطلبات / Requirements:</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>18-35 كلمة (Word count: 18-35)</li>
                <li>البطل (Hero/Protagonist)</li>
                <li>الحدث المحفز (Inciting incident)</li>
                <li>الهدف (Goal)</li>
                <li>المخاطر (Stakes)</li>
                <li>العقبة (Obstacle)</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">اللوج لاين / Logline</label>
                <span className={`text-sm ${isValidLength ? 'text-green-600' : 'text-red-600'}`}>
                  {wordCount} كلمة / words
                </span>
              </div>
              <textarea
                value={sections.logline?.content || ''}
                onChange={(e) => handleSectionChange('logline', 'content', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-32"
                placeholder="اكتب اللوج لاين هنا..."
              />
              {!isValidLength && wordCount > 0 && (
                <p className="text-sm text-red-600 mt-1">
                  يجب أن يكون عدد الكلمات بين 18 و 35 كلمة
                </p>
              )}
            </div>
          </div>
        )

      case 'synopsis':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">الملخص / Synopsis</h2>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold mb-2">تنبيه مهم / Important Note:</h3>
              <p className="text-sm">
                يجب أن يكشف الملخص عن النهاية. الملخص هو للمنتجين والمستثمرين، وليس للجمهور.
              </p>
              <p className="text-sm mt-1">
                The synopsis must reveal the ending. It's for producers and investors, not the audience.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الملخص الكامل / Full Synopsis</label>
              <textarea
                value={sections.synopsis?.content || ''}
                onChange={(e) => handleSectionChange('synopsis', 'content', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-64"
                placeholder="اكتب الملخص الكامل للقصة مع الكشف عن النهاية..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="revealsEnding"
                checked={sections.synopsis?.revealsEnding || false}
                onChange={(e) => handleSectionChange('synopsis', 'revealsEnding', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="revealsEnding" className="text-sm">
                يكشف هذا الملخص عن النهاية / This synopsis reveals the ending
              </label>
            </div>
          </div>
        )

      case 'treatment':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">السيناريو / Treatment</h2>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold mb-2">تنبيه مهم / Important Note:</h3>
              <p className="text-sm">
                يجب أن يكون Treatment بصيغة المضارع (Present tense).
              </p>
              <p className="text-sm mt-1">
                The treatment must be written in present tense.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Treatment</label>
              <textarea
                value={sections.treatment?.content || ''}
                onChange={(e) => handleSectionChange('treatment', 'content', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-96"
                placeholder="اكتب ال Treatment بصيغة المضارع..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPresentTense"
                checked={sections.treatment?.isPresentTense || false}
                onChange={(e) => handleSectionChange('treatment', 'isPresentTense', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="isPresentTense" className="text-sm">
                هذا ال Treatment مكتوب بصيغة المضارع / This treatment is in present tense
              </label>
            </div>
          </div>
        )

      case 'world':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">عالم القصة / Story World</h2>

            <div>
              <label className="block text-sm font-medium mb-2">المكان / Setting</label>
              <textarea
                value={sections.world?.setting || ''}
                onChange={(e) => handleSectionChange('world', 'setting', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
                placeholder="صف المكان الذي تدور فيه الأحداث..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الزمان والمكان / Time & Place</label>
              <textarea
                value={sections.world?.timeAndPlace || ''}
                onChange={(e) => handleSectionChange('world', 'timeAndPlace', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
                placeholder="متى وأين تدور القصة؟"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الأسلوب البصري / Visual Style</label>
              <textarea
                value={sections.world?.visualStyle || ''}
                onChange={(e) => handleSectionChange('world', 'visualStyle', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
                placeholder="صف الأسلوب البصري والإخراجي..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الجو العام / Atmosphere</label>
              <textarea
                value={sections.world?.atmosphere || ''}
                onChange={(e) => handleSectionChange('world', 'atmosphere', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
                placeholder="صف الجو والمزاج العام للعمل..."
              />
            </div>
          </div>
        )

      case 'toneAndStyle':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">النبرة والأسلوب / Tone & Style</h2>

            <div>
              <label className="block text-sm font-medium mb-2">النبرة / Tone</label>
              <textarea
                value={sections.toneAndStyle?.tone || ''}
                onChange={(e) => handleSectionChange('toneAndStyle', 'tone', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
                placeholder="صف النبرة العامة (كوميدي، درامي، تشويقي، إلخ)..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">النوع / Genre</label>
              <input
                type="text"
                value={sections.toneAndStyle?.genre || ''}
                onChange={(e) => handleSectionChange('toneAndStyle', 'genre', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="النوع (Drama, Comedy, Thriller, etc.)"
              />
            </div>
          </div>
        )

      case 'characters':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">الشخصيات / Characters</h2>
            <CharacterManager documentId={documentId} />
          </div>
        )

      case 'seasons':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">المواسم والحلقات / Seasons & Episodes</h2>
            <SeasonManager documentId={documentId} />
          </div>
        )

      case 'pilot':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">الحلقة التجريبية / Pilot Episode</h2>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <p className="text-sm">
                تفصيل مشهد بمشهد للحلقة التجريبية / Scene-by-scene breakdown of the pilot episode
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">تفصيل الحلقة / Episode Breakdown</label>
              <textarea
                value={sections.pilot?.breakdown || ''}
                onChange={(e) => handleSectionChange('pilot', 'breakdown', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-96"
                placeholder="اكتب تفصيل مشهد بمشهد للحلقة التجريبية..."
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12 text-slate-500">
            <p>اختر قسماً من القائمة الجانبية</p>
            <p className="text-sm mt-1">Select a section from the sidebar</p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">TV Series Bible</h2>
          <p className="text-xs text-slate-500">كتاب المسلسل التلفزيوني</p>
        </div>

        <nav className="p-2">
          {sectionsList.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition ${
                activeSection === section.id
                  ? 'bg-slate-900 text-white'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{section.icon}</span>
                <div>
                  <div className="text-sm font-medium">{section.titleEn}</div>
                  <div className="text-xs opacity-75">{section.title}</div>
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center z-10">
          <div>
            <h1 className="text-xl font-bold">
              {sectionsList.find(s => s.id === activeSection)?.titleEn}
            </h1>
            <p className="text-sm text-slate-500">
              {sectionsList.find(s => s.id === activeSection)?.title}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {saveMessage && (
              <span className={`text-sm ${saveMessage.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {saveMessage}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'جاري الحفظ...' : 'حفظ / Save'}
            </button>
          </div>
        </div>

        <div className="p-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  )
}
