import { Link } from "react-router-dom";
import EmailHero from "../components/EmailHero";
import LadderProgress from "../components/LadderProgress";
import AttitudeCard from "../components/AttitudeCard";
import CompetencyGrid from "../components/CompetencyGrid";
import type { Sikap } from "../lib/chapters";

const SIKAP_LIST: Sikap[] = ["curiosity", "rigor", "skepticism", "ownership"];

export default function Home() {
  return (
    <div>
      <EmailHero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-3xl mb-10">
          <div className="text-sm font-mono text-rigor dark:text-curiosity mb-2">Empat sikap riset</div>
          <h2 className="font-serif text-display font-semibold mb-4">
            Kompetensi teknis tidak bertahan tanpa sikap yang benar.
          </h2>
          <p className="text-lg text-ink/75 dark:text-parchment/80 leading-relaxed">
            Empat sikap berikut mengalir di seluruh modul - sering tanpa disebut eksplisit - melalui pilihan contoh, pitfall, dan pertanyaan refleksi.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SIKAP_LIST.map((s) => (
            <AttitudeCard key={s} sikap={s} />
          ))}
        </div>
      </section>

      <section className="bg-parchment/40 dark:bg-white/[0.02] border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-3xl mb-10">
            <div className="text-sm font-mono text-rigor dark:text-curiosity mb-2">Peta 14 minggu</div>
            <h2 className="font-serif text-display font-semibold mb-4">
              Satu semester sebagai tangga, bukan daftar tugas.
            </h2>
            <p className="text-lg text-ink/75 dark:text-parchment/80 leading-relaxed">
              Setiap anak tangga mewakili satu minggu. Anak tangga lebih tinggi ke kanan: beban konsep menumpuk, tetapi kebiasaan yang di-bangun di minggu sebelumnya menopang.
            </p>
          </div>
          <LadderProgress />
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-ink/70 dark:text-parchment/70">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-curiosity" aria-hidden="true" /> Curiosity</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rigor" aria-hidden="true" /> Rigor</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-skepticism" aria-hidden="true" /> Skepticism</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ownership" aria-hidden="true" /> Ownership</span>
          </div>
          <div className="mt-8">
            <Link to="/progres" className="btn-secondary">
              Lacak progres saya
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-3xl mb-10">
          <div className="text-sm font-mono text-rigor dark:text-curiosity mb-2">Sembilan kompetensi</div>
          <h2 className="font-serif text-display font-semibold mb-4">
            Dari memahami sistem sampai berkembang mandiri.
          </h2>
          <p className="text-lg text-ink/75 dark:text-parchment/80 leading-relaxed">
            Setiap kompetensi dibahas satu bab penuh dengan satu lab pendamping. Klik untuk membuka babnya langsung.
          </p>
        </div>
        <CompetencyGrid />
      </section>

      <section className="bg-rigor text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="font-serif text-display font-semibold mb-4">
            Hari Kamis akan datang.
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
            Bukan dengan panik, tetapi dengan protokol, baseline, dan seed yang terkunci. Modul ini adalah tangga menuju ke sana.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/modul/00" className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-medium bg-curiosity text-ink hover:bg-curiosity-deep hover:text-white transition-colors">
              Mulai dari Bab 00
            </Link>
            <Link to="/alat/protokol" className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20">
              Buka Generator Protokol
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
