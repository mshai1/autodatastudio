import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { rateLimit } from "@/lib/rateLimiter";

export async function GET(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    const limit = rateLimit(ip);

    if(!limit.success) {
        return NextResponse.json(
            {
                error: "Too many requests. Please slow down.",
                retryAfter: Math.ceil(limit.remainingTime / 1000),
            },
            { status: 429 }
        );
    }
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