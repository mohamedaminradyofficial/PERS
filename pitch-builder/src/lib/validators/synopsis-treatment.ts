import { z } from 'zod'

export const synopsisTreatmentSchema = z.object({
  synopsis: z.string().optional(),
  treatment: z.string().optional(),
})

export interface SynopsisValidationResult {
  isValid: boolean
  revealsEnding: boolean
  hasResolution: boolean
  hasFinalState: boolean
  wordCount: number
  errors: string[]
}

export interface TreatmentValidationResult {
  isValid: boolean
  isPresentTense: boolean
  pastTenseCount: number
  presentTenseCount: number
  wordCount: number
  errors: string[]
}

export interface SynopsisTreatmentValidationResult {
  synopsis: SynopsisValidationResult
  treatment: TreatmentValidationResult
  overallValid: boolean
}

/**
 * Validates a synopsis to ensure it reveals the ending
 * A good synopsis should:
 * - Reveal how the story ends
 * - Include resolution keywords
 * - Describe the final state of characters/situation
 * - Be comprehensive (minimum 100 words)
 */
export function validateSynopsis(content: string | null | undefined): SynopsisValidationResult {
  if (!content || content.trim().length === 0) {
    return {
      isValid: false,
      revealsEnding: false,
      hasResolution: false,
      hasFinalState: false,
      wordCount: 0,
      errors: ['Synopsis is required']
    }
  }

  const words = content.trim().split(/\s+/)
  const wordCount = words.length
  const lowerContent = content.toLowerCase()
  const errors: string[] = []

  // Word count validation (minimum 100 words for comprehensive synopsis)
  const validWordCount = wordCount >= 100
  if (!validWordCount) {
    errors.push(`Synopsis should be at least 100 words for proper detail. Current: ${wordCount}`)
  }

  // Ending/Resolution keywords - indicates story conclusion is revealed
  const endingKeywords = [
    'finally', 'ultimately', 'in the end', 'at last', 'eventually',
    'concludes', 'ends', 'finale', 'conclusion', 'resolution'
  ]
  const revealsEnding = endingKeywords.some(keyword => lowerContent.includes(keyword))
  if (!revealsEnding) {
    errors.push('Synopsis should reveal the ending (use words like: finally, ultimately, in the end, concludes, etc.)')
  }

  // Resolution indicators - shows conflicts are resolved
  const resolutionKeywords = [
    'defeats', 'overcomes', 'succeeds', 'fails', 'dies', 'survives',
    'wins', 'loses', 'achieves', 'realizes', 'discovers the truth',
    'learns that', 'reconciles', 'reunites', 'sacrifices'
  ]
  const hasResolution = resolutionKeywords.some(keyword => lowerContent.includes(keyword))
  if (!hasResolution) {
    errors.push('Synopsis should show how conflicts are resolved (defeats, overcomes, succeeds, fails, etc.)')
  }

  // Final state indicators - describes outcome for characters
  const finalStateKeywords = [
    'becomes', 'transforms into', 'remains', 'is left with', 'finds peace',
    'returns to', 'escapes', 'is trapped', 'freedom', 'imprisoned',
    'happy ending', 'tragic ending', 'bittersweet', 'new life', 'changed forever'
  ]
  const hasFinalState = finalStateKeywords.some(keyword => lowerContent.includes(keyword))
  if (!hasFinalState) {
    errors.push('Synopsis should describe the final state of main characters (becomes, remains, finds peace, etc.)')
  }

  const isValid = validWordCount && revealsEnding && hasResolution && hasFinalState

  return {
    isValid,
    revealsEnding,
    hasResolution,
    hasFinalState,
    wordCount,
    errors
  }
}

/**
 * Validates a treatment to ensure it's written in present tense
 * A good treatment should:
 * - Be written in present tense (industry standard)
 * - Avoid past tense verbs
 * - Be scene-by-scene breakdown
 * - Be comprehensive (minimum 500 words)
 */
export function validateTreatment(content: string | null | undefined): TreatmentValidationResult {
  if (!content || content.trim().length === 0) {
    return {
      isValid: false,
      isPresentTense: false,
      pastTenseCount: 0,
      presentTenseCount: 0,
      wordCount: 0,
      errors: ['Treatment is required']
    }
  }

  const words = content.trim().split(/\s+/)
  const wordCount = words.length
  const errors: string[] = []

  // Word count validation (minimum 500 words for detailed treatment)
  const validWordCount = wordCount >= 500
  if (!validWordCount) {
    errors.push(`Treatment should be at least 500 words for scene-by-scene detail. Current: ${wordCount}`)
  }

  // Tense detection using common verb patterns
  // Present tense verbs (3rd person singular mostly ends in -s)
  const presentTensePatterns = [
    /\b(opens|closes|enters|exits|walks|runs|talks|speaks|says|tells|asks)\b/gi,
    /\b(looks|sees|watches|hears|listens|feels|thinks|knows|believes)\b/gi,
    /\b(arrives|leaves|comes|goes|takes|gives|gets|puts|holds)\b/gi,
    /\b(fights|wins|loses|dies|lives|kills|saves|helps|hurts)\b/gi,
    /\b(discovers|reveals|shows|hides|finds|searches|investigates)\b/gi,
    /\b(is|are|has|have|does|do)\b/gi
  ]

  // Past tense verbs (commonly end in -ed or irregular forms)
  const pastTensePatterns = [
    /\b(opened|closed|entered|exited|walked|ran|talked|spoke|said|told|asked)\b/gi,
    /\b(looked|saw|watched|heard|listened|felt|thought|knew|believed)\b/gi,
    /\b(arrived|left|came|went|took|gave|got|put|held)\b/gi,
    /\b(fought|won|lost|died|lived|killed|saved|helped|hurt)\b/gi,
    /\b(discovered|revealed|showed|hid|found|searched|investigated)\b/gi,
    /\b(was|were|had)\b/gi
  ]

  let presentTenseCount = 0
  let pastTenseCount = 0

  // Count present tense verbs
  presentTensePatterns.forEach(pattern => {
    const matches = content.match(pattern)
    if (matches) {
      presentTenseCount += matches.length
    }
  })

  // Count past tense verbs
  pastTensePatterns.forEach(pattern => {
    const matches = content.match(pattern)
    if (matches) {
      pastTenseCount += matches.length
    }
  })

  // Treatment should have significantly more present tense than past tense
  // Allow some past tense for flashbacks/backstory, but ratio should be 3:1 or better
  const isPresentTense = presentTenseCount > 0 &&
                         (pastTenseCount === 0 || presentTenseCount / pastTenseCount >= 3)

  if (!isPresentTense) {
    if (presentTenseCount === 0) {
      errors.push('Treatment must be written in present tense (e.g., "John enters the room" not "John entered the room")')
    } else if (pastTenseCount > presentTenseCount) {
      errors.push(`Treatment has more past tense (${pastTenseCount}) than present tense (${presentTenseCount}). Use present tense.`)
    } else if (presentTenseCount / pastTenseCount < 3) {
      errors.push(`Treatment should use predominantly present tense. Ratio: ${presentTenseCount} present vs ${pastTenseCount} past.`)
    }
  }

  const isValid = validWordCount && isPresentTense

  return {
    isValid,
    isPresentTense,
    pastTenseCount,
    presentTenseCount,
    wordCount,
    errors
  }
}

/**
 * Validates both synopsis and treatment together
 */
export function validateSynopsisTreatment(
  synopsis: string | null | undefined,
  treatment: string | null | undefined
): SynopsisTreatmentValidationResult {
  const synopsisResult = validateSynopsis(synopsis)
  const treatmentResult = validateTreatment(treatment)

  return {
    synopsis: synopsisResult,
    treatment: treatmentResult,
    overallValid: synopsisResult.isValid && treatmentResult.isValid
  }
}

export type SynopsisTreatmentInput = z.infer<typeof synopsisTreatmentSchema>
