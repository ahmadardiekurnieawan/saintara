const stats = [
  { value: '10.000+', label: 'Profil Dianalisis' },
  { value: '4 Bahasa', label: 'Tersedia' },
  { value: '98%', label: 'Akurasi Validasi' },
  { value: 'Enterprise', label: 'Grade Security' },
]
export default function StatsBar() {
  return (
    <section className="bg-primary border-y border-white/10 py-8">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className={`text-center ${i > 0 ? 'md:border-l border-white/10' : ''}`}>
              <p className="font-cinzel font-bold text-2xl text-gold">{stat.value}</p>
              <p className="text-white/60 text-sm font-montserrat mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
