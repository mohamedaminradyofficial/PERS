import { NextRequest, NextResponse } from 'next/server'
import { validateSynopsisTreatment } from '@/lib/validators/synopsis-treatment'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { synopsis, treatment } = body

    // Validate that at least one field is provided
    if (!synopsis && !treatment) {
      return NextResponse.json(
        { error: 'At least one of synopsis or treatment must be provided' },
        { status: 400 }
      )
    }

    // Validate types if provided
    if (synopsis && typeof synopsis !== 'string') {
      return NextResponse.json(
        { error: 'Synopsis must be a string' },
        { status: 400 }
      )
    }

    if (treatment && typeof treatment !== 'string') {
      return NextResponse.json(
        { error: 'Treatment must be a string' },
        { status: 400 }
      )
    }

    const validation = validateSynopsisTreatment(synopsis, treatment)

    return NextResponse.json(validation)
  } catch (error) {
    console.error('Synopsis/Treatment validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate synopsis/treatment' },
      { status: 500 }
    )
  }
}
