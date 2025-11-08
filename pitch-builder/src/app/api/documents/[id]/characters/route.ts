import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/documents/[id]/characters - List characters
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const documentId = params.id

    // Verify access
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { project: true }
    })

    if (!document || document.project.createdById !== (session.user as any).id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const characters = await prisma.character.findMany({
      where: { documentId },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(characters)
  } catch (error) {
    console.error('Failed to fetch characters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch characters' },
      { status: 500 }
    )
  }
}

// POST /api/documents/[id]/characters - Create character
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const documentId = params.id
    const body = await request.json()
    const { name, description, motivation, arc, imageUrl, order } = body

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      )
    }

    // Verify access
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { project: true }
    })

    if (!document || document.project.createdById !== (session.user as any).id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const character = await prisma.character.create({
      data: {
        documentId,
        name,
        description,
        motivation,
        arc,
        imageUrl,
        order: order || 0
      }
    })

    return NextResponse.json(character, { status: 201 })
  } catch (error) {
    console.error('Failed to create character:', error)
    return NextResponse.json(
      { error: 'Failed to create character' },
      { status: 500 }
    )
  }
}
