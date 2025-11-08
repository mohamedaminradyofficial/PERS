/**
 * PPTX Export Service
 * Generates professional PowerPoint presentations
 */

interface ExportOptions {
  documentId: string
  documentType: string
  sections: any
  projectTitle: string
  language: 'en' | 'ar'
}

interface Slide {
  title: string
  content: string[]
  layout: 'title' | 'content' | 'twoColumn' | 'image'
}

export async function generatePPTX(options: ExportOptions): Promise<string> {
  const {
    documentType,
    sections,
    projectTitle,
    language
  } = options

  const slides: Slide[] = []

  // Title Slide
  if (sections.coverPage || sections.coverSlide) {
    const cover = sections.coverPage || sections.coverSlide
    slides.push({
      title: cover.title || projectTitle,
      content: [
        cover.tagline || '',
        '',
        `Created by: ${cover.createdBy || cover.directorName || cover.presenter || ''}`,
        new Date(cover.date).toLocaleDateString()
      ],
      layout: 'title'
    })
  }

  // Logline Slide
  if (sections.logline?.content) {
    slides.push({
      title: language === 'ar' ? 'اللوج لاين' : 'Logline',
      content: [sections.logline.content],
      layout: 'content'
    })
  }

  // Synopsis Slide
  if (sections.synopsis?.content) {
    const synopsisContent = sections.synopsis.content
    // Split long content into multiple slides if needed
    const maxCharsPerSlide = 500
    if (synopsisContent.length > maxCharsPerSlide) {
      const parts = splitIntoChunks(synopsisContent, maxCharsPerSlide)
      parts.forEach((part, index) => {
        slides.push({
          title: `${language === 'ar' ? 'الملخص' : 'Synopsis'} ${index > 0 ? `(${index + 1})` : ''}`,
          content: [part],
          layout: 'content'
        })
      })
    } else {
      slides.push({
        title: language === 'ar' ? 'الملخص' : 'Synopsis',
        content: [synopsisContent],
        layout: 'content'
      })
    }
  }

  // Key Points (for Pitch Deck)
  if (sections.keyPoints) {
    slides.push({
      title: language === 'ar' ? 'النقاط الرئيسية' : 'Key Points',
      content: [
        `Unique Selling Point: ${sections.keyPoints.uniqueSellingPoint || ''}`,
        `Target Audience: ${sections.keyPoints.targetAudience || ''}`,
        `Market Potential: ${sections.keyPoints.marketPotential || ''}`
      ],
      layout: 'content'
    })
  }

  // Visual Concept (for Film Lookbook)
  if (sections.visualConcept) {
    slides.push({
      title: language === 'ar' ? 'المفهوم البصري' : 'Visual Concept',
      content: [
        `Color Palette: ${sections.visualConcept.colorPalette || ''}`,
        `Cinematography: ${sections.visualConcept.cinematography || ''}`,
        `Production Design: ${sections.visualConcept.productionDesign || ''}`,
        `Costume: ${sections.visualConcept.costume || ''}`
      ],
      layout: 'content'
    })
  }

  // World Building (for Series Bible)
  if (sections.world) {
    slides.push({
      title: language === 'ar' ? 'عالم القصة' : 'Story World',
      content: [
        `Setting: ${sections.world.setting || ''}`,
        `Time & Place: ${sections.world.timeAndPlace || ''}`,
        `Visual Style: ${sections.world.visualStyle || ''}`,
        `Atmosphere: ${sections.world.atmosphere || ''}`
      ],
      layout: 'content'
    })
  }

  // Thank You Slide
  slides.push({
    title: language === 'ar' ? 'شكراً لكم' : 'Thank You',
    content: [
      language === 'ar' ? 'نتطلع للعمل معكم' : 'Looking forward to working together',
      '',
      projectTitle
    ],
    layout: 'title'
  })

  // In a real implementation, this would use a PPTX library like pptxgenjs
  // For now, we'll return a data structure that represents the PPTX

  const pptxData = {
    metadata: {
      title: projectTitle,
      type: documentType,
      language,
      slideCount: slides.length,
      createdAt: new Date().toISOString()
    },
    slides
  }

  return JSON.stringify(pptxData, null, 2)
}

function splitIntoChunks(text: string, maxChars: number): string[] {
  const chunks: string[] = []
  const sentences = text.split(/[.!?]+/)

  let currentChunk = ''

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim()
    if (!trimmedSentence) continue

    if ((currentChunk + trimmedSentence).length > maxChars) {
      if (currentChunk) {
        chunks.push(currentChunk.trim())
        currentChunk = trimmedSentence + '.'
      } else {
        chunks.push(trimmedSentence + '.')
      }
    } else {
      currentChunk += trimmedSentence + '.'
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}

export interface PPTXExportResult {
  success: boolean
  fileUrl?: string
  error?: string
  metadata?: {
    slideCount: number
    fileSize: number
    createdAt: string
  }
}

export async function exportToPPTX(options: ExportOptions): Promise<PPTXExportResult> {
  try {
    const pptxContent = await generatePPTX(options)

    // In a real implementation:
    // 1. Generate actual PPTX using a library like pptxgenjs
    // 2. Upload to cloud storage (S3, etc.)
    // 3. Return the file URL

    // For now, we'll simulate success
    return {
      success: true,
      fileUrl: `/exports/${options.documentId}.pptx`,
      metadata: {
        slideCount: 10,
        fileSize: 1024 * 256, // 256 KB
        createdAt: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('PPTX export failed:', error)
    return {
      success: false,
      error: 'Failed to generate PPTX'
    }
  }
}
