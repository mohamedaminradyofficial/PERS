/**
 * Validator for Synopsis
 * Synopsis must reveal the ending - it's for producers/investors, not the audience
 */

interface SynopsisValidation {
  isValid: boolean
  warnings: string[]
  suggestions: string[]
  score: number
}

// Keywords that typically indicate an ending is being revealed
const endingKeywords = [
  // English
  'dies', 'death', 'killed', 'survives', 'escapes', 'wins', 'loses',
  'defeated', 'victory', 'triumph', 'sacrifice', 'saves', 'destroys',
  'reveals', 'discovers', 'learns', 'realizes', 'understands',
  'succeeds', 'fails', 'achieves', 'accomplishes', 'completes',
  'ending', 'conclusion', 'finally', 'ultimately', 'eventually',
  'in the end', 'at last', 'resolution',

  // Arabic
  'يموت', 'موت', 'قتل', 'ينجو', 'يهرب', 'يفوز', 'يخسر',
  'هزيمة', 'نصر', 'انتصار', 'تضحية', 'ينقذ', 'يدمر',
  'يكشف', 'يكتشف', 'يتعلم', 'يدرك', 'يفهم',
  'ينجح', 'يفشل', 'يحقق', 'ينجز', 'يكمل',
  'نهاية', 'خاتمة', 'أخيراً', 'في النهاية', 'في الأخير'
]

// Phrases that suggest the story is still open-ended (red flags)
const openEndedPhrases = [
  'will he', 'will she', 'will they', 'can he', 'can she', 'can they',
  'what happens', 'to be continued', 'journey begins', 'adventure starts',
  'هل سي', 'ماذا سيحدث', 'تبدأ الرحلة', 'تبدأ المغامرة'
]

export function validateSynopsis(synopsis: string): SynopsisValidation {
  const warnings: string[] = []
  const suggestions: string[] = []
  let score = 0

  if (!synopsis || synopsis.trim().length === 0) {
    return {
      isValid: false,
      warnings: ['الملخص فارغ / Synopsis is empty'],
      suggestions: ['اكتب ملخصاً كاملاً للقصة / Write a complete story synopsis'],
      score: 0
    }
  }

  const lowerSynopsis = synopsis.toLowerCase()
  const wordCount = synopsis.split(/\s+/).filter(w => w).length

  // Check minimum length
  if (wordCount < 100) {
    warnings.push('الملخص قصير جداً / Synopsis is too short (less than 100 words)')
    suggestions.push('الملخص يجب أن يكون شاملاً ويكشف القصة كاملة / Synopsis should be comprehensive and reveal the full story')
  } else {
    score += 20
  }

  // Check for ending keywords
  let hasEndingKeywords = false
  for (const keyword of endingKeywords) {
    if (lowerSynopsis.includes(keyword.toLowerCase())) {
      hasEndingKeywords = true
      break
    }
  }

  if (hasEndingKeywords) {
    score += 40
  } else {
    warnings.push('الملخص قد لا يكشف النهاية / Synopsis may not reveal the ending')
    suggestions.push('أضف معلومات واضحة عن نهاية القصة / Add clear information about the story ending')
  }

  // Check for open-ended phrases (negative indicator)
  let hasOpenEndedPhrases = false
  for (const phrase of openEndedPhrases) {
    if (lowerSynopsis.includes(phrase.toLowerCase())) {
      hasOpenEndedPhrases = true
      warnings.push(`تجنب العبارات المفتوحة مثل "${phrase}" / Avoid open-ended phrases like "${phrase}"`)
      score -= 10
      break
    }
  }

  // Check for question marks (may indicate open ending)
  const questionMarkCount = (synopsis.match(/\?/g) || []).length
  if (questionMarkCount > 2) {
    warnings.push('الملخص يحتوي على أسئلة كثيرة - يجب أن يجيب على الأسئلة لا أن يطرحها / Synopsis contains too many questions - it should answer questions, not raise them')
    score -= 10
  }

  // Check for conclusive language
  const conclusiveKeywords = ['finally', 'ultimately', 'in the end', 'أخيراً', 'في النهاية']
  let hasConclusiveLanguage = false
  for (const keyword of conclusiveKeywords) {
    if (lowerSynopsis.includes(keyword.toLowerCase())) {
      hasConclusiveLanguage = true
      score += 20
      break
    }
  }

  if (!hasConclusiveLanguage) {
    suggestions.push('استخدم لغة حاسمة تشير إلى النهاية / Use conclusive language that indicates the ending')
  }

  // Check for character fate
  const characterFateKeywords = ['dies', 'survives', 'lives', 'يموت', 'ينجو', 'يعيش']
  let mentionsCharacterFate = false
  for (const keyword of characterFateKeywords) {
    if (lowerSynopsis.includes(keyword.toLowerCase())) {
      mentionsCharacterFate = true
      score += 20
      break
    }
  }

  if (!mentionsCharacterFate) {
    suggestions.push('اذكر مصير الشخصيات الرئيسية / Mention the fate of main characters')
  }

  // Normalize score to 0-100
  score = Math.max(0, Math.min(100, score))

  const isValid = score >= 60 && warnings.length === 0

  return {
    isValid,
    warnings,
    suggestions,
    score
  }
}

export function getSynopsisGuidance(): string {
  return `
## Synopsis Guidelines / إرشادات الملخص

**Important:** A synopsis is NOT a teaser or a marketing description. It's a complete story summary for producers and investors.

**مهم:** الملخص ليس إعلاناً تشويقياً أو وصفاً تسويقياً. إنه ملخص كامل للقصة للمنتجين والمستثمرين.

### Must Include / يجب أن يتضمن:
1. **Complete story arc** - from beginning to end / **القوس القصصي الكامل** - من البداية إلى النهاية
2. **Character fates** - what happens to main characters / **مصير الشخصيات** - ماذا يحدث للشخصيات الرئيسية
3. **Ending revelation** - how the story concludes / **كشف النهاية** - كيف تنتهي القصة
4. **Key plot points** - major turning points / **نقاط الحبكة الرئيسية** - نقاط التحول الرئيسية

### Must Avoid / يجب تجنب:
1. **Cliffhangers** - no "what will happen?" / **التشويق المعلق** - لا "ماذا سيحدث؟"
2. **Questions** - answer them, don't ask them / **الأسئلة** - أجب عليها، لا تطرحها
3. **Vagueness** - be specific about the ending / **الغموض** - كن محدداً بشأن النهاية
4. **Teasing** - this is not for the audience / **التشويق** - هذا ليس للجمهور

### Example Good Ending / مثال على نهاية جيدة:
"Finally, Sarah confronts the killer and manages to overpower him, but at the cost of her partner's life. She survives but is forever changed by the experience."

"أخيراً، تواجه سارة القاتل وتتمكن من التغلب عليه، ولكن على حساب حياة شريكها. تنجو لكنها تتغير إلى الأبد بسبب التجربة."
  `.trim()
}
