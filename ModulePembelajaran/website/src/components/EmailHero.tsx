import { Link } from "react-router-dom";

export default function EmailHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-curiosity-soft/40 via-cream to-rigor-soft/30 dark:from-rigor/15 dark:via-charcoal dark:to-curiosity/10" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-curiosity/20 text-curiosity-deep dark:bg-curiosity/15 dark:text-curiosity text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-curiosity animate-pulse-soft" aria-hidden="true" />
            Modul 14 minggu untuk asisten riset ML/DL
          </div>
          <h1 className="font-serif font-semibold text-display-lg tracking-tight mb-6">
            Hari ketiga di lab.<br />
            <span className="text-rigor dark:text-curiosity">Tujuh hari menuju Kamis.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink/75 dark:text-parchment/80 max-w-xl mb-8 leading-relaxed">
            Satu email dua kalimat dari dosen pembimbing bisa membuka tiga puluh file Python, satu paper yang belum sempat dibaca, dan satu hipotesis yang belum Anda rumuskan. Modul ini mengajar Anda menjawabnya dengan tenang.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/modul/00" className="btn-primary text-base px-5 py-2.5">
              Mulai dari Bab 00
            </Link>
            <Link to="/modul" className="btn-secondary text-base px-5 py-2.5">
              Lihat 13 bab
            </Link>
          </div>
          <p className="mt-6 text-sm text-ink/60 dark:text-parchment/60">
            Bahasa Indonesia. Istilah teknis (loss, freeze, seed, ablation) tetap English.
          </p>
        </div>

        <div className="relative lg:pl-8">
          <div className="bg-white dark:bg-white/[0.04] rounded-2xl shadow-email border border-black/5 dark:border-white/10 overflow-hidden">
            <div className="bg-parchment/60 dark:bg-white/[0.06] px-5 py-3 border-b border-black/5 dark:border-white/10 flex items-center gap-2">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-skepticism/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-curiosity/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-ownership/70" />
              </div>
              <div className="text-xs text-ink/60 dark:text-parchment/60 ml-2 font-mono">Inbox - Kamis 10:47</div>
            </div>
            <div className="p-6 font-serif">
              <div className="text-xs text-ink/50 dark:text-parchment/50 uppercase tracking-wider mb-1">Dari</div>
              <div className="text-sm mb-3 font-sans">dosen.pembimbing@lab.ac.id</div>
              <div className="text-xs text-ink/50 dark:text-parchment/50 uppercase tracking-wider mb-1">Subjek</div>
              <div className="text-base mb-5 font-sans font-medium">eksperimen minggu ini</div>
              <blockquote className="border-l-4 border-rigor pl-4 py-1 text-base md:text-lg italic leading-relaxed">
                "Tolong coba ubah loss-nya jadi focal, lalu freeze conv1 pada backbone. Bandingkan dengan baseline. Saya butuh hasilnya hari Kamis."
              </blockquote>
              <div className="mt-6 flex items-center justify-between text-sm font-sans">
                <span className="text-ink/60 dark:text-parchment/60">2 kalimat. 30 file Python. 1 paper.</span>
                <span className="chip bg-skepticism-soft text-skepticism-deep dark:bg-skepticism/20 dark:text-skepticism">
                  7 hari
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-ownership text-white px-4 py-2 rounded-lg shadow-card text-sm font-medium rotate-3" aria-hidden="true">
            Mulai dari pertanyaan, bukan kode.
          </div>
        </div>
      </div>
    </section>
  );
}
