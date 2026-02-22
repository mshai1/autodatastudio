export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-slate-500 space-y-2">
        <p className="font-medium text-slate-700">
          AutoData Studio
        </p>

        <p>
          Built by Mohammad Shaikh
        </p>

        <p className="text-xs">
          Public vehicle data provided via NHTSA API
        </p>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}