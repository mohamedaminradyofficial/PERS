import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { validateSynopsisTreatment } from '@/lib/validators/synopsis-treatment'

// GET synopsis/treatment by documentId
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('documentId')

    if (!documentId) {
      return NextResponse.json(
        { error: 'documentId is required' },
        { status: 400 }
      )
    }

    const synopsisTreatment = await prisma.synopsisTreatment.findUnique({
      where: { documentId },
      include: {
        document: {
          include: {
            project: true
          }
        }
      }
    })

    if (!synopsisTreatment) {
      return NextResponse.json(
        { error: 'Synopsis/Treatment not found' },
        { status: 404 }
      )
    }

    // Verify user has access to this document's project
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (synopsisTreatment.document.project.userId !== user?.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(synopsisTreatment)
  } catch (error) {
    console.error('Get synopsis/treatment error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch synopsis/treatment' },
      { status: 500 }
    )
  }
}

// POST create or update synopsis/treatment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { documentId, synopsis, treatment } = body

    if (!documentId) {
      return NextResponse.json(
        { error: 'documentId is required' },
        { status: 400 }
      )
    }

    // Verify user has access to this document
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { project: true }
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    if (document.project.userId !== user?.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Validate synopsis and treatment
    const validation = validateSynopsisTreatment(synopsis, treatment)

    // Create or update synopsis/treatment
    const synopsisTreatment = await prisma.synopsisTreatment.upsert({
      where: { documentId },
      create: {
        documentId,
        synopsis: synopsis || null,
        treatment: treatment || null,
        synopsisValid: validation.synopsis.isValid,
        treatmentValid: validation.treatment.isValid,
      },
      update: {
        synopsis: synopsis !== undefined ? synopsis : undefined,
        treatment: treatment !== undefined ? treatment : undefined,
        synopsisValid: validation.synopsis.isValid,
        treatmentValid: validation.treatment.isValid,
      },
      include: {
        document: true
      }
    })

    return NextResponse.json({
      synopsisTreatment,
      validation
    })
  } catch (error) {
    console.error('Create/update synopsis/treatment error:', error)
    return NextResponse.json(
      { error: 'Failed to create/update synopsis/treatment' },
      { status: 500 }
    )
  }
}

// DELETE synopsis/treatment
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('documentId')

    if (!documentId) {
      return NextResponse.json(
        { error: 'documentId is required' },
        { status: 400 }
      )
    }

    // Verify user has access
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    const synopsisTreatment = await prisma.synopsisTreatment.findUnique({
      where: { documentId },
      include: {
        document: {
          include: { project: true }
        }
      }
    })

    if (!synopsisTreatment) {
      return NextResponse.json(
        { error: 'Synopsis/Treatment not found' },
        { status: 404 }
      )
    }

    if (synopsisTreatment.document.project.userId !== user?.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.synopsisTreatment.delete({
      where: { documentId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete synopsis/treatment error:', error)
    return NextResponse.json(
      { error: 'Failed to delete synopsis/treatment' },
      { status: 500 }
    )
  }
}
