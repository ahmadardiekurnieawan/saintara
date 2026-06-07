import { NextRequest, NextResponse } from 'next/server'
import { runAssessment } from '@/lib/algorithm'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, birthDate, bloodType } = body
    if (!name || !birthDate || !bloodType) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    const result = runAssessment({ name, birthDate, bloodType })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
