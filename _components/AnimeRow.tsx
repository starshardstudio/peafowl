import {formatDateIso} from "../_utils/date.ts"
import {AnimeData, AnimeProgress, animeProgressToClassName, animeProgressToIconDef, animeProgressToTitle} from "../_utils/anime.ts"
import {ratingToClassName} from "../_utils/rating.ts"


export type AnimeRowColumnKind = "rating" | "progress" | "name" | "nameoriginal" | "namesort" | "hascontent" | "date"
export type AnimeRowColumnPriority = undefined | "rating" | "progress" | "mixed"

export const animeRowColumnKindDefault: AnimeRowColumnKind[] = ["rating", "name", "namesort", "hascontent", "date", "progress"]


export type AnimeRowProps = {
    anime: AnimeData,
    columns?: AnimeRowColumnKind[]
    priority?: AnimeRowColumnPriority
}


export function AnimeRow({anime, columns = animeRowColumnKindDefault, priority}: AnimeRowProps) {
    const activeClass: string = anime.active ? "review-active" : ""
    const activeClassFa: string = anime.active ? "fa-beat-fade" : ""

    const ratingText: string = anime.rating ? `${anime.rating}` : ""

    const ratingClass: string = ratingToClassName(anime.rating)

    const progressClass: string = animeProgressToClassName(anime.progress)
    const progressIcon: string = animeProgressToIconDef(anime.progress)
    const progressTitle: string = animeProgressToTitle(anime.progress)

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
            case "progress": {
                return (
                    <td key={index} className={`anime-progress ${progressClass}`}>
                        <data value={anime.progress ?? AnimeProgress.Unset} title={progressTitle}>
                            {progressIcon && <i className={`fa-sharp fa-regular ${progressIcon} ${activeClassFa}`}></i>}
                        </data>
                    </td>
                )
            }
            case "name": {
                return (
                    <td key={index} className={`review-name`}>
                        <a href={anime.url}>
                            <data value={anime.name ?? ""}>
                                {anime.name}
                            </data>
                        </a>
                    </td>
                )
            }
            case "nameoriginal": {
                return (
                    <td key={index} className={`review-nameoriginal`}>
                        <data value={anime.name_original ?? ""}>
                            {anime.name_original}
                        </data>
                    </td>
                )
            }
            case "namesort": {
                return (
                    <td key={index} className={`review-namesort`} hidden={true}>
                        <data value={anime.name ?? ""}/>
                    </td>
                )
            }
            case "hascontent": {
                return (
                    <td key={index} className={`review-hascontent`}>
                        <data value={anime.content ? "true" : "false"}>
                            {anime.content && <i className={"fa-sharp fa-regular fa-bars-sort"}/>}
                        </data>
                    </td>
                )
            }
            case "date": {
                const date = formatDateIso(anime.date)
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
        <tr className={`anime ${activeClass} ${ratingClass} ${progressClass} ${priorityClass}`}>
            {columnsElements}
        </tr>
    )
}