'use client'

import { useState, useEffect } from 'react'
import {
  validateSynopsisTreatment,
  type SynopsisTreatmentValidationResult
} from '@/lib/validators/synopsis-treatment'

interface SynopsisTreatmentEditorProps {
  documentId: string
  initialSynopsis?: string
  initialTreatment?: string
  onSave?: (synopsis: string, treatment: string) => void
}

export default function SynopsisTreatmentEditor({
  documentId,
  initialSynopsis = '',
  initialTreatment = '',
  onSave
}: SynopsisTreatmentEditorProps) {
  const [synopsis, setSynopsis] = useState(initialSynopsis)
  const [treatment, setTreatment] = useState(initialTreatment)
  const [validation, setValidation] = useState<SynopsisTreatmentValidationResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // Auto-validate on change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (synopsis || treatment) {
        const result = validateSynopsisTreatment(synopsis, treatment)
        setValidation(result)
      }
    }, 1000) // Validate 1 second after user stops typing

    return () => clearTimeout(timer)
  }, [synopsis, treatment])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      const response = await fetch('/api/synopsistreatment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId,
          synopsis,
          treatment,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save')
      }

      const data = await response.json()
      setValidation(data.validation)
      setSaveMessage('✓ Saved successfully')

      if (onSave) {
        onSave(synopsis, treatment)
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Save error:', error)
      setSaveMessage('✗ Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Synopsis Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Synopsis</h3>
          {validation?.synopsis && (
            <div className="flex items-center gap-2">
              {validation.synopsis.isValid ? (
                <span className="text-sm text-green-600">✓ Valid</span>
              ) : (
                <span className="text-sm text-red-600">⚠ Needs attention</span>
              )}
              <span className="text-sm text-slate-500">
                {validation.synopsis.wordCount} words
              </span>
            </div>
          )}
        </div>

        <textarea
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          placeholder="Write a comprehensive synopsis that reveals the ending..."
          className="w-full min-h-[200px] p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        />

        {/* Synopsis Validation Alerts */}
        {validation?.synopsis && validation.synopsis.errors.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-amber-800">Synopsis Issues:</h4>
                <ul className="mt-2 text-sm text-amber-700 list-disc list-inside space-y-1">
                  {validation.synopsis.errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Synopsis Success Indicators */}
        {validation?.synopsis && validation.synopsis.errors.length === 0 && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-green-800">Synopsis looks great!</h4>
                <ul className="mt-2 text-sm text-green-700 space-y-1">
                  {validation.synopsis.revealsEnding && <li>✓ Reveals the ending</li>}
                  {validation.synopsis.hasResolution && <li>✓ Shows conflict resolution</li>}
                  {validation.synopsis.hasFinalState && <li>✓ Describes final character state</li>}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Treatment Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Treatment</h3>
          {validation?.treatment && (
            <div className="flex items-center gap-2">
              {validation.treatment.isValid ? (
                <span className="text-sm text-green-600">✓ Valid</span>
              ) : (
                <span className="text-sm text-red-600">⚠ Needs attention</span>
              )}
              <span className="text-sm text-slate-500">
                {validation.treatment.wordCount} words
              </span>
            </div>
          )}
        </div>

        <textarea
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          placeholder="Write a detailed scene-by-scene treatment in present tense..."
          className="w-full min-h-[400px] p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        />

        {/* Treatment Validation Alerts */}
        {validation?.treatment && validation.treatment.errors.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-amber-800">Treatment Issues:</h4>
                <ul className="mt-2 text-sm text-amber-700 list-disc list-inside space-y-1">
                  {validation.treatment.errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                {validation.treatment.presentTenseCount > 0 && validation.treatment.pastTenseCount > 0 && (
                  <div className="mt-2 text-sm text-amber-700">
                    <strong>Tense Analysis:</strong> {validation.treatment.presentTenseCount} present tense verbs, {validation.treatment.pastTenseCount} past tense verbs
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Treatment Success Indicators */}
        {validation?.treatment && validation.treatment.errors.length === 0 && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-green-800">Treatment looks great!</h4>
                <ul className="mt-2 text-sm text-green-700 space-y-1">
                  {validation.treatment.isPresentTense && <li>✓ Written in present tense</li>}
                  <li>✓ {validation.treatment.presentTenseCount} present tense verbs detected</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button and Status */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div>
          {saveMessage && (
            <span className={`text-sm ${saveMessage.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
              {saveMessage}
            </span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Overall Validation Status */}
      {validation && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="font-medium">Overall Status:</span>
            {validation.overallValid ? (
              <span className="text-green-600">✓ Both synopsis and treatment are valid</span>
            ) : (
              <span className="text-amber-600">⚠ Please address the issues above</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
