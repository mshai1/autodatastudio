import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";

export async function GET() {
    const cachekey = "car-makes";

    const cached = getCache(cachekey);
    if(cached) {
        return NextResponse.json(cached);
    }

    const res = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );

    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch makes"}, { status: 500 });
    }

    const data = await res.json();

    setCache(cachekey, data.Results);

    return NextResponse.json(data.Results);
}