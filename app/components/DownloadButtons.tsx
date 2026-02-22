"use client";

interface Props { data: any[]; selectedMake: string; year: string; }

export default function DownloadButtons({ data, selectedMake, year }: Props) {
    const jsonToCSV = (data:any[]) => {
        if (!data.length) return "";
        const headers = Object.keys(data[0]);
        const rows = data.map(row => headers.map(h=> `|${row[h]??""}`).join(","));
        return [headers.join(","), ...rows].join("\n");
    };

    const downloadJSON = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedMake}_${year}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };
    
    const downloadCSV = () => {
        const csv = jsonToCSV(data);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedMake}_${year}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex gap-4 mt-4">
            <button
                onClick={downloadJSON} 
                className="bg-blue-600 text-white px-4 py-2 rounded 
                transition-all duration-200 hover:bg-blue-700 hover:shadow-lg 
                hover:translate-y-[1px] active:translate-y-0 active:shadow-md"
            >
                Download JSON
            </button>
            <button 
                onClick={downloadCSV} 
                className="bg-green-600 text-white px-4 py-2 rounded
                transition-all duration-200 hover:bg-green-700 hover:shadow-lg 
                hover:translate-y-[1px] active:translate-y-0 active:shadow-md"
                >
                    Download CSV
                </button>
        </div>
    );
}