import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET export job status
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')
    const documentId = searchParams.get('documentId')

    if (!jobId && !documentId) {
      return NextResponse.json(
        { error: 'Either jobId or documentId is required' },
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

    let exportJobs

    if (jobId) {
      // Get specific job
      const job = await prisma.exportJob.findUnique({
        where: { id: jobId },
        include: {
          document: {
            include: {
              project: true
            }
          }
        }
      })

      if (!job) {
        return NextResponse.json(
          { error: 'Export job not found' },
          { status: 404 }
        )
      }

      // Verify user owns this project
      if (job.document.project.userId !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      exportJobs = [job]
    } else if (documentId) {
      // Get all jobs for this document
      const jobs = await prisma.exportJob.findMany({
        where: { documentId },
        include: {
          document: {
            include: {
              project: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      if (jobs.length === 0) {
        return NextResponse.json(
          { error: 'No export jobs found for this document' },
          { status: 404 }
        )
      }

      // Verify user owns this project
      if (jobs[0].document.project.userId !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      exportJobs = jobs
    }

    return NextResponse.json({
      jobs: exportJobs?.map(job => ({
        id: job.id,
        format: job.format,
        status: job.status,
        fileUrl: job.fileUrl,
        error: job.error,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
      }))
    })

  } catch (error) {
    console.error('Get export status error:', error)
    return NextResponse.json(
      { error: 'Failed to get export status' },
      { status: 500 }
    )
  }
}
