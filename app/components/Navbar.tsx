export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            AD
          </div>
          <div>
            <p className="font-semibold text-slate-800">
              AutoData Studio
            </p>
            <p className="text-xs text-slate-500 -mt-1">
              Vehicle Data Explorer
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm">
          <a
            href="mailto:devshaimail.com?subject=AutoData Studio Feedback"
            className="text-slate-600 hover:text-blue-600 transition"
          >
            Feedback
          </a>

          <a
            href="https://github.com/mshai1"
            target="_blank"
            className="text-slate-600 hover:text-blue-600 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}