import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/documents - Create a new document
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { projectId, type, sections } = body

    if (!projectId || !type) {
      return NextResponse.json(
        { error: 'Project ID and type are required' },
        { status: 400 }
      )
    }

    // Verify project ownership
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    if (project.createdById !== (session.user as any).id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Create document
    const document = await prisma.document.create({
      data: {
        type,
        projectId,
        sections: sections || {},
      },
      include: {
        project: true,
      }
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error('Failed to create document:', error)
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    )
  }
}
