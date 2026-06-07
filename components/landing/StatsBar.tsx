import Reveal from '@/components/ui/Reveal'

const stats = [
  { value: '6', label: 'Dimensi kecerdasan' },
  { value: '< 60s', label: 'Hasil instan' },
  { value: '30 hari', label: 'Action plan' },
  { value: '100%', label: 'Personal & privat' },
]

export default function StatsBar() {
  return (
    <section className="relative bg-ink border-y border-white/[0.06]">
      <div className="max-w-container mx-auto px-5 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className={`text-center ${i > 0 ? 'md:border-l border-white/[0.08]' : ''}`}>
                <p className="font-cinzel font-bold text-3xl md:text-4xl gradient-text">{stat.value}</p>
                <p className="text-white/45 text-xs sm:text-sm font-montserrat mt-2 tracking-wide">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
