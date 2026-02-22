"use client";
import { useEffect, useState } from "react";
import MakeDropdown from "./components/MakeDropdown";
import YearDropdown from "./components/YearDropDown";
import ToggleView from "./components/ToggleView";
import JSONViewer from "./components/JSONViewer";
import DataTable from "./components/DataTable";
import DownloadButtons from "./components/DownloadButtons";
import LoadingSkeletion from "./components/LoadingSkeleton";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

type Make = { MakeId: number; MakeName: string; };

export default function Home() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"json"|"csv">("json");
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => { async function fetchMakes() { const res = await fetch("api/makes"); const json = await res.json(); setMakes(json); }fetchMakes(); }, []);

  async function fetchData() {
    if (!selectedMake || !year) {setError("Select make and year"); return; }
    setError(""); setLoading(true); setHasFetched(true);
    try {
      const res = await fetch(`api/vehicles?make=${selectedMake}&year=${year}`);
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      setData(json);
    } catch { setError("Something went worng."); setData([]); } finally { setLoading(false);}
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />

        <main className="flex-1 w-full flex justify-center px-4 py-16">
          <div className="w-full max-w-4xl">
          <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8">
            <div className="mb-12 text-center">
              <h1 className="text-3xl font-semibold text-slate-800">
                Explore and Export Vehicle Models by Make & Year
              </h1>
            </div>

            <MakeDropdown
              makes={makes}
              selectedMake={selectedMake}
              setSelectedMake={setSelectedMake}
            />
            <YearDropdown
              year={year}
              setYear={setYear}
            />
            <button
              onClick={fetchData} 
              className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-6
                        transition-all duration-200
                        hover:bg-blue-700 hover:shadow-lg hover:translate-y-[1px]
                        active:translate-y-0 active:shadow-md"
            >
              Fetch Data
            </button>
            {loading && <LoadingSkeletion />}
            {error && <p className="text-red-500">{error}</p>}
            
            {data.length>0 && <>
              <div className="animate-fadeIn">
                <ToggleView viewMode={viewMode} setViewMode={setViewMode}/>
                {viewMode==="json" ? <JSONViewer data={data}/> : <DataTable data={data}/>}
                {data.length>10 && <p className="mt-2 text-gray-500">Showing first 10 results</p>}
                <DownloadButtons data={data} selectedMake={selectedMake} year={year}/>
              </div>
            </>}

            {!loading && hasFetched && data.length === 0 && selectedMake && year && (
              <div className="mt-8 border border-slate-200 rounded-lg bg-white p-8 text-center shadow-sm">
                <p className="text-slate-700 font-medium">
                  No vehicle models found.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try a different year or make combination.
                </p>
              </div>
            )}
            </div>

            <div className="mt-20 pt-10 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-400 uppercase tracking-wide">
                Upcoming
              </p>

              <p className="mt-2 text-slate-500 text-sm">
                VIN Decoder · Advanced Filtering · Bulk Export
              </p>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </>
  );
}