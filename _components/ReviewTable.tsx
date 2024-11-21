import {GameData} from "../_utils/game.ts"
import {ReviewData} from "../_utils/review.ts";
import { ReviewRow, ReviewRowColumnKind, reviewRowColumnKindDefault, ReviewRowColumnPriority } from "./ReviewRow.tsx";


export type ReviewTableProps = {
    id?: string,
    reviews: ReviewData[],
    columns?: ReviewRowColumnKind[]
    priority?: ReviewRowColumnPriority
}


export function ReviewTable({id, reviews, columns = reviewRowColumnKindDefault, priority}: ReviewTableProps) {
    const colElements = columns.map((column, index) => {
        switch(column) {
            case "rating": return (
                <col key={index} className={`review-rating`}/>
            )
            case "name": return (
                <col key={index} className={`review-name`}/>
            )
            case "hascontent": return (
                <col key={index} className={`review-hascontent`}/>
            )
            case "date": return (
                <col key={index} className={`review-date`}/>
            )
        }
    })

    const thElements = columns.map((column, index) => {
        switch(column) {
            case "rating": return (
                <th key={index} scope={"col"} className={`review-rating`}>
                    <abbr title={"The given rating, from 1 to 100."}>
                        <i className={`fa-sharp fa-solid fa-thumbs-up`}/>
                    </abbr>
                </th>
            )
            case "name": return (
                <th key={index} scope={"col"} className={`review-name`}>
                    <abbr title={"The title of the reviewed item."}>
                        Title
                    </abbr>
                </th>
            )
            case "namesort": return (
                <th key={index} scope={"col"} className={`review-namesort`} hidden={true}>
                    <abbr title={"The title to sort the reviewed item as."}>
                        Sort by
                    </abbr>
                </th>
            )
            case "hascontent":
                return (
                    <th key={index} scope={"col"} className={`review-hascontent`}>
                        <abbr title={"Whether the review has textual content, or just metadata."}>
                        <i className={`fa-sharp fa-regular fa-bars-sort`}/>
                    </abbr>
                </th>
            )
            case "date": return (
                <th key={index} scope={"col"} className={`review-date`}>
                    <abbr title={"The date of the last update of the review."}>
                        Date
                    </abbr>
                </th>
            )
        }
    })

    const trTdElements = reviews.map((review: ReviewData) => (
        <ReviewRow key={review.url} review={review} columns={columns} priority={priority}/>
    ))

    return (
        <table id={id}>
            <colgroup>
                {colElements}
            </colgroup>
            <thead>
                <tr>
                    {thElements}
                </tr>
            </thead>
            <tbody>
                {trTdElements}
            </tbody>
        </table>
    )
}