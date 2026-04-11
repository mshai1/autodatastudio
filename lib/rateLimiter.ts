import { timeStamp } from "console";

const requests = new Map<string, { count:number; timestamp: number}>();

const WINDOWS_SIZE = 60*1000; //1 minute
const MAX_REQUESTS = 5;

type RateLimitResult = 
    | {success: true}
    | {success: false; remainingTime: number};

export function rateLimit(ip:string): RateLimitResult {
    const now = Date.now();
    const record = requests.get(ip);

    if(!record) {
        requests.set(ip, { count:1, timestamp: now});
        return { success:true };
    }

    if (now - record.timestamp > WINDOWS_SIZE) {
        requests.set(ip, { count:1, timestamp: now});
        return { success:true };
    }

    //Increment count
    record.count += 1;

    if(record.count > MAX_REQUESTS) {
        return {
            success: false,
            remainingTime: WINDOWS_SIZE - (now - record.timestamp),
        };
    }

    return { success:true };
}