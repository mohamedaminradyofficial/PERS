'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WizardSteps } from '@/components/wizard/wizard-steps'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const WIZARD_STEPS = [
  { id: 1, title: 'معلومات المشروع', description: 'Project Info' },
  { id: 2, title: 'نوع القالب', description: 'Template Type' },
  { id: 3, title: 'الإعداد الأولي', description: 'Initial Setup' },
]

type DocumentType = 'SERIES_BIBLE' | 'FILM_LOOKBOOK' | 'PITCH_DECK'

interface ProjectData {
  title: string
  description: string
  documentType: DocumentType | null
  genre: string
  targetAudience: string
}

export default function NewProjectWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    documentType: null,
    genre: '',
    targetAudience: '',
  })

  const updateProjectData = (field: keyof ProjectData, value: any) => {
    setProjectData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Create project
      const projectResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: projectData.title,
          description: projectData.description,
        }),
      })

      if (!projectResponse.ok) throw new Error('Failed to create project')

      const project = await projectResponse.json()

      // Create document
      const documentResponse = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          type: projectData.documentType,
          sections: {
            genre: projectData.genre,
            targetAudience: projectData.targetAudience,
          },
        }),
      })

      if (!documentResponse.ok) throw new Error('Failed to create document')

      // Redirect to project page
      router.push(`/projects/${project.id}`)
    } catch (error) {
      console.error('Error creating project:', error)
      alert('حدث خطأ أثناء إنشاء المشروع')
    } finally {
      setIsLoading(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return projectData.title.trim().length > 0
      case 1:
        return projectData.documentType !== null
      case 2:
        return projectData.genre.trim().length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            إنشاء مشروع جديد
          </h1>
          <p className="text-slate-600">Create a new TV or Film pitch project</p>
        </div>

        {/* Wizard Steps */}
        <WizardSteps steps={WIZARD_STEPS} currentStep={currentStep} />

        {/* Step Content */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            {/* Step 1: Project Info */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <CardTitle className="mb-2">معلومات المشروع الأساسية</CardTitle>
                  <CardDescription>
                    أدخل عنوان المشروع ووصفاً مختصراً له
                  </CardDescription>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      عنوان المشروع <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="مثال: Breaking Bad - قصة مدرس كيمياء"
                      value={projectData.title}
                      onChange={(e) => updateProjectData('title', e.target.value)}
                      dir="auto"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">الوصف (اختياري)</Label>
                    <Textarea
                      id="description"
                      placeholder="وصف مختصر عن المشروع..."
                      value={projectData.description}
                      onChange={(e) => updateProjectData('description', e.target.value)}
                      rows={4}
                      dir="auto"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Template Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <CardTitle className="mb-2">اختر نوع القالب</CardTitle>
                  <CardDescription>
                    Select the type of pitch document you want to create
                  </CardDescription>
                </div>

                <div className="grid gap-4">
                  {/* TV Series Bible */}
                  <button
                    onClick={() => updateProjectData('documentType', 'SERIES_BIBLE')}
                    className={`
                      p-6 text-right border-2 rounded-lg transition-all
                      ${
                        projectData.documentType === 'SERIES_BIBLE'
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2" dir="rtl">
                          📺 كتاب المسلسل التلفزيوني
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">TV Series Bible</p>
                        <p className="text-slate-700" dir="rtl">
                          مستند شامل يوضح عالم المسلسل، الشخصيات، أقواس المواسم، والحلقة
                          التجريبية. مثالي للمسلسلات متعددة المواسم.
                        </p>
                      </div>
                      {projectData.documentType === 'SERIES_BIBLE' && (
                        <div className="mr-4 text-2xl">✓</div>
                      )}
                    </div>
                  </button>

                  {/* Film Lookbook */}
                  <button
                    onClick={() => updateProjectData('documentType', 'FILM_LOOKBOOK')}
                    className={`
                      p-6 text-right border-2 rounded-lg transition-all
                      ${
                        projectData.documentType === 'FILM_LOOKBOOK'
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2" dir="rtl">
                          🎬 لوك-بوك سينمائي
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">Film Lookbook</p>
                        <p className="text-slate-700" dir="rtl">
                          عرض بصري يركز على الصور أولاً مع نص محدود. مثالي للأفلام
                          السينمائية والعروض المرئية.
                        </p>
                      </div>
                      {projectData.documentType === 'FILM_LOOKBOOK' && (
                        <div className="mr-4 text-2xl">✓</div>
                      )}
                    </div>
                  </button>

                  {/* Pitch Deck */}
                  <button
                    onClick={() => updateProjectData('documentType', 'PITCH_DECK')}
                    className={`
                      p-6 text-right border-2 rounded-lg transition-all
                      ${
                        projectData.documentType === 'PITCH_DECK'
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2" dir="rtl">
                          📊 عرض تقديمي مختصر
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">Pitch Deck</p>
                        <p className="text-slate-700" dir="rtl">
                          عرض تقديمي سريع ومباشر يلخص الفكرة والإمكانيات التجارية. مثالي
                          للعروض السريعة والاجتماعات الأولية.
                        </p>
                      </div>
                      {projectData.documentType === 'PITCH_DECK' && (
                        <div className="mr-4 text-2xl">✓</div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Initial Setup */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <CardTitle className="mb-2">الإعداد الأولي</CardTitle>
                  <CardDescription>
                    معلومات أساسية عن المحتوى
                  </CardDescription>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="genre">
                      النوع / Genre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="genre"
                      placeholder="مثال: دراما، كوميديا، إثارة، خيال علمي"
                      value={projectData.genre}
                      onChange={(e) => updateProjectData('genre', e.target.value)}
                      dir="auto"
                    />
                    <p className="text-xs text-slate-500">
                      يمكنك إدخال أكثر من نوع مفصولة بفاصلة
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">الجمهور المستهدف (اختياري)</Label>
                    <Input
                      id="targetAudience"
                      placeholder="مثال: بالغين 25-40، عائلات، شباب"
                      value={projectData.targetAudience}
                      onChange={(e) => updateProjectData('targetAudience', e.target.value)}
                      dir="auto"
                    />
                  </div>

                  {/* Summary */}
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg" dir="rtl">
                    <h4 className="font-semibold mb-2">ملخص المشروع:</h4>
                    <ul className="space-y-1 text-sm text-slate-700">
                      <li>
                        <span className="font-medium">العنوان:</span> {projectData.title}
                      </li>
                      <li>
                        <span className="font-medium">النوع:</span>{' '}
                        {projectData.documentType === 'SERIES_BIBLE'
                          ? 'كتاب مسلسل تلفزيوني'
                          : projectData.documentType === 'FILM_LOOKBOOK'
                          ? 'لوك-بوك سينمائي'
                          : 'عرض تقديمي مختصر'}
                      </li>
                      <li>
                        <span className="font-medium">التصنيف:</span> {projectData.genre}
                      </li>
                      {projectData.targetAudience && (
                        <li>
                          <span className="font-medium">الجمهور:</span>{' '}
                          {projectData.targetAudience}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Navigation */}
          <div className="flex justify-between items-center px-8 pb-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              السابق
            </Button>

            <div className="text-sm text-slate-600">
              {currentStep + 1} / {WIZARD_STEPS.length}
            </div>

            {currentStep < WIZARD_STEPS.length - 1 ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                التالي
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canProceed() || isLoading}>
                {isLoading ? 'جاري الإنشاء...' : 'إنشاء المشروع'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
