import { NextRequest, NextResponse } from 'next/server'
import { validateLogline } from '@/lib/validators/logline'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content } = body

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      )
    }

    const validation = validateLogline(content)

    return NextResponse.json(validation)
  } catch (error) {
    console.error('Logline validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate logline' },
      { status: 500 }
    )
  }
}
