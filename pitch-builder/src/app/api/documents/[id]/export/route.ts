import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { exportToPDF } from '@/lib/export/pdf'
import { exportToPPTX } from '@/lib/export/pptx'

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
    const { format, language = 'en', includeTableOfContents = true } = body

    if (!format || !['pdf', 'pptx'].includes(format)) {
      return NextResponse.json(
        { error: 'Invalid format. Must be "pdf" or "pptx"' },
        { status: 400 }
      )
    }

    // Fetch document
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        project: true
      }
    })

    if (!document || document.project.createdById !== (session.user as any).id) {
      return NextResponse.json(
        { error: 'Document not found or unauthorized' },
        { status: 404 }
      )
    }

    // Create export job
    const exportJob = await prisma.exportJob.create({
      data: {
        documentId,
        format: format.toUpperCase(),
        status: 'processing'
      }
    })

    // Generate export based on format
    let result

    if (format === 'pdf') {
      result = await exportToPDF({
        documentId,
        documentType: document.type,
        sections: document.sections as any,
        projectTitle: document.project.title,
        includeTableOfContents,
        includePageNumbers: true,
        language
      })
    } else {
      result = await exportToPPTX({
        documentId,
        documentType: document.type,
        sections: document.sections as any,
        projectTitle: document.project.title,
        language
      })
    }

    // Update export job
    if (result.success) {
      await prisma.exportJob.update({
        where: { id: exportJob.id },
        data: {
          status: 'completed',
          fileUrl: result.fileUrl
        }
      })
    } else {
      await prisma.exportJob.update({
        where: { id: exportJob.id },
        data: {
          status: 'failed',
          error: result.error
        }
      })
    }

    return NextResponse.json({
      success: result.success,
      exportJobId: exportJob.id,
      fileUrl: result.fileUrl,
      metadata: result.metadata,
      error: result.error
    })
  } catch (error) {
    console.error('Export failed:', error)
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    )
  }
}
