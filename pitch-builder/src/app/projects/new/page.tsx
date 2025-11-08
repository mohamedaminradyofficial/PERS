import ProjectWizard from '@/components/wizard/ProjectWizard'

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            إنشاء مشروع جديد
          </h1>
          <p className="text-slate-600">
            Create a new TV Series Bible, Film Lookbook, or Pitch Deck
          </p>
        </div>

        <ProjectWizard />
      </div>
    </div>
  )
}
