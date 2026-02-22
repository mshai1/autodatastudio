"use client";

interface Props { data: any[]; }

export default function DataTable({ data }: Props) {
    const previewData = data.slice(0, 10);
    if(!previewData.length) return null;

    return (
        <div className="overflow-auto max-h-80 border border-slate-300 rounded bg-white shadow-sm">
            <table className="min-w-full text-sm text-slate-800">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                        {Object.keys(previewData[0]).map(k => <th key={k} className="px-4 py-2 border-b text-left border-slate-200">{k}</th>)}</tr>
                </thead>
                <tbody>
                    {previewData.map((row, i) => (
                        <tr key={i} className="hover:bg-blue-50">
                            {Object.values(row).map((val, idx) => <td key={idx} className="px-4 py-2 border-b border-slate-200">{val as string}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}