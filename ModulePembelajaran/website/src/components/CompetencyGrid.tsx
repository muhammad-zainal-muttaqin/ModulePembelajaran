import { Link } from "react-router-dom";
import { COMPETENCIES } from "../lib/chapters";

export default function CompetencyGrid() {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {COMPETENCIES.map((c) => (
        <li key={c.n}>
          <Link
            to={`/modul/${c.chapter}`}
            className="group block h-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-rigor/40 dark:hover:border-curiosity/40 hover:shadow-card p-4 transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rigor text-white font-mono text-sm shrink-0">
                {c.n}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm leading-snug group-hover:text-rigor dark:group-hover:text-curiosity transition-colors">
                  {c.title}
                </div>
                <div className="mt-1 text-xs text-ink/60 dark:text-parchment/60 font-mono">
                  Bab {c.chapter} · Minggu {c.weeks}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
