import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            Pitch Builder
          </h1>
          <nav className="flex gap-4">
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Create Professional TV & Film Pitches
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed" dir="rtl">
            أنشئ كتاب سلسلة تلفزيونية احترافي أو لوك-بوك سينمائي بمعايير الصناعة
          </p>
          <p className="text-xl text-slate-600 mb-12">
            Build industry-standard TV Series Bibles, Film Lookbooks, and Pitch Decks
            with professional templates and smart validation tools.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-slate-900 text-white rounded-lg text-lg font-semibold hover:bg-slate-800 transition"
            >
              Start Creating
            </Link>
            <Link
              href="/templates"
              className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-lg text-lg font-semibold hover:bg-slate-900 hover:text-white transition"
            >
              View Templates
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Smart Templates</h3>
              <p className="text-slate-600">
                Industry-standard templates for TV Series Bibles, Film Lookbooks, and Pitch Decks
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold mb-2">Intelligent Validation</h3>
              <p className="text-slate-600">
                Logline validator (18-35 words, 5 key elements), Synopsis checker, and more
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Visual Tools</h3>
              <p className="text-slate-600">
                Moodboard builder, character pages, and professional asset management
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
              <p className="text-slate-600">
                Comps (comparables), audience segmentation, and commercial viability tools
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">Production Planning</h3>
              <p className="text-slate-600">
                Budget breakdowns, financing plans, team management, and distribution strategy
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📤</div>
              <h3 className="text-xl font-semibold mb-2">Professional Export</h3>
              <p className="text-slate-600">
                Export to PDF, PPTX, or interactive HTML with automatic indexing
              </p>
            </div>
          </div>

          {/* Bilingual Support */}
          <div className="mt-20 p-8 bg-white rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Bilingual Support</h3>
            <div className="flex gap-8 justify-center items-center">
              <div>
                <p className="text-lg text-slate-600">English</p>
              </div>
              <div className="text-2xl">🌐</div>
              <div>
                <p className="text-lg text-slate-600" dir="rtl">العربية</p>
              </div>
            </div>
            <p className="text-slate-600 mt-4">
              Full RTL (Right-to-Left) support for Arabic content
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>Pitch Builder - Professional TV & Film Pitch Creation Tool</p>
        </div>
      </footer>
    </div>
  )
}
