import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/projects/[id]/documents - Create a new document
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

    const projectId = params.id
    const body = await request.json()
    const { type, language = 'en' } = body

    if (!type) {
      return NextResponse.json(
        { error: 'Document type is required' },
        { status: 400 }
      )
    }

    // Verify project ownership
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project || project.createdById !== (session.user as any).id) {
      return NextResponse.json(
        { error: 'Project not found or unauthorized' },
        { status: 404 }
      )
    }

    // Create initial sections based on document type
    const initialSections = getInitialSections(type, language)

    const document = await prisma.document.create({
      data: {
        type,
        projectId,
        sections: initialSections
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

function getInitialSections(type: string, language: string) {
  const sections: any = {}

  if (type === 'SERIES_BIBLE') {
    sections.title = language === 'ar' ? 'كتاب المسلسل' : 'Series Bible'
    sections.coverPage = {
      title: '',
      tagline: '',
      createdBy: '',
      date: new Date().toISOString()
    }
    sections.logline = {
      content: '',
      wordCount: 0
    }
    sections.synopsis = {
      content: '',
      revealsEnding: false
    }
    sections.treatment = {
      content: '',
      isPresentTense: false
    }
    sections.world = {
      setting: '',
      timeAndPlace: '',
      visualStyle: '',
      atmosphere: ''
    }
    sections.toneAndStyle = {
      tone: '',
      genre: '',
      references: []
    }
  } else if (type === 'FILM_LOOKBOOK') {
    sections.title = language === 'ar' ? 'لوك بوك الفيلم' : 'Film Lookbook'
    sections.coverPage = {
      title: '',
      tagline: '',
      directorName: '',
      date: new Date().toISOString()
    }
    sections.logline = {
      content: '',
      wordCount: 0
    }
    sections.synopsis = {
      content: '',
      revealsEnding: false
    }
    sections.treatment = {
      content: '',
      isPresentTense: false
    }
    sections.visualConcept = {
      colorPalette: '',
      cinematography: '',
      productionDesign: '',
      costume: ''
    }
    sections.references = {
      films: [],
      images: []
    }
  } else if (type === 'PITCH_DECK') {
    sections.title = language === 'ar' ? 'العرض التقديمي' : 'Pitch Deck'
    sections.coverSlide = {
      title: '',
      tagline: '',
      presenter: '',
      date: new Date().toISOString()
    }
    sections.logline = {
      content: '',
      wordCount: 0
    }
    sections.concept = {
      content: ''
    }
    sections.keyPoints = {
      uniqueSellingPoint: '',
      targetAudience: '',
      marketPotential: ''
    }
  }

  return sections
}

// GET /api/projects/[id]/documents - List documents for a project
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

    const projectId = params.id

    // Verify project access
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project || project.createdById !== (session.user as any).id) {
      return NextResponse.json(
        { error: 'Project not found or unauthorized' },
        { status: 404 }
      )
    }

    const documents = await prisma.document.findMany({
      where: {
        projectId
      },
      include: {
        logline: true,
        synopsisTreatment: true,
        characters: true,
        seasons: {
          include: {
            episodes: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.error('Failed to fetch documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}
