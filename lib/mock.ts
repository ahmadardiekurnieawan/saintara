import { runAssessment, type AssessmentResult } from './algorithm'

export interface AssessmentSummary {
  id: string
  name: string
  characterType: string
  dominantIntelligence: string
  createdAt: string
}

const HISTORY_KEY = 'completed_assessments'
const SEED_KEY = 'saintara_seeded_v2'

const SAMPLE_INPUTS = [
  { name: 'Anindya Pratiwi', birthDate: '1994-03-12', bloodType: 'B' as const, daysAgo: 2 },
  { name: 'Raka Mahendra', birthDate: '1990-08-25', bloodType: 'O' as const, daysAgo: 9 },
]

function daysAgoISO(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

export function summaryFromResult(result: AssessmentResult, name: string, createdAt?: string): AssessmentSummary {
  return {
    id: result.id,
    name,
    characterType: result.characterType,
    dominantIntelligence: result.dominantIntelligence,
    createdAt: createdAt ?? new Date().toISOString(),
  }
}

export function getHistory(): AssessmentSummary[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(sessionStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}

export function getResult(id: string): AssessmentResult | null {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem(`result_${id}`)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveResult(result: AssessmentResult, name: string) {
  sessionStorage.setItem(`result_${result.id}`, JSON.stringify(result))
  const history = getHistory()
  history.unshift(summaryFromResult(result, name))
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 12)))
}

/**
 * Seeds a couple of realistic sample reports the first time the app loads,
 * so the dashboard & report experience are demoable with mock data.
 */
export function ensureSeed() {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem(SEED_KEY)) return

  const seeded: AssessmentSummary[] = []
  for (const input of SAMPLE_INPUTS) {
    const result = runAssessment({ name: input.name, birthDate: input.birthDate, bloodType: input.bloodType })
    sessionStorage.setItem(`result_${result.id}`, JSON.stringify(result))
    seeded.push(summaryFromResult(result, input.name, daysAgoISO(input.daysAgo)))
  }

  const existing = getHistory()
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify([...existing, ...seeded].slice(0, 12)))
  sessionStorage.setItem(SEED_KEY, '1')
}
