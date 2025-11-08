'use client'

import { useState } from 'react'

interface Section {
  [key: string]: any
}

interface PitchDeckEditorProps {
  documentId: string
  initialSections: Section
  onSave: (sections: Section) => Promise<void>
}

export default function PitchDeckEditor({
  documentId,
  initialSections,
  onSave
}: PitchDeckEditorProps) {
  const [sections, setSections] = useState<Section>(initialSections)
  const [activeSection, setActiveSection] = useState('logline')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const sectionsList = [
    { id: 'coverSlide', title: 'شريحة الغلاف', titleEn: 'Cover Slide', icon: '📄' },
    { id: 'logline', title: 'اللوج لاين', titleEn: 'Logline', icon: '✍️' },
    { id: 'concept', title: 'المفهوم', titleEn: 'Concept', icon: '💡' },
    { id: 'keyPoints', title: 'النقاط الرئيسية', titleEn: 'Key Points', icon: '🎯' }
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
      case 'coverSlide':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">شريحة الغلاف / Cover Slide</h2>

            <div>
              <label className="block text-sm font-medium mb-2">العنوان / Title</label>
              <input
                type="text"
                value={sections.coverSlide?.title || ''}
                onChange={(e) => handleSectionChange('coverSlide', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="عنوان المشروع..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الشعار / Tagline</label>
              <input
                type="text"
                value={sections.coverSlide?.tagline || ''}
                onChange={(e) => handleSectionChange('coverSlide', 'tagline', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="شعار جذاب..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">مقدم العرض / Presenter</label>
              <input
                type="text"
                value={sections.coverSlide?.presenter || ''}
                onChange={(e) => handleSectionChange('coverSlide', 'presenter', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="اسم مقدم العرض..."
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

      case 'concept':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">المفهوم / Concept</h2>

            <div>
              <label className="block text-sm font-medium mb-2">المفهوم الأساسي / Core Concept</label>
              <textarea
                value={sections.concept?.content || ''}
                onChange={(e) => handleSectionChange('concept', 'content', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-48"
                placeholder="اشرح المفهوم الأساسي للمشروع بشكل مختصر وجذاب..."
              />
            </div>
          </div>
        )

      case 'keyPoints':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">النقاط الرئيسية / Key Points</h2>

            <div>
              <label className="block text-sm font-medium mb-2">نقطة البيع الفريدة / Unique Selling Point</label>
              <textarea
                value={sections.keyPoints?.uniqueSellingPoint || ''}
                onChange={(e) => handleSectionChange('keyPoints', 'uniqueSellingPoint', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
                placeholder="ما الذي يميز هذا المشروع؟"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الجمهور المستهدف / Target Audience</label>
              <textarea
                value={sections.keyPoints?.targetAudience || ''}
                onChange={(e) => handleSectionChange('keyPoints', 'targetAudience', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
                placeholder="من هو الجمهور المستهدف؟"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">إمكانات السوق / Market Potential</label>
              <textarea
                value={sections.keyPoints?.marketPotential || ''}
                onChange={(e) => handleSectionChange('keyPoints', 'marketPotential', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-24"
                placeholder="ما هي إمكانات السوق التجارية؟"
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
          <h2 className="font-bold text-lg">Pitch Deck</h2>
          <p className="text-xs text-slate-500">العرض التقديمي المختصر</p>
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
