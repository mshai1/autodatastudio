"use client";

interface Props { viewMode: "json" | "csv"; setViewMode: (v: "json" | "csv") => void; }

export default function ToggleView({ viewMode, setViewMode}: Props) {
    return (
        <div className="flex justify-center mb-8">
        <div className="relative flex bg-slate-200 rounded-full p-1">
            <button
            onClick={() => setViewMode("json")}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                viewMode === "json"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600"
            }`}
            >
            JSON
            </button>

            <button
            onClick={() => setViewMode("csv")}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                viewMode === "csv"
                ? "bg-green-600 text-white shadow-md"
                : "text-slate-600"
            }`}
            >
            CSV
            </button>
        </div>
        </div>
    );
}