export function jsonToCSV(data: any[]) {
    if(!data.length) return "";

    const headers = Object.keys(data[0]);

    const rows = data.map(obj =>
        headers.map(header => `"${obj[header] ?? ""}"`).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
}