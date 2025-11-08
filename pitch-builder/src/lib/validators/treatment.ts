/**
 * Validator for Treatment
 * Treatment must be written in present tense
 */

interface TreatmentValidation {
  isValid: boolean
  warnings: string[]
  suggestions: string[]
  score: number
  tenseIssues: TenseIssue[]
}

interface TenseIssue {
  line: number
  text: string
  issue: string
}

// Past tense verb patterns (common English past tense verbs)
const pastTensePatterns = [
  /\b(walked|talked|said|went|came|took|made|gave|told|asked|looked|seemed|felt|thought|knew|saw|heard|found|left|brought|put|kept|held|wrote|stood|sat|ran|fell|got|became|began|ended|died|killed|saved|fought|won|lost|loved|hated|wanted|needed|tried|failed|succeeded)\b/gi,

  // Regular past tense (-ed endings)
  /\b(\w+ed)\b/g,

  // Past continuous (was/were + -ing)
  /\b(was|were)\s+\w+ing\b/gi
]

// Future tense patterns
const futureTensePatterns = [
  /\b(will|would|shall|going to)\s+\w+/gi,
  /\b(سوف|سي)\s+/gi  // Arabic future markers
]

// Present tense indicators (good signs)
const presentTensePatterns = [
  /\b(walks|talks|says|goes|comes|takes|makes|gives|tells|asks|looks|seems|feels|thinks|knows|sees|hears|finds|leaves|brings|puts|keeps|holds|writes|stands|sits|runs|falls|gets|becomes|begins|ends|dies|kills|saves|fights|wins|loses|loves|hates|wants|needs|tries|fails|succeeds)\b/gi,

  // Present continuous (is/are + -ing)
  /\b(is|are)\s+\w+ing\b/gi
]

export function validateTreatment(treatment: string): TreatmentValidation {
  const warnings: string[] = []
  const suggestions: string[] = []
  const tenseIssues: TenseIssue[] = []
  let score = 100

  if (!treatment || treatment.trim().length === 0) {
    return {
      isValid: false,
      warnings: ['ال Treatment فارغ / Treatment is empty'],
      suggestions: ['اكتب Treatment كامل بصيغة المضارع / Write a complete treatment in present tense'],
      score: 0,
      tenseIssues: []
    }
  }

  const lines = treatment.split('\n')
  const wordCount = treatment.split(/\s+/).filter(w => w).length

  // Check minimum length
  if (wordCount < 200) {
    warnings.push('ال Treatment قصير جداً / Treatment is too short (less than 200 words)')
    suggestions.push('ال Treatment يجب أن يكون مفصلاً / Treatment should be detailed')
    score -= 10
  }

  // Count tense occurrences
  let pastTenseCount = 0
  let futureTenseCount = 0
  let presentTenseCount = 0

  lines.forEach((line, index) => {
    const lineNumber = index + 1
    const trimmedLine = line.trim()

    if (trimmedLine.length === 0) return

    // Check for past tense
    pastTensePatterns.forEach(pattern => {
      const matches = trimmedLine.match(pattern)
      if (matches) {
        pastTenseCount += matches.length

        // Record first few issues
        if (tenseIssues.length < 5) {
          tenseIssues.push({
            line: lineNumber,
            text: trimmedLine.substring(0, 100) + (trimmedLine.length > 100 ? '...' : ''),
            issue: `استخدام الماضي: ${matches[0]} / Past tense usage: ${matches[0]}`
          })
        }
      }
    })

    // Check for future tense
    futureTensePatterns.forEach(pattern => {
      const matches = trimmedLine.match(pattern)
      if (matches) {
        futureTenseCount += matches.length

        if (tenseIssues.length < 5) {
          tenseIssues.push({
            line: lineNumber,
            text: trimmedLine.substring(0, 100) + (trimmedLine.length > 100 ? '...' : ''),
            issue: `استخدام المستقبل: ${matches[0]} / Future tense usage: ${matches[0]}`
          })
        }
      }
    })

    // Check for present tense (positive indicator)
    presentTensePatterns.forEach(pattern => {
      const matches = trimmedLine.match(pattern)
      if (matches) {
        presentTenseCount += matches.length
      }
    })
  })

  // Calculate tense percentages
  const totalTenseIndicators = pastTenseCount + futureTenseCount + presentTenseCount

  if (totalTenseIndicators > 0) {
    const presentTensePercentage = (presentTenseCount / totalTenseIndicators) * 100
    const pastTensePercentage = (pastTenseCount / totalTenseIndicators) * 100
    const futureTensePercentage = (futureTenseCount / totalTenseIndicators) * 100

    // Present tense should dominate
    if (presentTensePercentage < 60) {
      warnings.push(`استخدام المضارع منخفض: ${presentTensePercentage.toFixed(1)}% / Low present tense usage: ${presentTensePercentage.toFixed(1)}%`)
      score -= 30
    }

    // Past tense should be minimal
    if (pastTensePercentage > 20) {
      warnings.push(`استخدام الماضي عالٍ: ${pastTensePercentage.toFixed(1)}% / High past tense usage: ${pastTensePercentage.toFixed(1)}%`)
      score -= 20
    }

    // Future tense should be minimal
    if (futureTensePercentage > 10) {
      warnings.push(`استخدام المستقبل عالٍ: ${futureTensePercentage.toFixed(1)}% / High future tense usage: ${futureTensePercentage.toFixed(1)}%`)
      score -= 10
    }
  }

  // Provide suggestions
  if (pastTenseCount > 0) {
    suggestions.push('حول الأفعال من الماضي إلى المضارع / Convert past tense verbs to present tense')
    suggestions.push('مثال: "walked" → "walks", "said" → "says"')
  }

  if (futureTenseCount > 0) {
    suggestions.push('حول الأفعال من المستقبل إلى المضارع / Convert future tense to present tense')
    suggestions.push('مثال: "will walk" → "walks", "going to say" → "says"')
  }

  if (presentTenseCount === 0 && totalTenseIndicators > 0) {
    warnings.push('لم يتم اكتشاف أي استخدام للمضارع / No present tense detected')
    suggestions.push('ال Treatment يجب أن يكون بالكامل بصيغة المضارع / Treatment must be entirely in present tense')
  }

  // Normalize score
  score = Math.max(0, Math.min(100, score))

  const isValid = score >= 70 && pastTenseCount < 5 && futureTenseCount < 3

  return {
    isValid,
    warnings,
    suggestions,
    score,
    tenseIssues
  }
}

export function getTreatmentGuidance(): string {
  return `
## Treatment Guidelines / إرشادات ال Treatment

**Critical Rule:** Treatment must be written entirely in **PRESENT TENSE**.

**قاعدة مهمة:** يجب كتابة ال Treatment بالكامل بصيغة **المضارع**.

### Why Present Tense? / لماذا المضارع؟
- Creates immediacy and draws the reader in / يخلق شعوراً بالحضور ويجذب القارئ
- Industry standard for treatments / المعيار الصناعي لل treatments
- Makes the story feel alive and happening now / يجعل القصة تبدو حية وتحدث الآن

### Examples / أمثلة:

**❌ Wrong (Past Tense):**
"Sarah walked into the room. She saw the killer and ran away."

**✓ Correct (Present Tense):**
"Sarah walks into the room. She sees the killer and runs away."

**❌ Wrong (Future Tense):**
"Sarah will walk into the room. She will see the killer."

**✓ Correct (Present Tense):**
"Sarah walks into the room. She sees the killer."

### Common Conversions / التحويلات الشائعة:
- walked → walks / مشى → يمشي
- said → says / قال → يقول
- was → is / كان → هو/هي
- ran → runs / ركض → يركض
- will go → goes / سيذهب → يذهب

### Tips / نصائح:
1. Read your treatment aloud / اقرأ ال treatment بصوت عالٍ
2. Check every verb / راجع كل فعل
3. Use find/replace for common past tense verbs / استخدم البحث والاستبدال للأفعال الماضية الشائعة
4. Have someone else review for tense consistency / اطلب من شخص آخر مراجعة اتساق الزمن
  `.trim()
}
