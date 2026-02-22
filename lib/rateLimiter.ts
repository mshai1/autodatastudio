import { timeStamp } from "console";

const requests = new Map<string, { count:number; timestamp: number}>();

const WINDOWS_SIZE = 60*1000; //1 minute
const MAX_REQUESTS = 30;

export function rateLimit(ip:string) {
    const now = Date.now();
    const record = requests.get(ip);

    if(!record) {
        requests.set(ip, { count:1, timestamp: now});
        return true;
    }

    if (now - record.timestamp > WINDOWS_SIZE) {
        requests.set(ip, { count:1, timestamp: now});
    }

    if(record.count >= MAX_REQUESTS) {
        return false;
    }

    record.count += 1;
    return true;
}