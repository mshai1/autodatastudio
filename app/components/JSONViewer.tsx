"use client";

interface Props { data: any[]; }

export default function JSONViewer({ data }: Props) {
    return (
        <div className="border rounded p-4 bg-gray-50 max-h-80 overflow-auto text-sm">
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}