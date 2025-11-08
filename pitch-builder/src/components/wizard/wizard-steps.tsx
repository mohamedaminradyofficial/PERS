'use client'

interface WizardStep {
  id: number
  title: string
  description: string
}

interface WizardStepsProps {
  steps: WizardStep[]
  currentStep: number
}

export function WizardSteps({ steps, currentStep }: WizardStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Circle indicator */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${
                    index < currentStep
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }
                `}
              >
                {index < currentStep ? '✓' : step.id}
              </div>

              {/* Step info */}
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium ${
                  index === currentStep ? 'text-slate-900' : 'text-slate-600'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-slate-500 hidden md:block">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  h-1 flex-1 mx-4 -mt-12
                  ${index < currentStep ? 'bg-green-500' : 'bg-slate-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
