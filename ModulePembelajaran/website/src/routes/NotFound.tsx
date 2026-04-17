import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="font-mono text-sm text-skepticism mb-4">404</div>
      <h1 className="font-serif text-4xl font-semibold mb-4">Halaman tidak ditemukan</h1>
      <p className="text-lg text-ink/70 dark:text-parchment/75 mb-8">
        Tautan yang Anda buka mungkin salah atau sudah di-pindahkan.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">Kembali ke beranda</Link>
        <Link to="/modul" className="btn-secondary">Lihat daftar modul</Link>
      </div>
    </div>
  );
}
