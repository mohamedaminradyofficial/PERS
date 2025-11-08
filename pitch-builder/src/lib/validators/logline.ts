import { z } from 'zod'

export const loglineSchema = z.object({
  content: z.string().min(1, 'Logline is required'),
})

export interface LoglineValidationResult {
  isValid: boolean
  wordCount: number
  hasHero: boolean
  hasInciting: boolean
  hasGoal: boolean
  hasStakes: boolean
  hasObstacle: boolean
  errors: string[]
}

/**
 * Validates a logline according to industry best practices:
 * - 18-35 words in length
 * - Contains hero/protagonist
 * - Contains inciting incident
 * - Contains goal
 * - Contains stakes
 * - Contains obstacle/antagonist
 */
export function validateLogline(content: string): LoglineValidationResult {
  const words = content.trim().split(/\s+/)
  const wordCount = words.length
  const lowerContent = content.toLowerCase()

  const errors: string[] = []

  // Word count validation
  const validWordCount = wordCount >= 18 && wordCount <= 35
  if (!validWordCount) {
    errors.push(`Word count must be between 18-35 words. Current: ${wordCount}`)
  }

  // Hero/Protagonist detection
  const heroKeywords = ['protagonist', 'hero', 'woman', 'man', 'detective', 'scientist',
                        'doctor', 'lawyer', 'student', 'teacher', 'young', 'old']
  const hasHero = heroKeywords.some(keyword => lowerContent.includes(keyword)) ||
                  /\b(he|she|they)\b/.test(lowerContent)
  if (!hasHero) {
    errors.push('Missing clear protagonist/hero')
  }

  // Inciting incident detection
  const incitingKeywords = ['when', 'after', 'discovers', 'finds', 'learns', 'receives',
                           'witnesses', 'encounters', 'stumbles', 'forced']
  const hasInciting = incitingKeywords.some(keyword => lowerContent.includes(keyword))
  if (!hasInciting) {
    errors.push('Missing inciting incident (triggering event)')
  }

  // Goal detection
  const goalKeywords = ['must', 'has to', 'needs to', 'attempts to', 'tries to',
                       'sets out to', 'strives to', 'fights to', 'works to']
  const hasGoal = goalKeywords.some(keyword => lowerContent.includes(keyword))
  if (!hasGoal) {
    errors.push('Missing clear goal or objective')
  }

  // Stakes detection
  const stakesKeywords = ['or', 'otherwise', 'before', 'lose', 'save', 'prevent',
                         'risk', 'face', 'death', 'destruction', 'failure']
  const hasStakes = stakesKeywords.some(keyword => lowerContent.includes(keyword))
  if (!hasStakes) {
    errors.push('Missing stakes (what is at risk?)')
  }

  // Obstacle detection
  const obstacleKeywords = ['but', 'however', 'against', 'despite', 'while', 'though',
                           'enemy', 'antagonist', 'villain', 'obstacle', 'challenge']
  const hasObstacle = obstacleKeywords.some(keyword => lowerContent.includes(keyword))
  if (!hasObstacle) {
    errors.push('Missing obstacle or antagonist')
  }

  const isValid = validWordCount && hasHero && hasInciting && hasGoal &&
                  hasStakes && hasObstacle

  return {
    isValid,
    wordCount,
    hasHero,
    hasInciting,
    hasGoal,
    hasStakes,
    hasObstacle,
    errors
  }
}

export type LoglineInput = z.infer<typeof loglineSchema>
