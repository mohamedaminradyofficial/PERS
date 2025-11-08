import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/seasons/[id]/episodes - Create episode
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

    const seasonId = params.id
    const body = await request.json()
    const { episodeNumber, title, synopsis } = body

    if (!episodeNumber || !title) {
      return NextResponse.json(
        { error: 'Episode number and title are required' },
        { status: 400 }
      )
    }

    // Verify access
    const season = await prisma.season.findUnique({
      where: { id: seasonId },
      include: {
        document: {
          include: { project: true }
        }
      }
    })

    if (!season || season.document.project.createdById !== (session.user as any).id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const episode = await prisma.episode.create({
      data: {
        seasonId,
        episodeNumber,
        title,
        synopsis
      }
    })

    return NextResponse.json(episode, { status: 201 })
  } catch (error) {
    console.error('Failed to create episode:', error)
    return NextResponse.json(
      { error: 'Failed to create episode' },
      { status: 500 }
    )
  }
}
