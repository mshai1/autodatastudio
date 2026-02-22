const cache = new Map<string, { data: any, timestamp: number}>();

const TTL = 60*60*1000; //1 hour

export function getCache(key: string) {
    const record = cache.get(key);
    if (!record) return null;

    if (Date.now() - record.timestamp > TTL) {
        cache.delete(key);
        return null;
    }

    return record.data;
}

export function setCache(key: string, data:any) {
    cache.set(key, { data, timestamp: Date.now() });
}