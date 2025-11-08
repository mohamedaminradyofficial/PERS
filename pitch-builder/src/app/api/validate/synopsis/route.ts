import { NextRequest, NextResponse } from 'next/server'
import { validateSynopsis, getSynopsisGuidance } from '@/lib/validators/synopsis'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { synopsis } = body

    if (!synopsis) {
      return NextResponse.json(
        { error: 'Synopsis is required' },
        { status: 400 }
      )
    }

    const validation = validateSynopsis(synopsis)

    return NextResponse.json({
      ...validation,
      guidance: getSynopsisGuidance()
    })
  } catch (error) {
    console.error('Failed to validate synopsis:', error)
    return NextResponse.json(
      { error: 'Failed to validate synopsis' },
      { status: 500 }
    )
  }
}
