'use client'

import { useState } from 'react'

interface ExportDialogProps {
  projectId: string
  projectTitle: string
  isOpen: boolean
  onClose: () => void
}

export default function ExportDialog({
  projectId,
  projectTitle,
  isOpen,
  onClose
}: ExportDialogProps) {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'pptx'>('pdf')
  const [isExporting, setIsExporting] = useState(false)
  const [exportStatus, setExportStatus] = useState<{
    type: 'success' | 'error' | 'info'
    message: string
  } | null>(null)

  if (!isOpen) return null

  const handleExport = async () => {
    setIsExporting(true)
    setExportStatus({ type: 'info', message: 'Generating export...' })

    try {
      const endpoint = exportFormat === 'pdf' ? '/api/export/pdf' : '/api/export/pptx'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      })

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`)
      }

      // Get the blob from response
      const blob = await response.blob()

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${projectTitle}.${exportFormat}`
      document.body.appendChild(a)
      a.click()

      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setExportStatus({
        type: 'success',
        message: `Successfully exported as ${exportFormat.toUpperCase()}`
      })

      // Close dialog after 2 seconds
      setTimeout(() => {
        onClose()
        setExportStatus(null)
      }, 2000)

    } catch (error) {
      console.error('Export error:', error)
      setExportStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to export'
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Export Project</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            disabled={isExporting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Info */}
          <div>
            <p className="text-sm text-slate-600">Exporting:</p>
            <p className="text-lg font-medium text-slate-900">{projectTitle}</p>
          </div>

          {/* Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">
              Select Export Format:
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* PDF Option */}
              <button
                onClick={() => setExportFormat('pdf')}
                disabled={isExporting}
                className={`p-4 border-2 rounded-lg transition-all ${
                  exportFormat === 'pdf'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                } ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-slate-900">PDF</span>
                  <span className="text-xs text-slate-500">Print-ready document</span>
                </div>
              </button>

              {/* PPTX Option */}
              <button
                onClick={() => setExportFormat('pptx')}
                disabled={isExporting}
                className={`p-4 border-2 rounded-lg transition-all ${
                  exportFormat === 'pptx'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                } ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-slate-900">PPTX</span>
                  <span className="text-xs text-slate-500">PowerPoint deck</span>
                </div>
              </button>
            </div>
          </div>

          {/* Export Features */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-900 mb-2">
              {exportFormat === 'pdf' ? 'PDF Features:' : 'PPTX Features:'}
            </h3>
            <ul className="text-sm text-slate-600 space-y-1">
              {exportFormat === 'pdf' ? (
                <>
                  <li>✓ Automatic table of contents</li>
                  <li>✓ 300 DPI images for print quality</li>
                  <li>✓ Professional formatting</li>
                  <li>✓ Page numbering</li>
                </>
              ) : (
                <>
                  <li>✓ Professional slide design</li>
                  <li>✓ Visual assets included</li>
                  <li>✓ Customizable themes</li>
                  <li>✓ Ready for presentation</li>
                </>
              )}
            </ul>
          </div>

          {/* Status Message */}
          {exportStatus && (
            <div
              className={`p-4 rounded-lg ${
                exportStatus.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : exportStatus.type === 'error'
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  exportStatus.type === 'success'
                    ? 'text-green-800'
                    : exportStatus.type === 'error'
                    ? 'text-red-800'
                    : 'text-blue-800'
                }`}
              >
                {exportStatus.message}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 text-slate-700 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export {exportFormat.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
