import {formatDateIso} from "../_utils/date.ts"
import {AnimeData, AnimeProgress, animeProgressToClassName, animeProgressToIconDef, animeProgressToTitle} from "../_utils/anime.ts"
import {ReviewInfo} from "../_components/ReviewInfo.tsx"


export const layout = "base.tsx"

export default function(data: AnimeData, helpers: Lume.Helpers) {
    const dateRow = (
        <ReviewInfo.MetadataRow
            className={"review-date"}
            label={"Last updated"}
        >
            {formatDateIso(data.date)}
        </ReviewInfo.MetadataRow>
    )

    const dateSeparator = (data.progress || data.hours_played) ? <hr/> : null

    const nameOriginalRow = (
        <ReviewInfo.MetadataRow
            className={"anime-nameoriginal"}
            label={"Original name"}
        >
            <data value={data.name_original}>
                {data.name_original}
            </data>
        </ReviewInfo.MetadataRow>
    )

    const nameSeparator = (data.name_original) ? <hr/> : null

    const progressRow = data.progress ? (
        <ReviewInfo.MetadataRow
            className={`anime-progress ${animeProgressToClassName(data.progress)}`}
            label={"Progress"}
            icon={<i className={`fa-sharp fa-regular ${animeProgressToIconDef(data.progress)} ${data.active ? "fa-beat-fade" : ""}`}/>}
        >
            <data value={data.progress}>
                {animeProgressToTitle(data.progress)}
            </data>
            {data.active &&
                <>
                    ,&nbsp;
                    <span className={"fa-fade"} style={{animationDelay: '-0.5s'}}>now watching</span>
                </>
            }
        </ReviewInfo.MetadataRow>
    ) : null

    const playedSeparator = (data.started_on || data.completed_on || data.mastered_on) ? <hr/> : null

    const purchasedOnValue = formatDateIso(data.purchased_on)
    const purchasedOnRow = purchasedOnValue ? (
        <ReviewInfo.MetadataRow
            className={`anime-purchasedon`}
            label={"Purchased on"}
            icon={<i className={`fa-sharp fa-regular ${animeProgressToIconDef(AnimeProgress.New)}`}/>}
        >
            <time dateTime={purchasedOnValue}>
                {purchasedOnValue}
            </time>
        </ReviewInfo.MetadataRow>
    ) : null

    const startedOnValue = formatDateIso(data.started_on)
    const startedOnRow = startedOnValue ? (
        <ReviewInfo.MetadataRow
            className={`anime-startedon`}
            label={"Started on"}
            icon={<i className={`fa-sharp fa-regular ${animeProgressToIconDef(AnimeProgress.Started)}`}/>}
        >
            <time dateTime={startedOnValue}>
                {startedOnValue}
            </time>
        </ReviewInfo.MetadataRow>
    ) : null

    const completedOnValue = formatDateIso(data.completed_on)
    const completedOnRow = completedOnValue ? (
        <ReviewInfo.MetadataRow
            className={`anime-completedon`}
            label={"Completed on"}
            icon={<i className={`fa-sharp fa-regular ${animeProgressToIconDef(AnimeProgress.Completed)}`}/>}
        >
            <time dateTime={completedOnValue}>
                {completedOnValue}
            </time>
        </ReviewInfo.MetadataRow>
    ) : null

    const masteredOnValue = formatDateIso(data.mastered_on)
    const masteredOnRow = masteredOnValue ? (
        <ReviewInfo.MetadataRow
            className={`anime-masteredon`}
            label={"Mastered on"}
            icon={<i className={`fa-sharp fa-regular ${animeProgressToIconDef(AnimeProgress.Mastered)}`}/>}
        >
            <time dateTime={masteredOnValue}>
                {masteredOnValue}
            </time>
        </ReviewInfo.MetadataRow>
    ) : null

    return (
        <main id={"anime-main"}>
            <ReviewInfo
                name={data.name}
                rating={data.rating}
                metadata={<>
                    {dateRow}
                    {dateSeparator}
                    {progressRow}
                    {playedSeparator}
                    {purchasedOnRow}
                    {startedOnRow}
                    {completedOnRow}
                    {masteredOnRow}
                </>}
            >
                {data.children}
            </ReviewInfo>
        </main>
    )
}
