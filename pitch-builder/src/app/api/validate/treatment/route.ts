import { NextRequest, NextResponse } from 'next/server'
import { validateTreatment, getTreatmentGuidance } from '@/lib/validators/treatment'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { treatment } = body

    if (!treatment) {
      return NextResponse.json(
        { error: 'Treatment is required' },
        { status: 400 }
      )
    }

    const validation = validateTreatment(treatment)

    return NextResponse.json({
      ...validation,
      guidance: getTreatmentGuidance()
    })
  } catch (error) {
    console.error('Failed to validate treatment:', error)
    return NextResponse.json(
      { error: 'Failed to validate treatment' },
      { status: 500 }
    )
  }
}
