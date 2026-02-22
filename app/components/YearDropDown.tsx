"use client";

interface Props {
    year: string;
    setYear: (y:string) => void;
}

export default function YearDropdown({ year, setYear}: Props) {
    const years = Array.from({ length: new Date().getFullYear() - 1991 }, (_, i) => (new Date().getFullYear() -i).toString());

    return (
        <div className="mb-4">
            <label className="block mb-1 font-medium text-slate-800 text-sm">Select Year</label>
            <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full border border-slate-300 bg-white rounded p-2 text-slate-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Choose Year</option>
                {years.map(y => <option key={y}>{y}</option>)}
            </select>
        </div>
    );
}