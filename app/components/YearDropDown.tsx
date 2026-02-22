"use client";

interface Props {
    year: string;
    setYear: (y:string) => void;
}

export default function YearDropdown({ year, setYear}: Props) {
    const years = Array.from({ length: new Date().getFullYear() - 1991 }, (_, i) => (new Date().getFullYear() -i).toString());

    return (
        <div className="mb-4">
            <label className="block mb-1 font-medium">Select Year</label>
            <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="bordeer p-2 rounded 2-full"
            >
                <option value="">Choose Year</option>
                {years.map(y => <option key={y}>{y}</option>)}
            </select>
        </div>
    );
}