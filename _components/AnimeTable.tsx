import {AnimeData} from "../_utils/anime.ts"
import {AnimeRow, AnimeRowColumnKind, animeRowColumnKindDefault, AnimeRowColumnPriority} from "./AnimeRow.tsx"


export type AnimeTableProps = {
    id?: string,
    anime: AnimeData[],
    columns?: AnimeRowColumnKind[]
    priority?: AnimeRowColumnPriority
}


export function AnimeTable({id, anime, columns = animeRowColumnKindDefault, priority}: AnimeTableProps) {
    const colElements = columns.map((column, index) => {
        switch(column) {
            case "rating": return (
                <col key={index} className={`review-rating`}/>
            )
            case "progress": return (
                <col key={index} className={`anime-progress`}/>
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
                    <abbr title={"The rating of the anime, from 1 to 100."}>
                        <i className={`fa-sharp fa-solid fa-thumbs-up`}/>
                    </abbr>
                </th>
            )
            case "progress": return (
                <th key={index} scope={"col"} className={`anime-progress`}>
                    <abbr title={"The progress that has been made in the anime."}>
                        <i className={`fa-sharp fa-solid fa-bars-progress`}/>
                    </abbr>
                </th>
            )
            case "name": return (
                <th key={index} scope={"col"} className={`review-name`}>
                    <abbr title={"The title of the anime."}>
                        Title
                    </abbr>
                </th>
            )
            case "namesort": return (
                <th key={index} scope={"col"} className={`review-namesort`} hidden={true}>
                    <abbr title={"The title to sort the anime as."}>
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

    const trTdElements = anime.map((ani: AnimeData) => (
        <AnimeRow key={ani.url} anime={ani} columns={columns} priority={priority}/>
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