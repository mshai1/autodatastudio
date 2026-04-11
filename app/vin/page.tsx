"use client";

import { useState } from "react";
import JSONViewer from "../components/JSONViewer";
import DataTable from "../components/DataTable";
import ToggleView from "../components/ToggleView";
import LoadingSkeletion from "../components/LoadingSkeleton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function VinPage() {
    const [vin, setVin] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<"json" | "csv">("json");
    const [error, setError] = useState("");
    const [hasFetched, setHasFetched] = useState(false);

    async function fetchVin() {
        if (!vin) {
            setError("Please enter a VIN");
            return;
        }

        setError("");
        setLoading(true);
        setHasFetched(true);

        try {
            const res = await fetch(`/api/vin?vin=${vin}`);

            if(res.status === 429) {
                const data = await res.json();
                setError(`You're going a bit fast 🚀 — please try again in ${data.retryAfter}s.`);
                return;
            }

            if(!res.ok) throw new Error("Failed");

            const json = await res.json();
            setData(json);
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-1 w-full flex jsutify-center px-4 py-16">
                <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6 sm:p-8">
                    <h1 className="text-2xl font-semibold text-center mb-6">
                        VIN Decoder
                    </h1>

                    <input
                        type="text"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        placeholder="Enter VIN (e.g. 1HGCM82633A123456)"
                        className="w-full border border-slate-300 rounded p-2 text-slate-800 mb-4
                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={fetchVin}
                        className="bg-blue-600 text-white px-4 py-3 rounded w-full mb-6
                                    hover:bg-blue-700 transition"   
                    >
                        Decode VIN
                    </button>

                    {loading && <LoadingSkeletion />}
                    {error && <p className="text-red-500">{error}</p>}

                    {data.length > 0 && (
                        <>
                            <ToggleView viewMode={viewMode} setViewMode={setViewMode} />
                            {viewMode === "json" ? (
                                <JSONViewer data={data} />
                            ) : (
                                <DataTable data={data} />
                            )}
                        </>
                    )}

                    
                    {!loading && hasFetched && data.length === 0 && (
                        <p className="text-center text-slate-500">
                            No data found for this VIN
                        </p>
                    )}

                </div>
            </main>
            <Footer />
        </div>
    );
}