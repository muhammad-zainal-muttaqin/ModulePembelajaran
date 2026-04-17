import { CHAPTERS } from "../lib/chapters";

const REPO_BASE = "https://github.com/muhammad-zainal-muttaqin/ModulePembelajaran/blob/main/ModulePembelajaran/template_repo/notebooks/";
const NBVIEWER_BASE = "https://nbviewer.org/github/muhammad-zainal-muttaqin/ModulePembelajaran/blob/main/ModulePembelajaran/template_repo/notebooks/";
const COLAB_BASE = "https://colab.research.google.com/github/muhammad-zainal-muttaqin/ModulePembelajaran/blob/main/ModulePembelajaran/template_repo/notebooks/";

const NOTEBOOKS: Record<string, string> = {
  "01": "lab1_baseline_cnn.ipynb",
  "02": "lab2_loss_freeze_ablation.ipynb",
  "03": "lab3_config_logging.ipynb",
  "04": "lab4_eda_leakage.ipynb",
  "05": "lab5_llm_assisted_loop.ipynb",
  "06": "lab6_adopt_external_repo.ipynb",
  "07": "lab7_streamlit_demo.ipynb",
  "08": "lab8_runpod_remote.ipynb",
  "09": "lab9_paper_to_experiment.ipynb",
};

export default function Labs() {
  const labs = CHAPTERS.filter((c) => NOTEBOOKS[c.id]);

  return (
    <div className="page-narrow">
      <header className="page-header">
        <h1 className="page-title">Lab Notebook</h1>
        <p className="page-lead">
          Sembilan Jupyter notebook pendamping bab. Jalankan di Google Colab, inspeksi di nbviewer, atau clone repo dan jalankan lokal.
        </p>
      </header>

      <ul className="grid gap-4">
        {labs.map((c) => {
          const nb = NOTEBOOKS[c.id];
          return (
            <li key={c.id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-ink/60 dark:text-parchment/60">
                    Bab {c.id} · Minggu {c.weeks}
                  </div>
                  <div className="font-serif text-xl font-semibold mt-1">{c.labName}</div>
                  <div className="text-sm text-ink/70 dark:text-parchment/70 mt-1">{c.subtitle}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`${COLAB_BASE}${nb}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-sm"
                  >
                    Buka di Colab
                  </a>
                  <a
                    href={`${NBVIEWER_BASE}${nb}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-sm"
                  >
                    nbviewer
                  </a>
                  <a
                    href={`${REPO_BASE}${nb}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="mt-3 text-xs font-mono text-ink/50 dark:text-parchment/50">
                {nb}
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="mt-10 rounded-xl border border-curiosity/30 bg-curiosity-soft/30 dark:bg-curiosity/10 p-6 text-sm">
        <div className="font-semibold mb-2">Catatan setup lokal</div>
        <p className="mb-2">
          Clone repo, masuk ke <code className="font-mono bg-white/60 dark:bg-white/10 px-1 py-0.5 rounded">template_repo/</code>, aktifkan venv, dan install paket editable:
        </p>
        <pre className="bg-ink/90 text-parchment font-mono text-xs p-3 rounded overflow-x-auto scrollbar-hidden">
{`python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -e ".[dev]"`}
        </pre>
      </aside>
    </div>
  );
}
