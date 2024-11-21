import {formatDateIso} from "../_utils/date.ts"
import {ratingToClassName} from "../_utils/rating.ts"
import { ReviewData } from "../_utils/review.ts";


export type ReviewRowColumnKind = "rating" | "name" | "namesort" | "hascontent" | "date"
export type ReviewRowColumnPriority = undefined | "rating" | "progress" | "mixed"

export const reviewRowColumnKindDefault: ReviewRowColumnKind[] = ["rating", "name", "namesort", "hascontent", "date"]


export type ReviewRowProps = {
    review: ReviewData,
    columns?: ReviewRowColumnKind[]
    priority?: ReviewRowColumnPriority
}


export function ReviewRow({review, columns = reviewRowColumnKindDefault, priority}: ReviewRowProps) {
    const activeClass: string = review.active ? "review-active" : ""
    const activeClassFa: string = review.active ? "fa-beat-fade" : ""

    const ratingText: string = review.rating ? `${review.rating}` : ""

    const ratingClass: string = ratingToClassName(review.rating)

    const priorityClass: string = priority ? `priority-${priority}` : ""

    const columnsElements = columns.map((kind, index) => {
        switch(kind) {
            case "rating": {
                return (
                    <td key={index} className={`review-rating ${ratingClass}`}>
                        <data value={ratingText}>
                            {ratingText}
                        </data>
                    </td>
                )
            }
            case "name": {
                return (
                    <td key={index} className={`review-name`}>
                        <a href={review.url}>
                            <data value={review.name ?? ""}>
                                {review.name}
                            </data>
                        </a>
                    </td>
                )
            }
            case "namesort": {
                return (
                    <td key={index} className={`review-namesort`} hidden={true}>
                        <data value={review.name_sort ?? review.name ?? ""}/>
                    </td>
                )
            }
            case "hascontent": {
                return (
                    <td key={index} className={`review-hascontent`}>
                        <data value={review.content ? "true" : "false"}>
                            {review.content && <i className={"fa-sharp fa-regular fa-bars-sort"}/>}
                        </data>
                    </td>
                )
            }
            case "date": {
                const date = formatDateIso(review.date)
                return (
                    <td key={index} className={`review-date`}>
                        <time dateTime={date ?? ""}>
                            {date}
                        </time>
                    </td>
                )
            }
        }
    })

    return (
        <tr className={`game ${activeClass} ${ratingClass} ${priorityClass}`}>
            {columnsElements}
        </tr>
    )
}