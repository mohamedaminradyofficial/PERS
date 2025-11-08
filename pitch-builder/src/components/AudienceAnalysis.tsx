'use client'

import { useState } from 'react'

interface AudienceData {
  // Demographic
  ageRange: string
  gender: string
  income: string
  education: string
  occupation: string

  // Psychographic
  interests: string
  values: string
  lifestyle: string
  personality: string

  // Behavioral
  viewingHabits: string
  platformPreferences: string
  genrePreferences: string
  engagementLevel: string

  // Geographic
  regions: string
  urbanRural: string

  // Cultural
  culturalBackground: string
  language: string
  culturalValues: string
}

export default function AudienceAnalysis() {
  const [audienceData, setAudienceData] = useState<AudienceData>({
    ageRange: '',
    gender: '',
    income: '',
    education: '',
    occupation: '',
    interests: '',
    values: '',
    lifestyle: '',
    personality: '',
    viewingHabits: '',
    platformPreferences: '',
    genrePreferences: '',
    engagementLevel: '',
    regions: '',
    urbanRural: '',
    culturalBackground: '',
    language: '',
    culturalValues: ''
  })

  const [activeSection, setActiveSection] = useState<string>('demographic')

  const handleChange = (field: keyof AudienceData, value: string) => {
    setAudienceData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const sections = [
    { id: 'demographic', label: 'Demographic', labelAr: 'ديموغرافي' },
    { id: 'psychographic', label: 'Psychographic', labelAr: 'سيكوجرافي' },
    { id: 'behavioral', label: 'Behavioral', labelAr: 'سلوكي' },
    { id: 'geographic', label: 'Geographic', labelAr: 'جغرافي' },
    { id: 'cultural', label: 'Cultural', labelAr: 'ثقافي' }
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Audience Analysis</h2>
        <p className="text-slate-600" dir="rtl">تحليل الجمهور المستهدف</p>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-6 py-3 font-semibold transition-all ${
              activeSection === section.id
                ? 'text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <div>{section.label}</div>
            <div className="text-xs" dir="rtl">{section.labelAr}</div>
          </button>
        ))}
      </div>

      {/* Demographic Section */}
      {activeSection === 'demographic' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Demographic Information / المعلومات الديموغرافية
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Age Range / الفئة العمرية
            </label>
            <input
              type="text"
              value={audienceData.ageRange}
              onChange={(e) => handleChange('ageRange', e.target.value)}
              placeholder="e.g., 18-34, 25-45"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Gender / الجنس
            </label>
            <select
              value={audienceData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="all">All Genders</option>
              <option value="primarily-male">Primarily Male</option>
              <option value="primarily-female">Primarily Female</option>
              <option value="balanced">Balanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Income Level / مستوى الدخل
            </label>
            <input
              type="text"
              value={audienceData.income}
              onChange={(e) => handleChange('income', e.target.value)}
              placeholder="e.g., Middle class, $50k-$100k"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Education / التعليم
            </label>
            <input
              type="text"
              value={audienceData.education}
              onChange={(e) => handleChange('education', e.target.value)}
              placeholder="e.g., High school, College educated"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Occupation / المهنة
            </label>
            <textarea
              value={audienceData.occupation}
              onChange={(e) => handleChange('occupation', e.target.value)}
              placeholder="e.g., Young professionals, Students, Creative professionals"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Psychographic Section */}
      {activeSection === 'psychographic' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Psychographic Profile / الملف السيكوجرافي
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Interests & Hobbies / الاهتمامات والهوايات
            </label>
            <textarea
              value={audienceData.interests}
              onChange={(e) => handleChange('interests', e.target.value)}
              placeholder="e.g., Technology, Sports, Arts, Travel, Gaming"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Values & Beliefs / القيم والمعتقدات
            </label>
            <textarea
              value={audienceData.values}
              onChange={(e) => handleChange('values', e.target.value)}
              placeholder="e.g., Family-oriented, Progressive, Traditional, Socially conscious"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Lifestyle / نمط الحياة
            </label>
            <textarea
              value={audienceData.lifestyle}
              onChange={(e) => handleChange('lifestyle', e.target.value)}
              placeholder="e.g., Urban, Active, Digital-first, Work-life balance seekers"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Personality Traits / السمات الشخصية
            </label>
            <textarea
              value={audienceData.personality}
              onChange={(e) => handleChange('personality', e.target.value)}
              placeholder="e.g., Adventurous, Curious, Empathetic, Analytical"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Behavioral Section */}
      {activeSection === 'behavioral' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Behavioral Patterns / الأنماط السلوكية
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Viewing Habits / عادات المشاهدة
            </label>
            <textarea
              value={audienceData.viewingHabits}
              onChange={(e) => handleChange('viewingHabits', e.target.value)}
              placeholder="e.g., Binge-watchers, Weekend viewers, Evening watchers"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Platform Preferences / تفضيلات المنصات
            </label>
            <textarea
              value={audienceData.platformPreferences}
              onChange={(e) => handleChange('platformPreferences', e.target.value)}
              placeholder="e.g., Netflix, HBO, Disney+, Traditional TV, YouTube"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Genre Preferences / تفضيلات النوع
            </label>
            <textarea
              value={audienceData.genrePreferences}
              onChange={(e) => handleChange('genrePreferences', e.target.value)}
              placeholder="e.g., Drama, Thriller, Sci-Fi, Comedy, Documentary"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Engagement Level / مستوى التفاعل
            </label>
            <select
              value={audienceData.engagementLevel}
              onChange={(e) => handleChange('engagementLevel', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="passive">Passive viewers</option>
              <option value="active">Active viewers</option>
              <option value="superfans">Superfans / Community builders</option>
              <option value="mixed">Mixed engagement</option>
            </select>
          </div>
        </div>
      )}

      {/* Geographic Section */}
      {activeSection === 'geographic' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Geographic Distribution / التوزيع الجغرافي
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Primary Regions / المناطق الرئيسية
            </label>
            <textarea
              value={audienceData.regions}
              onChange={(e) => handleChange('regions', e.target.value)}
              placeholder="e.g., North America, MENA, Europe, Asia-Pacific"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Urban / Rural Distribution / التوزيع الحضري والريفي
            </label>
            <select
              value={audienceData.urbanRural}
              onChange={(e) => handleChange('urbanRural', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="primarily-urban">Primarily Urban</option>
              <option value="primarily-rural">Primarily Rural</option>
              <option value="suburban">Suburban</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>
      )}

      {/* Cultural Section */}
      {activeSection === 'cultural' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Cultural Context / السياق الثقافي
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cultural Background / الخلفية الثقافية
            </label>
            <textarea
              value={audienceData.culturalBackground}
              onChange={(e) => handleChange('culturalBackground', e.target.value)}
              placeholder="e.g., Western, Middle Eastern, Asian, Multicultural"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Language Preferences / تفضيلات اللغة
            </label>
            <input
              type="text"
              value={audienceData.language}
              onChange={(e) => handleChange('language', e.target.value)}
              placeholder="e.g., English, Arabic, Bilingual"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cultural Values & Sensitivities / القيم والحساسيات الثقافية
            </label>
            <textarea
              value={audienceData.culturalValues}
              onChange={(e) => handleChange('culturalValues', e.target.value)}
              placeholder="e.g., Family values, Religious considerations, Social norms"
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 pt-6 border-t flex gap-4">
        <button className="px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition">
          Save Analysis / حفظ التحليل
        </button>
        <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition">
          Export PDF / تصدير PDF
        </button>
      </div>
    </div>
  )
}
