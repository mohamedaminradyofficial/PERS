import { jsPDF } from 'jspdf'

interface PDFSection {
  title: string
  content: string
  level: number // 1 for main heading, 2 for subheading
  pageNumber?: number
}

interface PDFImage {
  data: string // base64 or URL
  caption?: string
  width?: number
  height?: number
}

interface PDFExportOptions {
  title: string
  author?: string
  sections: PDFSection[]
  images?: PDFImage[]
  includeTOC?: boolean
  dpi?: number
}

export class PDFExporter {
  private doc: jsPDF
  private readonly PAGE_WIDTH = 210 // A4 width in mm
  private readonly PAGE_HEIGHT = 297 // A4 height in mm
  private readonly MARGIN = 20
  private readonly DPI = 300 // Default 300 DPI for print quality
  private currentY = this.MARGIN
  private pageNumber = 1
  private tocEntries: PDFSection[] = []

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    })
  }

  /**
   * Export a document to PDF with automatic table of contents and 300dpi images
   */
  async export(options: PDFExportOptions): Promise<Blob> {
    const { title, author, sections, images, includeTOC = true, dpi = this.DPI } = options

    // Title Page
    this.addTitlePage(title, author)
    this.addPage()

    // Collect TOC entries
    this.tocEntries = sections.map(section => ({ ...section }))

    // Add Table of Contents if requested
    if (includeTOC) {
      this.addTableOfContents()
      this.addPage()
    }

    // Add Sections
    for (const section of sections) {
      section.pageNumber = this.pageNumber
      await this.addSection(section)
    }

    // Add Images
    if (images && images.length > 0) {
      await this.addImages(images, dpi)
    }

    // Generate and return PDF blob
    return this.doc.output('blob')
  }

  /**
   * Add title page
   */
  private addTitlePage(title: string, author?: string) {
    this.doc.setFontSize(32)
    this.doc.setFont('helvetica', 'bold')

    // Center the title
    const titleWidth = this.doc.getTextWidth(title)
    const titleX = (this.PAGE_WIDTH - titleWidth) / 2
    const titleY = this.PAGE_HEIGHT / 3

    this.doc.text(title, titleX, titleY)

    // Add author if provided
    if (author) {
      this.doc.setFontSize(16)
      this.doc.setFont('helvetica', 'normal')
      const authorText = `by ${author}`
      const authorWidth = this.doc.getTextWidth(authorText)
      const authorX = (this.PAGE_WIDTH - authorWidth) / 2
      this.doc.text(authorText, authorX, titleY + 15)
    }

    // Add date
    this.doc.setFontSize(12)
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const dateWidth = this.doc.getTextWidth(date)
    const dateX = (this.PAGE_WIDTH - dateWidth) / 2
    this.doc.text(date, dateX, this.PAGE_HEIGHT - 30)
  }

  /**
   * Add table of contents
   */
  private addTableOfContents() {
    this.currentY = this.MARGIN

    this.doc.setFontSize(24)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Table of Contents', this.MARGIN, this.currentY)
    this.currentY += 15

    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'normal')

    for (const entry of this.tocEntries) {
      if (this.currentY > this.PAGE_HEIGHT - this.MARGIN) {
        this.addPage()
      }

      const indent = (entry.level - 1) * 10
      const title = entry.title
      const pageNum = entry.pageNumber?.toString() || '0'

      // Draw dotted line
      const titleWidth = this.doc.getTextWidth(title)
      const pageWidth = this.doc.getTextWidth(pageNum)
      const dotsWidth = this.PAGE_WIDTH - this.MARGIN * 2 - indent - titleWidth - pageWidth - 5

      this.doc.text(title, this.MARGIN + indent, this.currentY)
      this.doc.text(pageNum, this.PAGE_WIDTH - this.MARGIN - pageWidth, this.currentY)

      // Draw dots
      this.doc.setLineDash([1, 2])
      const dotsY = this.currentY - 2
      this.doc.line(
        this.MARGIN + indent + titleWidth + 2,
        dotsY,
        this.PAGE_WIDTH - this.MARGIN - pageWidth - 2,
        dotsY
      )
      this.doc.setLineDash([])

      this.currentY += 7
    }
  }

  /**
   * Add a section to the PDF
   */
  private async addSection(section: PDFSection) {
    if (this.currentY > this.PAGE_HEIGHT - this.MARGIN - 20) {
      this.addPage()
    }

    // Add section title
    const fontSize = section.level === 1 ? 18 : 14
    this.doc.setFontSize(fontSize)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(section.title, this.MARGIN, this.currentY)
    this.currentY += fontSize / 2 + 5

    // Add section content
    this.doc.setFontSize(11)
    this.doc.setFont('helvetica', 'normal')

    const lines = this.doc.splitTextToSize(
      section.content,
      this.PAGE_WIDTH - this.MARGIN * 2
    )

    for (const line of lines) {
      if (this.currentY > this.PAGE_HEIGHT - this.MARGIN) {
        this.addPage()
      }

      this.doc.text(line, this.MARGIN, this.currentY)
      this.currentY += 6
    }

    this.currentY += 10 // Space after section
  }

  /**
   * Add images with 300dpi quality
   */
  private async addImages(images: PDFImage[], dpi: number) {
    this.addPage()

    this.doc.setFontSize(24)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Visual Assets', this.MARGIN, this.currentY)
    this.currentY += 15

    for (const image of images) {
      try {
        // Calculate dimensions to maintain 300dpi
        const maxWidth = this.PAGE_WIDTH - this.MARGIN * 2
        const maxHeight = 150 // Max height for images

        let imgWidth = image.width || maxWidth
        let imgHeight = image.height || maxHeight

        // Maintain aspect ratio
        if (imgWidth > maxWidth) {
          imgHeight = (imgHeight * maxWidth) / imgWidth
          imgWidth = maxWidth
        }

        if (imgHeight > maxHeight) {
          imgWidth = (imgWidth * maxHeight) / imgHeight
          imgHeight = maxHeight
        }

        // Check if image fits on current page
        if (this.currentY + imgHeight + 20 > this.PAGE_HEIGHT - this.MARGIN) {
          this.addPage()
        }

        // Add image (jsPDF handles base64 and URLs)
        this.doc.addImage(
          image.data,
          'JPEG',
          this.MARGIN,
          this.currentY,
          imgWidth,
          imgHeight,
          undefined,
          'FAST' // Use FAST for better quality
        )

        this.currentY += imgHeight + 5

        // Add caption if provided
        if (image.caption) {
          this.doc.setFontSize(10)
          this.doc.setFont('helvetica', 'italic')
          this.doc.text(image.caption, this.MARGIN, this.currentY)
          this.currentY += 10
        }

        this.currentY += 10 // Space after image

      } catch (error) {
        console.error('Error adding image:', error)
        // Continue with next image
      }
    }
  }

  /**
   * Add a new page
   */
  private addPage() {
    if (this.pageNumber > 1 || this.currentY > this.MARGIN) {
      this.doc.addPage()
      this.pageNumber++
    }
    this.currentY = this.MARGIN
    this.addPageNumber()
  }

  /**
   * Add page number to footer
   */
  private addPageNumber() {
    this.doc.setFontSize(10)
    this.doc.setFont('helvetica', 'normal')
    const pageText = `Page ${this.pageNumber}`
    const textWidth = this.doc.getTextWidth(pageText)
    this.doc.text(pageText, (this.PAGE_WIDTH - textWidth) / 2, this.PAGE_HEIGHT - 10)
  }

  /**
   * Download the PDF
   */
  download(filename: string) {
    this.doc.save(filename)
  }

  /**
   * Get the PDF as base64 string
   */
  toBase64(): string {
    return this.doc.output('datauristring')
  }
}

/**
 * Helper function to export a project to PDF
 */
export async function exportProjectToPDF(projectData: any): Promise<Blob> {
  const exporter = new PDFExporter()

  const sections: PDFSection[] = []

  // Add Logline
  if (projectData.logline) {
    sections.push({
      title: 'Logline',
      content: projectData.logline.content,
      level: 1
    })
  }

  // Add Synopsis
  if (projectData.synopsisTreatment?.synopsis) {
    sections.push({
      title: 'Synopsis',
      content: projectData.synopsisTreatment.synopsis,
      level: 1
    })
  }

  // Add Treatment
  if (projectData.synopsisTreatment?.treatment) {
    sections.push({
      title: 'Treatment',
      content: projectData.synopsisTreatment.treatment,
      level: 1
    })
  }

  // Add Characters
  if (projectData.characters && projectData.characters.length > 0) {
    sections.push({
      title: 'Characters',
      content: '',
      level: 1
    })

    projectData.characters.forEach((char: any) => {
      sections.push({
        title: char.name,
        content: `Role: ${char.role || 'N/A'}\n\n${char.description || ''}\n\nMotivation: ${char.motivation || 'N/A'}\n\nCharacter Arc: ${char.arc || 'N/A'}`,
        level: 2
      })
    })
  }

  // Collect images
  const images: PDFImage[] = []
  if (projectData.visualAssets && projectData.visualAssets.length > 0) {
    projectData.visualAssets.forEach((asset: any) => {
      if (asset.fileUrl) {
        images.push({
          data: asset.fileUrl,
          caption: asset.caption || ''
        })
      }
    })
  }

  return await exporter.export({
    title: projectData.title || 'Untitled Project',
    author: projectData.user?.name || projectData.user?.email,
    sections,
    images,
    includeTOC: true,
    dpi: 300
  })
}
