import pptxgen from 'pptxgenjs'

interface PPTXSlide {
  title: string
  content?: string
  bullets?: string[]
  image?: {
    path: string
    x?: number
    y?: number
    w?: number
    h?: number
  }
  layout?: 'title' | 'content' | 'two-column' | 'image' | 'blank'
}

interface PPTXExportOptions {
  title: string
  author?: string
  slides: PPTXSlide[]
  theme?: 'light' | 'dark' | 'professional'
}

export class PPTXExporter {
  private pres: pptxgen
  private readonly SLIDE_WIDTH = 10 // inches
  private readonly SLIDE_HEIGHT = 5.625 // inches (16:9 aspect ratio)

  constructor() {
    this.pres = new pptxgen()
    this.pres.layout = 'LAYOUT_16x9'
    this.pres.author = 'Pitch Builder'
  }

  /**
   * Export a presentation to PPTX
   */
  async export(options: PPTXExportOptions): Promise<Blob> {
    const { title, author, slides, theme = 'professional' } = options

    // Set presentation properties
    this.pres.title = title
    if (author) {
      this.pres.author = author
    }
    this.pres.subject = 'Film/TV Pitch Deck'

    // Apply theme
    this.applyTheme(theme)

    // Add title slide
    this.addTitleSlide(title, author)

    // Add content slides
    for (const slideData of slides) {
      await this.addSlide(slideData)
    }

    // Generate PPTX
    const blob = await this.pres.write({ outputType: 'blob' }) as Blob
    return blob
  }

  /**
   * Apply theme to presentation
   */
  private applyTheme(theme: 'light' | 'dark' | 'professional') {
    const themes = {
      light: {
        background: 'FFFFFF',
        text: '333333',
        accent: '4472C4',
        secondary: '70AD47'
      },
      dark: {
        background: '1F1F1F',
        text: 'FFFFFF',
        accent: '5B9BD5',
        secondary: '70AD47'
      },
      professional: {
        background: 'F5F5F5',
        text: '2C3E50',
        accent: '3498DB',
        secondary: 'E74C3C'
      }
    }

    const selectedTheme = themes[theme]

    // Define master slide layout
    this.pres.defineSlideMaster({
      title: 'MASTER_SLIDE',
      background: { color: selectedTheme.background },
      objects: [
        {
          line: {
            x: 0.5,
            y: 5.0,
            w: 9.0,
            h: 0,
            line: { color: selectedTheme.accent, width: 2 }
          }
        }
      ]
    })
  }

  /**
   * Add title slide
   */
  private addTitleSlide(title: string, author?: string) {
    const slide = this.pres.addSlide()
    slide.background = { color: '2C3E50' }

    // Title
    slide.addText(title, {
      x: 0.5,
      y: 1.5,
      w: 9.0,
      h: 1.5,
      fontSize: 44,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
      fontFace: 'Arial'
    })

    // Subtitle with author
    if (author) {
      slide.addText(`by ${author}`, {
        x: 0.5,
        y: 3.2,
        w: 9.0,
        h: 0.5,
        fontSize: 24,
        color: 'ECF0F1',
        align: 'center',
        fontFace: 'Arial'
      })
    }

    // Date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    slide.addText(date, {
      x: 0.5,
      y: 4.5,
      w: 9.0,
      h: 0.5,
      fontSize: 16,
      color: 'BDC3C7',
      align: 'center',
      fontFace: 'Arial'
    })
  }

  /**
   * Add a content slide
   */
  private async addSlide(slideData: PPTXSlide) {
    const slide = this.pres.addSlide()

    // Add title
    slide.addText(slideData.title, {
      x: 0.5,
      y: 0.3,
      w: 9.0,
      h: 0.6,
      fontSize: 32,
      bold: true,
      color: '2C3E50',
      fontFace: 'Arial'
    })

    // Add content based on layout
    switch (slideData.layout) {
      case 'content':
        if (slideData.content) {
          slide.addText(slideData.content, {
            x: 0.5,
            y: 1.2,
            w: 9.0,
            h: 4.0,
            fontSize: 18,
            color: '34495E',
            fontFace: 'Arial',
            valign: 'top'
          })
        }
        break

      case 'two-column':
        if (slideData.bullets) {
          const midPoint = Math.ceil(slideData.bullets.length / 2)
          const leftBullets = slideData.bullets.slice(0, midPoint)
          const rightBullets = slideData.bullets.slice(midPoint)

          // Left column
          slide.addText(leftBullets, {
            x: 0.5,
            y: 1.2,
            w: 4.25,
            h: 4.0,
            fontSize: 16,
            bullet: true,
            color: '34495E',
            fontFace: 'Arial'
          })

          // Right column
          slide.addText(rightBullets, {
            x: 5.25,
            y: 1.2,
            w: 4.25,
            h: 4.0,
            fontSize: 16,
            bullet: true,
            color: '34495E',
            fontFace: 'Arial'
          })
        }
        break

      case 'image':
        if (slideData.image) {
          try {
            slide.addImage({
              path: slideData.image.path,
              x: slideData.image.x || 1.5,
              y: slideData.image.y || 1.5,
              w: slideData.image.w || 7.0,
              h: slideData.image.h || 3.5,
              sizing: { type: 'contain', w: slideData.image.w || 7.0, h: slideData.image.h || 3.5 }
            })
          } catch (error) {
            console.error('Error adding image to slide:', error)
          }
        }
        if (slideData.content) {
          slide.addText(slideData.content, {
            x: 0.5,
            y: 5.0,
            w: 9.0,
            h: 0.4,
            fontSize: 14,
            italic: true,
            color: '7F8C8D',
            align: 'center',
            fontFace: 'Arial'
          })
        }
        break

      default:
        // Default content with bullets
        if (slideData.bullets) {
          slide.addText(slideData.bullets, {
            x: 0.5,
            y: 1.2,
            w: 9.0,
            h: 4.0,
            fontSize: 20,
            bullet: { type: 'number' },
            color: '34495E',
            fontFace: 'Arial'
          })
        } else if (slideData.content) {
          slide.addText(slideData.content, {
            x: 0.5,
            y: 1.2,
            w: 9.0,
            h: 4.0,
            fontSize: 18,
            color: '34495E',
            fontFace: 'Arial',
            valign: 'top'
          })
        }
    }
  }

  /**
   * Download the PPTX
   */
  async download(filename: string) {
    await this.pres.writeFile({ fileName: filename })
  }
}

/**
 * Helper function to export a project to PPTX
 */
export async function exportProjectToPPTX(projectData: any): Promise<Blob> {
  const exporter = new PPTXExporter()

  const slides: PPTXSlide[] = []

  // Add Logline Slide
  if (projectData.logline) {
    slides.push({
      title: 'Logline',
      content: projectData.logline.content,
      layout: 'content'
    })
  }

  // Add Synopsis Slide
  if (projectData.synopsisTreatment?.synopsis) {
    const synopsis = projectData.synopsisTreatment.synopsis
    // Split long synopsis into multiple slides if needed
    if (synopsis.length > 500) {
      const chunks = synopsis.match(/.{1,500}(\s|$)/g) || [synopsis]
      chunks.forEach((chunk, index) => {
        slides.push({
          title: `Synopsis ${chunks.length > 1 ? `(${index + 1}/${chunks.length})` : ''}`,
          content: chunk.trim(),
          layout: 'content'
        })
      })
    } else {
      slides.push({
        title: 'Synopsis',
        content: synopsis,
        layout: 'content'
      })
    }
  }

  // Add Treatment Overview Slide
  if (projectData.synopsisTreatment?.treatment) {
    const treatment = projectData.synopsisTreatment.treatment
    // Take first 600 characters for overview
    const overview = treatment.substring(0, 600) + (treatment.length > 600 ? '...' : '')
    slides.push({
      title: 'Treatment Overview',
      content: overview,
      layout: 'content'
    })
  }

  // Add Characters Slide
  if (projectData.characters && projectData.characters.length > 0) {
    const characterBullets = projectData.characters.map((char: any) =>
      `${char.name} (${char.role || 'Character'}): ${char.description?.substring(0, 100) || 'No description'}...`
    )

    slides.push({
      title: 'Main Characters',
      bullets: characterBullets,
      layout: 'two-column'
    })
  }

  // Add Visual Assets Slides
  if (projectData.visualAssets && projectData.visualAssets.length > 0) {
    projectData.visualAssets.forEach((asset: any, index: number) => {
      if (asset.fileUrl) {
        slides.push({
          title: `Visual Asset ${index + 1}`,
          content: asset.caption || '',
          image: {
            path: asset.fileUrl,
            x: 1.5,
            y: 1.5,
            w: 7.0,
            h: 3.5
          },
          layout: 'image'
        })
      }
    })
  }

  // Add Market Comparables Slide
  if (projectData.comps && projectData.comps.length > 0) {
    const compBullets = projectData.comps.slice(0, 6).map((comp: any) =>
      `${comp.title} (${comp.genre || 'N/A'}): ${comp.justification?.substring(0, 80) || 'No justification'}...`
    )

    slides.push({
      title: 'Market Comparables',
      bullets: compBullets,
      layout: 'two-column'
    })
  }

  return await exporter.export({
    title: projectData.title || 'Untitled Project',
    author: projectData.user?.name || projectData.user?.email,
    slides,
    theme: 'professional'
  })
}
