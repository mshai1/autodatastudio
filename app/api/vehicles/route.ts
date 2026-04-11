import { NextRequest, NextResponse} from "next/server";
import { rateLimit } from "@/lib/rateLimiter";
import { getCache, setCache } from "@/lib/cache";
import { jsonToCSV } from "@/lib/csv";
import { cache } from "react";

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
    const make = searchParams.get("make");
    const year = searchParams.get("year");
    const format = searchParams.get("format") || "json";

    if(!make || !year) {
        return NextResponse.json(
            { error: "Missing make or year" },
            { status: 400 }
        );
    }

    const cachekey = `${make}-${year}`;
    
    const cached = getCache(cachekey);
    if (cached) {
        return formatResponse(cached, format);
    }

    const upStreamUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`;

    const response = await fetch(upStreamUrl);

    if(!response.ok) {
        return NextResponse.json(
            { error: "Upstream error" },
            { status:500 }
        );
    }

    const data = await response.json();

    const results = data.Results;

    setCache(cachekey, results);

    return formatResponse(results, format);
}

function formatResponse(data: any[], format:string) {
    if (format === "csv") {
        const csv = jsonToCSV(data);

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": "attachment; filename=vehicles.csv"
            }
        });
    }

    return NextResponse.json(data);
}