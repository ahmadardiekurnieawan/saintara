export interface AssessmentInput {
  name: string
  birthDate: string
  bloodType: 'A' | 'B' | 'AB' | 'O'
}

export interface IntelligenceScores {
  linguistik: number
  logisMatematik: number
  spasial: number
  kinestetik: number
  musikal: number
  interpersonal: number
}

export interface AssessmentResult {
  id: string
  characterType: string
  characterDescription: string
  intelligenceScores: IntelligenceScores
  dominantIntelligence: string
  strengths: string[]
  weaknesses: string[]
  careerPaths: CareerPath[]
  relationshipStyle: string
  dailyChallenges: DailyChallenge[]
  profileColor: string
  profileEmoji: string
}

export interface CareerPath {
  title: string
  description: string
  match: number
}

export interface DailyChallenge {
  day: string
  title: string
  description: string
  locked: boolean
}

const CHARACTER_TYPES = [
  { type: 'Pemimpin Visioner', description: 'Kamu adalah seseorang dengan visi jauh ke depan dan kemampuan luar biasa untuk menginspirasi orang lain. Naluri kepemimpinanmu kuat, dan kamu selalu melihat gambaran besar di balik setiap situasi.', emoji: '🦅', color: '#0F172A' },
  { type: 'Analis Strategis', description: 'Pikiranmu tajam seperti pedang — kamu memproses informasi kompleks dengan cepat dan mengubahnya menjadi strategi yang konkret. Kamu adalah pemecah masalah sejati yang tidak pernah berhenti di permukaan.', emoji: '🔭', color: '#2563EB' },
  { type: 'Kreator Inovatif', description: 'Kreativitas mengalir dalam dirimu seperti sungai yang tak pernah kering. Kamu melihat koneksi yang orang lain lewatkan, dan mengubah ide abstrak menjadi karya nyata yang menginspirasi.', emoji: '✨', color: '#C59830' },
  { type: 'Penjaga Harmoni', description: 'Kehadiranmu membawa ketenangan dalam setiap ruangan. Kamu memiliki kemampuan alami untuk menjembatani perbedaan dan menciptakan lingkungan di mana semua orang merasa dihargai.', emoji: '🌿', color: '#059669' },
  { type: 'Penjelajah Bebas', description: 'Jiwa petualangmu selalu mencari pengalaman baru dan perspektif segar. Kamu tidak terikat oleh konvensi dan selalu menemukan cara-cara inovatif untuk menjalani hidup.', emoji: '🌊', color: '#0891B2' },
  { type: 'Pelayan Setia', description: 'Dedikasi dan loyalitasmu adalah kekuatan terbesar. Kamu memberikan yang terbaik dalam setiap peran yang kamu emban, dan orang-orang di sekitarmu selalu bisa mengandalkanmu.', emoji: '🏛️', color: '#7C3AED' },
]

const BLOOD_TYPE_COEFFICIENTS: Record<string, number> = { A: 1, B: 2, AB: 3, O: 4 }

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

function seededRandom(seed: number): () => number {
  let s = seed
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val))
}

export function runAssessment(input: AssessmentInput): AssessmentResult {
  const nameLower = input.name.toLowerCase().trim()
  const birth = new Date(input.birthDate)
  const year = birth.getFullYear()
  const month = birth.getMonth() + 1
  const day = birth.getDate()
  const bloodCoeff = BLOOD_TYPE_COEFFICIENTS[input.bloodType]

  const nameSeed = hashString(nameLower)
  const dateSeed = year * 10000 + month * 100 + day
  const masterSeed = nameSeed + dateSeed * bloodCoeff

  const rand = seededRandom(masterSeed)
  const charIndex = Math.floor(rand() * CHARACTER_TYPES.length)
  const character = CHARACTER_TYPES[charIndex]

  const baseScores = {
    linguistik: clamp(Math.floor(rand() * 60 + 35), 40, 95),
    logisMatematik: clamp(Math.floor(rand() * 60 + 35), 40, 95),
    spasial: clamp(Math.floor(rand() * 60 + 35), 40, 95),
    kinestetik: clamp(Math.floor(rand() * 60 + 35), 40, 95),
    musikal: clamp(Math.floor(rand() * 60 + 35), 40, 95),
    interpersonal: clamp(Math.floor(rand() * 60 + 35), 40, 95),
  }

  if (charIndex === 0) baseScores.interpersonal = clamp(baseScores.interpersonal + 15, 60, 98)
  if (charIndex === 1) baseScores.logisMatematik = clamp(baseScores.logisMatematik + 15, 60, 98)
  if (charIndex === 2) baseScores.spasial = clamp(baseScores.spasial + 15, 60, 98)
  if (charIndex === 3) baseScores.interpersonal = clamp(baseScores.interpersonal + 10, 60, 98)
  if (charIndex === 4) baseScores.kinestetik = clamp(baseScores.kinestetik + 15, 60, 98)
  if (charIndex === 5) baseScores.linguistik = clamp(baseScores.linguistik + 15, 60, 98)

  const scoreEntries = Object.entries(baseScores) as [keyof IntelligenceScores, number][]
  const dominant = scoreEntries.reduce((a, b) => (b[1] > a[1] ? b : a))
  const dominantMap: Record<string, string> = {
    linguistik: 'Linguistik', logisMatematik: 'Logis-Matematis', spasial: 'Spasial',
    kinestetik: 'Kinestetik', musikal: 'Musikal', interpersonal: 'Interpersonal',
  }

  const allStrengths = [
    'Kemampuan komunikasi yang luar biasa', 'Pemikiran analitis yang tajam', 'Kreativitas tanpa batas',
    'Empati dan kepekaan sosial tinggi', 'Kemampuan memimpin secara alami', 'Adaptif terhadap perubahan',
    'Etos kerja yang sangat tinggi', 'Kemampuan problem-solving kreatif', 'Loyalitas dan komitmen kuat', 'Visi jangka panjang yang jelas',
  ]
  const allWeaknesses = [
    'Terkadang terlalu perfeksionis', 'Sulit mendelegasikan tugas', 'Bisa terlalu idealistis',
    'Mudah lelah secara emosional', 'Sulit menerima kritik', 'Cenderung overthinking',
    'Kurang fleksibel dalam beberapa situasi', 'Terlalu kritis terhadap diri sendiri',
  ]

  const strengthIndices: number[] = []
  while (strengthIndices.length < 4) {
    const idx = Math.floor(rand() * allStrengths.length)
    if (!strengthIndices.includes(idx)) strengthIndices.push(idx)
  }
  const weaknessIndices: number[] = []
  while (weaknessIndices.length < 3) {
    const idx = Math.floor(rand() * allWeaknesses.length)
    if (!weaknessIndices.includes(idx)) weaknessIndices.push(idx)
  }

  const careerOptions = [
    [{ title: 'CEO / Direktur Eksekutif', description: 'Memimpin organisasi besar dengan visi strategis', match: 94 }, { title: 'Konsultan Manajemen', description: 'Membantu perusahaan mencapai potensi terbaik mereka', match: 88 }, { title: 'Entrepreneur', description: 'Membangun bisnis dari nol dengan impak besar', match: 85 }],
    [{ title: 'Data Scientist', description: 'Menganalisis data untuk menghasilkan insight berharga', match: 96 }, { title: 'Software Engineer', description: 'Membangun sistem teknologi yang skalabel', match: 91 }, { title: 'Research Analyst', description: 'Meneliti dan menyajikan temuan kompleks secara jelas', match: 87 }],
    [{ title: 'Creative Director', description: 'Mengarahkan visi kreatif tim dan proyek besar', match: 95 }, { title: 'UX/UI Designer', description: 'Merancang pengalaman digital yang intuitif', match: 89 }, { title: 'Arsitek', description: 'Merancang ruang yang fungsional dan estetis', match: 84 }],
    [{ title: 'HR Director', description: 'Membangun budaya organisasi yang positif', match: 93 }, { title: 'Psikolog', description: 'Membantu individu mencapai kesejahteraan mental', match: 90 }, { title: 'Mediator', description: 'Menyelesaikan konflik dengan solusi win-win', match: 86 }],
    [{ title: 'Jurnalis / Reporter', description: 'Meliput dan menyebarkan informasi penting', match: 92 }, { title: 'Travel Content Creator', description: 'Menginspirasi orang lain melalui konten perjalanan', match: 88 }, { title: 'Event Organizer', description: 'Merancang pengalaman yang tak terlupakan', match: 85 }],
    [{ title: 'Manajer Proyek', description: 'Memastikan proyek berjalan tepat waktu dan sesuai anggaran', match: 94 }, { title: 'Customer Success Manager', description: 'Membangun hubungan jangka panjang dengan klien', match: 89 }, { title: 'Guru / Dosen', description: 'Mentransfer pengetahuan dan menginspirasi generasi berikutnya', match: 87 }],
  ]

  const relationshipStyles = [
    'Kamu adalah pemimpin dalam hubungan — kuat, protektif, dan selalu ingin membuat orang yang kamu cintai berkembang.',
    'Dalam hubungan, kamu adalah pemikir yang dalam. Kesetiaan dan dedikasimu tidak perlu diragukan.',
    'Kamu membawa energi kreatif dan warna dalam setiap hubungan. Kamu membutuhkan kebebasan berekspresi.',
    'Kamu adalah penyeimbang dalam hubungan — selalu memastikan semua pihak merasa nyaman dan didengar.',
    'Kamu membawa petualangan dan kesegaran dalam hubungan. Kamu membutuhkan pasangan yang tidak takut mencoba hal baru.',
    'Kamu adalah pilar yang bisa diandalkan. Dalam hubungan, kamu memberikan stabilitas, keamanan, dan komitmen penuh.',
  ]

  const challenges = [
    [{ day: 'Hari 1', title: 'Latihan Kepemimpinan Mikro', description: 'Ambil inisiatif dalam satu diskusi tim hari ini. Berikan arah yang jelas.', locked: false }, { day: 'Hari 2', title: 'Journaling Visi', description: 'Luangkan 15 menit menulis visi 5 tahun ke depanmu.', locked: true }, { day: 'Hari 3', title: 'Networking Satu Koneksi', description: 'Hubungi satu orang baru yang bisa memperluas jaringanmu.', locked: true }],
    [{ day: 'Hari 1', title: 'Analisis Data Harian', description: 'Pilih satu keputusan dan buat analisis pro-kontra tertulis sebelum memutuskan.', locked: false }, { day: 'Hari 2', title: 'Belajar Skill Baru', description: 'Dedikasikan 20 menit untuk mempelajari konsep baru.', locked: true }, { day: 'Hari 3', title: 'Refleksi Sistem', description: 'Identifikasi satu proses dalam hidupmu yang bisa dioptimasi.', locked: true }],
    [{ day: 'Hari 1', title: 'Proyek Kreatif Mini', description: 'Buat sesuatu — gambar, tulisan, atau desain — nikmati prosesnya.', locked: false }, { day: 'Hari 2', title: 'Eksplorasi Medium Baru', description: 'Coba satu medium kreatif yang belum pernah kamu coba.', locked: true }, { day: 'Hari 3', title: 'Brainstorming Bebas', description: 'Set timer 10 menit dan tuliskan semua ide tanpa filter.', locked: true }],
    [{ day: 'Hari 1', title: 'Mendengarkan Aktif', description: 'Dalam setiap percakapan hari ini, fokus 100% pada lawan bicara.', locked: false }, { day: 'Hari 2', title: 'Apresiasi Satu Orang', description: 'Berikan apresiasi tulus kepada seseorang.', locked: true }, { day: 'Hari 3', title: 'Resolusi Konflik', description: 'Selesaikan satu ketegangan kecil yang tertunda.', locked: true }],
    [{ day: 'Hari 1', title: 'Keluar dari Zona Nyaman', description: 'Coba satu rute baru, restoran baru, atau aktivitas baru.', locked: false }, { day: 'Hari 2', title: 'Digital Detox 2 Jam', description: 'Matikan notifikasi dan nikmati dua jam tanpa layar.', locked: true }, { day: 'Hari 3', title: 'Petualangan Lokal', description: 'Eksplorasi satu tempat di kotamu yang belum pernah dikunjungi.', locked: true }],
    [{ day: 'Hari 1', title: 'Komitmen Satu Hal', description: 'Pilih satu kebiasaan kecil yang ingin kamu bangun dan mulai hari ini.', locked: false }, { day: 'Hari 2', title: 'Membantu Tanpa Diminta', description: 'Lakukan satu tindakan helpful untuk orang lain.', locked: true }, { day: 'Hari 3', title: 'Review Komitmen', description: 'Evaluasi janji-janjimu dan buat rencana konkret.', locked: true }],
  ]

  const id = `${masterSeed.toString(36)}-${Date.now().toString(36)}`

  return {
    id,
    characterType: character.type,
    characterDescription: character.description,
    intelligenceScores: baseScores,
    dominantIntelligence: dominantMap[dominant[0]],
    strengths: strengthIndices.map((i) => allStrengths[i]),
    weaknesses: weaknessIndices.map((i) => allWeaknesses[i]),
    careerPaths: careerOptions[charIndex],
    relationshipStyle: relationshipStyles[charIndex],
    dailyChallenges: challenges[charIndex],
    profileColor: character.color,
    profileEmoji: character.emoji,
  }
}
