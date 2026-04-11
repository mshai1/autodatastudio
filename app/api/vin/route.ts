import { NextResponse } from "next/server";

export async function GET(req: Request) {
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