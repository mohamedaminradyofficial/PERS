# Pitch Builder

A professional web application for creating TV Series Bibles, Film Lookbooks, and Pitch Decks according to industry standards.

## Overview

Pitch Builder is a comprehensive tool designed for producers, writers, and content creators to build professional pitch materials for television and film projects. The application provides industry-standard templates, intelligent validation tools, and professional export capabilities.

### Key Features

- **Smart Templates**: Industry-standard templates for TV Series Bibles, Film Lookbooks, and Pitch Decks
- **Intelligent Validation**:
  - Logline validator (18-35 words, 5 key elements: hero, inciting incident, goal, stakes, obstacle)
  - Synopsis checker (must reveal ending)
  - Treatment validator (present tense requirement)
- **Visual Tools**: Moodboard builder, character pages, professional asset management
- **Market Analysis**: Comps (comparables), audience segmentation, commercial viability tools
- **Production Planning**: Budget breakdowns, financing plans, team management, distribution strategy
- **Professional Export**: Export to PDF, PPTX, or interactive HTML with automatic indexing
- **Bilingual Support**: Full Arabic and English support with RTL (Right-to-Left) capability

## Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **next-intl** for internationalization

### Backend
- **Node.js**
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**

### Authentication
- **NextAuth.js**
- **Prisma Adapter**
- **Credentials Provider**

## Data Model

The application includes 20 core entities:

1. **User** - User accounts and authentication
2. **Organization** - Team/company management
3. **Project** - Top-level project container
4. **Document** - Series Bible, Film Lookbook, or Pitch Deck
5. **Character** - Character descriptions and arcs
6. **Season** - TV season planning
7. **Episode** - Episode outlines
8. **PilotBreakdown** - Detailed pilot scene breakdown
9. **Logline** - Validated logline with structural elements
10. **SynopsisTreatment** - Synopsis and treatment sections
11. **Comp** - Market comparables
12. **AudienceSegment** - Target audience analysis
13. **MarketInsight** - Market research data
14. **VisualAsset** - Images, videos, documents
15. **Moodboard** - Visual reference boards
16. **BudgetLine** - Budget breakdown items
17. **FinancePlan** - Financing sources and strategy
18. **TeamMember** - Production team information
19. **Comment** - Collaboration and feedback
20. **ExportJob** - Export task management

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pitch-builder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/pitch_builder"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
pitch-builder/
├── prisma/
│   └── schema.prisma          # Database schema (20 entities)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── projects/      # Project CRUD
│   │   │   ├── documents/     # Document management
│   │   │   └── logline/       # Logline validation
│   │   ├── page.tsx           # Landing page
│   │   └── layout.tsx         # Root layout
│   └── lib/
│       ├── auth.ts            # NextAuth configuration
│       ├── prisma.ts          # Prisma client
│       └── validators/
│           └── logline.ts     # Logline validation logic
├── public/                    # Static assets
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Validation
- `POST /api/logline/validate` - Validate logline structure

## Validation Rules

### Logline Validation
A valid logline must:
- Be 18-35 words in length
- Contain a clear hero/protagonist
- Include an inciting incident (triggering event)
- Define a clear goal/objective
- Establish stakes (what's at risk)
- Present an obstacle/antagonist

### Synopsis Requirements
- Must reveal the ending
- Comprehensive story overview
- Written for quick review

### Treatment Requirements
- Must be written in present tense
- Detailed scene-by-scene narrative
- Conveys tone and themes

### Comps Requirements
- Minimum 2-3 comparable titles
- Must include genre, audience, budget
- Requires explicit commercial/narrative justification

### Lookbook Guidelines
- Each section: 300-500 words max
- Visual-first approach
- At least one image/moodboard per section

### TV Bible Requirements
- Must include Pilot Breakdown
- Season arc summary
- Episode outlines

## Development Phases

Following the production cycle methodology:

1. **assemble**: Project setup, data models, basic editing pages
2. **grade**: Quality rules (Logline/Synopsis), visual style, templates
3. **mix**: Integration of Comps, audience/market, budget/finance
4. **render**: PDF/PPTX export engine, asset synchronization
5. **export**: Version control, signed links, export logs, metrics

## Bilingual Support

The application supports both English and Arabic with:
- Full RTL (Right-to-Left) layout support
- Translated UI elements
- Content creation in both languages
- Locale-aware formatting

## Export Formats

- **PDF**: Print-ready with 300dpi images, automatic TOC, numbered sections
- **PPTX**: Slide deck with sections mapped to slides
- **HTML**: Interactive version with clickable links and navigation

## Contributing

This project follows industry best practices for TV and film pitch materials as outlined in the TODO.md specifications.

## License

[Your License Here]

## Acknowledgments

Based on industry-standard requirements for:
- TV Series Bible creation
- Film Lookbook development
- Professional pitch deck preparation
