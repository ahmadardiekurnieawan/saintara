import { Compass, Target, Lightbulb, Users, Map, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react'

/**
 * Maps a SAINTARA character type to a line icon + one-line essence.
 * Keeps the product iconography monochrome & consistent (no emoji).
 */
const MAP: Record<string, { icon: LucideIcon; essence: string }> = {
  'Pemimpin Visioner': { icon: Compass, essence: 'Mengarahkan & menyatukan' },
  'Analis Strategis': { icon: Target, essence: 'Mengurai kompleksitas' },
  'Kreator Inovatif': { icon: Lightbulb, essence: 'Menciptakan & menghubungkan' },
  'Penjaga Harmoni': { icon: Users, essence: 'Menjembatani & menenangkan' },
  'Penjelajah Bebas': { icon: Map, essence: 'Mencari & beradaptasi' },
  'Pelayan Setia': { icon: ShieldCheck, essence: 'Mengabdi & menjaga' },
}

export function characterIcon(type: string): LucideIcon {
  return MAP[type]?.icon ?? Sparkles
}

export function characterEssence(type: string): string {
  return MAP[type]?.essence ?? 'Profil unik'
}
