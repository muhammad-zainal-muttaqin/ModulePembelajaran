import { Link } from "react-router-dom";
import { CHAPTERS, type Sikap } from "../lib/chapters";
import { useStore } from "../lib/storage";

type Props = {
  interactive?: boolean;
  compact?: boolean;
};

// Peta minggu ke bab (14 minggu total).
const WEEK_MAP: Record<number, string> = {
  1: "01",
  2: "02",
  3: "03",
  4: "04",
  5: "05",
  6: "06",
  7: "07",
  8: "08",
  9: "09",
  10: "10",
  11: "11",
  12: "12",
  13: "12",
  14: "12",
};

export default function LadderProgress({ interactive = false, compact = false }: Props) {
  const weeks = useStore((s) => s.weeks);
  const setWeek = useStore((s) => s.setWeek);

  const doneCount = Object.values(weeks).filter(Boolean).length;

  return (
    <div>
      {!compact && (
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h3 className="font-serif text-heading-2 font-semibold">Tangga 14 Minggu</h3>
            <p className="text-sm text-ink/70 dark:text-parchment/70 mt-1">
              Tiap anak tangga adalah satu minggu. Kebiasaan baru di-bangun berlapis.
            </p>
          </div>
          {interactive && (
            <div className="text-sm text-ink/70 dark:text-parchment/70">
              <span className="font-mono text-base">{doneCount}/14</span> minggu selesai
            </div>
          )}
        </div>
      )}

      <ol className="grid grid-cols-7 md:grid-cols-14 gap-1.5">
        {Array.from({ length: 14 }, (_, i) => i + 1).map((w) => {
          const chapterId = WEEK_MAP[w];
          const chapter = CHAPTERS.find((c) => c.id === chapterId);
          const done = !!weeks[w];
          const sikapKey = chapter?.sikap[0] || "rigor";

          const accentLite: Record<Sikap, string> = {
            curiosity: "bg-curiosity/25 border-curiosity/50 text-ink dark:text-parchment",
            rigor: "bg-rigor/25 border-rigor/50 text-ink dark:text-parchment",
            skepticism: "bg-skepticism/25 border-skepticism/50 text-ink dark:text-parchment",
            ownership: "bg-ownership/25 border-ownership/50 text-ink dark:text-parchment",
          };
          const accentDone: Record<Sikap, string> = {
            curiosity: "bg-curiosity border-transparent text-white",
            rigor: "bg-rigor border-transparent text-white",
            skepticism: "bg-skepticism border-transparent text-white",
            ownership: "bg-ownership border-transparent text-white",
          };

          const cell = (
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-full h-14 rounded-md border-2 transition-all ${
                  done ? accentDone[sikapKey] : accentLite[sikapKey]
                }`}
              >
                <div className="h-full flex items-center justify-center font-mono text-xs font-semibold">
                  W{w}
                </div>
              </div>
              {!compact && chapter && (
                <span
                  className="mt-1 w-full hidden md:block text-[10px] text-ink/70 dark:text-parchment/50 text-center leading-tight truncate"
                  title={chapter.title}
                >
                  {chapter.title.replace(/^W\d+\s*-\s*/, "")}
                </span>
              )}
            </div>
          );

          if (interactive) {
            return (
              <li key={w}>
                <button
                  type="button"
                  onClick={() => setWeek(w, !done)}
                  aria-pressed={done}
                  aria-label={`Minggu ${w}${chapter ? ` - ${chapter.title}` : ""}${done ? " (selesai)" : ""}`}
                  className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rigor rounded-md"
                >
                  {cell}
                </button>
              </li>
            );
          }

          return (
            <li key={w}>
              {chapter ? (
                <Link
                  to={`/modul/${chapter.id}`}
                  aria-label={`Minggu ${w} - ${chapter.title}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rigor rounded-md"
                >
                  {cell}
                </Link>
              ) : (
                cell
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
