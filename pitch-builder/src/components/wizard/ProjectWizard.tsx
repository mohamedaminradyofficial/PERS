'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type ProjectType = 'SERIES_BIBLE' | 'FILM_LOOKBOOK' | 'PITCH_DECK'

interface WizardStep {
  title: string
  description: string
}

const steps: WizardStep[] = [
  {
    title: 'نوع المشروع',
    description: 'اختر نوع المستند الذي تريد إنشاءه'
  },
  {
    title: 'معلومات المشروع',
    description: 'أدخل تفاصيل المشروع الأساسية'
  },
  {
    title: 'المراجعة',
    description: 'راجع اختياراتك قبل الإنشاء'
  }
]

const projectTypes = [
  {
    type: 'SERIES_BIBLE' as ProjectType,
    title: 'TV Series Bible',
    titleAr: 'كتاب المسلسل التلفزيوني',
    description: 'Complete series bible with characters, seasons, and episode breakdowns',
    descriptionAr: 'كتاب شامل للمسلسل يتضمن الشخصيات والمواسم والحلقات',
    icon: '📺'
  },
  {
    type: 'FILM_LOOKBOOK' as ProjectType,
    title: 'Film Lookbook',
    titleAr: 'لوك بوك الفيلم',
    description: 'Visual and narrative lookbook for your film project',
    descriptionAr: 'كتاب مرئي وسردي لمشروع الفيلم الخاص بك',
    icon: '🎬'
  },
  {
    type: 'PITCH_DECK' as ProjectType,
    title: 'Pitch Deck',
    titleAr: 'عرض تقديمي مختصر',
    description: 'Concise presentation deck for quick pitches',
    descriptionAr: 'عرض تقديمي مختصر للعروض السريعة',
    icon: '📊'
  }
]

export default function ProjectWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [projectData, setProjectData] = useState({
    type: '' as ProjectType | '',
    title: '',
    description: '',
    language: 'en' as 'en' | 'ar'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleNext = () => {
    if (currentStep === 0 && !projectData.type) {
      setError('يرجى اختيار نوع المشروع')
      return
    }
    if (currentStep === 1 && !projectData.title) {
      setError('يرجى إدخال عنوان المشروع')
      return
    }
    setError('')
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setError('')
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    if (!projectData.title || !projectData.type) {
      setError('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Create project
      const projectResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: projectData.title,
          description: projectData.description
        })
      })

      if (!projectResponse.ok) {
        throw new Error('Failed to create project')
      }

      const project = await projectResponse.json()

      // Create document
      const documentResponse = await fetch(`/api/projects/${project.id}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: projectData.type,
          language: projectData.language
        })
      })

      if (!documentResponse.ok) {
        throw new Error('Failed to create document')
      }

      const document = await documentResponse.json()

      // Redirect to the editor
      router.push(`/projects/${project.id}/documents/${document.id}`)
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء المشروع. يرجى المحاولة مرة أخرى.')
      console.error('Error creating project:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 ${index !== steps.length - 1 ? 'border-b-2' : ''} ${
                index <= currentStep ? 'border-slate-900' : 'border-slate-300'
              }`}
            >
              <div className="flex flex-col items-center pb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-center">
                  <div className="font-medium text-sm">{step.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{step.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm p-8 min-h-[400px]">
        {/* Step 1: Project Type */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">اختر نوع المشروع</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {projectTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setProjectData({ ...projectData, type: type.type })}
                  className={`p-6 border-2 rounded-lg text-center transition ${
                    projectData.type === type.type
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold mb-2">{type.title}</h3>
                  <p className="text-sm text-slate-600 mb-2" dir="rtl">{type.titleAr}</p>
                  <p className="text-xs text-slate-500">{type.description}</p>
                  <p className="text-xs text-slate-500 mt-1" dir="rtl">{type.descriptionAr}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">معلومات المشروع</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  عنوان المشروع <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="مثال: The Last Journey"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف المشروع</label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 h-32"
                  placeholder="وصف مختصر للمشروع..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">اللغة الأساسية</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setProjectData({ ...projectData, language: 'en' })}
                    className={`flex-1 px-4 py-2 border-2 rounded-lg transition ${
                      projectData.language === 'en'
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setProjectData({ ...projectData, language: 'ar' })}
                    className={`flex-1 px-4 py-2 border-2 rounded-lg transition ${
                      projectData.language === 'ar'
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">مراجعة المشروع</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">نوع المشروع</div>
                <div className="font-semibold">
                  {projectTypes.find(t => t.type === projectData.type)?.title}
                </div>
                <div className="text-sm text-slate-600" dir="rtl">
                  {projectTypes.find(t => t.type === projectData.type)?.titleAr}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">عنوان المشروع</div>
                <div className="font-semibold">{projectData.title}</div>
              </div>

              {projectData.description && (
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">الوصف</div>
                  <div>{projectData.description}</div>
                </div>
              )}

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">اللغة</div>
                <div className="font-semibold">
                  {projectData.language === 'en' ? 'English' : 'العربية'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-6 py-2 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          السابق
        </button>

        <div className="flex gap-4">
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              التالي
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء المشروع'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
