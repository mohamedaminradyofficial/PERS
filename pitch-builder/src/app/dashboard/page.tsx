import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Pitch Builder
          </Link>
          <div className="flex gap-4 items-center">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/projects/new"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
            >
              New Project
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Your Projects
          </h1>
          <p className="text-slate-600">
            Create and manage your TV Series Bibles, Film Lookbooks, and Pitch Decks
          </p>
        </div>

        {/* Quick Create Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/dashboard/documents/new?type=SERIES_BIBLE"
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-slate-900"
          >
            <div className="text-5xl mb-4">📺</div>
            <h3 className="text-xl font-semibold mb-2">TV Series Bible</h3>
            <p className="text-slate-600 text-sm">
              Create a comprehensive series bible with characters, season arcs, and pilot breakdown
            </p>
          </Link>

          <Link
            href="/dashboard/documents/new?type=FILM_LOOKBOOK"
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-slate-900"
          >
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">Film Lookbook</h3>
            <p className="text-slate-600 text-sm">
              Build a visual-first pitch deck for your film with moodboards and style references
            </p>
          </Link>

          <Link
            href="/dashboard/documents/new?type=PITCH_DECK"
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-slate-900"
          >
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Pitch Deck</h3>
            <p className="text-slate-600 text-sm">
              Create a concise pitch deck with essential elements for quick pitching
            </p>
          </Link>
        </div>

        {/* Projects List Placeholder */}
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
          <p className="text-slate-600 mb-6">
            Get started by creating your first project above
          </p>
        </div>
      </main>
    </div>
  )
}
