import { GlobalData } from "./site.ts";

export function formatDateIso(date?: Date): string {
    if(date === undefined) return ""
    date = new Date(date)
    return `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
}

export function compareDate(a: GlobalData, b: GlobalData): number {
    return new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime()
}
