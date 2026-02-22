import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          {/* Logo Image */}
          <div className="relative h-40 w-40">
            <Image
              src="/autodata-studio-logo.png"
              alt="AutoData Studio Logo"
              fill
              className="object-contain rounded-md"
              priority
            />
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