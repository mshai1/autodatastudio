import { rateLimit } from "@/lib/rateLimiter";
import { NextRequest, NextResponse } from "next/server";

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

    const { searchParams } = new URL(req.url);
    const vin = searchParams.get("vin");

    if(!vin) {
        return NextResponse.json({ error: "VIN is required" }, { status: 400 });
    }

    try {
        const res = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`
        );

        const data = await res.json();

        //Clean up response (remove empty values)
        const cleaned = data.Results.map((item: any) => {
            const filtered: Record<string, any> = {};
            for (const key in item) {
                if (item[key]) {
                    filtered[key] = item[key];
                }
            }
            return filtered;
        });

        return NextResponse.json(cleaned);
    } catch {
        return NextResponse.json({ error: "Failed to fetch VIN data" }, { status: 500 });
    }
}