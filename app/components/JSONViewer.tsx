"use client";

interface Props { data: any[]; }

export default function JSONViewer({ data }: Props) {
    return (
        <div className="overflow-auto max-h-80 border border-slate-300 rounded bg-white shadow-sm p-4 text-slate-800 text-sm font-mono">
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}