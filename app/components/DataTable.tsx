"use client";

interface Props { data: any[]; }

export default function DataTable({ data }: Props) {
    const previewData = data.slice(0, 10);
    if(!previewData.length) return null;

    return (
        <div className="overflow-auto max-h-80 border rounded bg-white">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        {Object.keys(previewData[0]).map(k => <th key={k} className="px-4 py-2 border-b text-left">{k}</th>)}</tr>
                </thead>
                <tbody>
                    {previewData.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            {Object.values(row).map((val, idx) => <td key={idx} className="px-4 py-2 border-b">{val as string}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}