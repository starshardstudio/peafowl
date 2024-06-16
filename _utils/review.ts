import {Rating} from "./rating.ts"
import {GlobalData} from "./site.ts"


export interface ReviewData extends GlobalData {
    name?: string,
    name_sort?: string,
    rating?: Rating,
    content?: string,
}

export function compareName(a: ReviewData, b: ReviewData): number {
    const aName = a.name_sort ?? a.name ?? ""
    const bName = b.name_sort ?? b.name ?? ""

    return aName.localeCompare(bName)
}