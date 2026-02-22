"use clinet";
import { useEffect, useRef, useState } from "react";

type Make = { MakeId: number; MakeName: string; };

interface Props {
    makes: Make[];
    selectedMake: string;
    setSelectedMake: (make: string) => void;
}

export default function MakeDropdown({ makes, selectedMake, setSelectedMake }: Props) {
    const [filteredMakes, setFilteredMakes] = useState<Make[]>([]);
    const [makeSearch, setMakeSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            if (makeSearch.trim() === "") {
                setFilteredMakes(makes.slice(0, 50));
            } else {
                const filtered = makes.filter((m) =>
                    m.MakeName.toLowerCase().includes(makeSearch.toLowerCase())
                );
                setFilteredMakes(filtered);
            }
            setHighlightIndex(0);
        }, 200);

        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [makeSearch, makes]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) return;
        if (e.key === "ArrowDown") setHighlightIndex(prev => Math.min(prev + 1, filteredMakes.length-1));
        if (e.key === "ArrowUp") setHighlightIndex(prev => Math.max(prev - 1, 0));
        if (e.key === "Enter") {
            const selected = filteredMakes[highlightIndex];
            if (selected) { 
                setSelectedMake(selected.MakeName);
                setMakeSearch(selected.MakeName);
                setIsOpen(false);
            }
        }
    };

    return (
        <div className="mb-6 relative" ref={dropdownRef}>
            <label className="block mb-1 font-medium">Search Make</label>
            <input
                ref={inputRef}
                type="text"
                value={makeSearch}
                onFocus={() => setIsOpen(true)}
                onChange={(e) => { setMakeSearch(e.target.value); }}
                onKeyDown={handleKeyDown}
                placeholder="Type to Search..."
                className="border p-2 rounded w-full"
            />

            {/* Clear Icon */}
            {makeSearch && (
                <button
                    type="button"
                    onClick={() => {
                        setMakeSearch("");
                        setSelectedMake("");
                        setIsOpen(true);
                        inputRef.current?.focus();
                    }}
                    className="absolute right-2 top-2/3 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 
                            1 0 111.414 1.414L11.414 10l4.293 
                            4.293a1 1 0 01-1.414 1.414L10 
                            11.414l-4.293 4.293a1 1 0 
                            01-1.414-1.414L8.586 10 4.293 
                            5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                    />
                    </svg>
                </button>
            )}

            {isOpen && (
                <div className="absolute w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto shadow-lg z-20">
                    {filteredMakes.length === 0 && (
                        <div className="p-2 text-slate-500">No results</div>
                    )}
                    
                    {filteredMakes.map((m, idx) => (
                        <div
                            key={m.MakeId}
                            onClick={()=> {setSelectedMake(m.MakeName); setMakeSearch(m.MakeName); setIsOpen(false); }}
                            className={`p-2 cursor-pointer ${idx === highlightIndex ? "bg-blue-100": "hover:bg-gray-100"}`}
                        >
                            {m.MakeName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}