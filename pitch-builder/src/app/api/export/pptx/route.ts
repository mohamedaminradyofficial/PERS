import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { exportProjectToPPTX } from '@/lib/export/pptx-exporter'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { projectId } = body

    if (!projectId) {
      return NextResponse.json(
        { error: 'projectId is required' },
        { status: 400 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Fetch complete project data
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        user: true,
        documents: {
          include: {
            synopsisTreatment: true,
            logline: true
          }
        },
        characters: true,
        visualAssets: true,
        comps: true,
        seasons: {
          include: {
            episodes: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Verify user owns this project
    if (project.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Prepare project data for export
    const projectData = {
      title: project.title,
      description: project.description,
      user: {
        name: project.user.name,
        email: project.user.email
      },
      logline: project.documents[0]?.logline,
      synopsisTreatment: project.documents[0]?.synopsisTreatment,
      characters: project.characters,
      visualAssets: project.visualAssets,
      comps: project.comps,
      seasons: project.seasons
    }

    // Generate PPTX
    const pptxBlob = await exportProjectToPPTX(projectData)

    // Convert blob to buffer
    const buffer = Buffer.from(await pptxBlob.arrayBuffer())

    // Create export job record
    await prisma.exportJob.create({
      data: {
        documentId: project.documents[0]?.id || projectId,
        format: 'PPTX',
        status: 'completed',
        fileUrl: `exports/${projectId}_${Date.now()}.pptx`
      }
    })

    // Return PPTX as response
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${project.title || 'project'}.pptx"`,
        'Content-Length': buffer.length.toString()
      }
    })

  } catch (error) {
    console.error('PPTX export error:', error)

    // Log failed export job if we have enough info
    const { projectId } = await request.json().catch(() => ({}))
    if (projectId) {
      try {
        const project = await prisma.project.findUnique({
          where: { id: projectId },
          include: { documents: true }
        })

        if (project?.documents[0]) {
          await prisma.exportJob.create({
            data: {
              documentId: project.documents[0].id,
              format: 'PPTX',
              status: 'failed',
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          })
        }
      } catch (logError) {
        console.error('Failed to log export error:', logError)
      }
    }

    return NextResponse.json(
      { error: 'Failed to export PPTX' },
      { status: 500 }
    )
  }
}
