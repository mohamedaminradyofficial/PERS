import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/documents/[id]/seasons - List seasons
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

    const seasons = await prisma.season.findMany({
      where: { documentId },
      include: {
        episodes: {
          orderBy: { episodeNumber: 'asc' }
        }
      },
      orderBy: { seasonNumber: 'asc' }
    })

    return NextResponse.json(seasons)
  } catch (error) {
    console.error('Failed to fetch seasons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch seasons' },
      { status: 500 }
    )
  }
}

// POST /api/documents/[id]/seasons - Create season
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
    const { seasonNumber, title, arc } = body

    if (!seasonNumber) {
      return NextResponse.json(
        { error: 'Season number is required' },
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

    const season = await prisma.season.create({
      data: {
        documentId,
        seasonNumber,
        title,
        arc
      },
      include: {
        episodes: true
      }
    })

    return NextResponse.json(season, { status: 201 })
  } catch (error) {
    console.error('Failed to create season:', error)
    return NextResponse.json(
      { error: 'Failed to create season' },
      { status: 500 }
    )
  }
}
