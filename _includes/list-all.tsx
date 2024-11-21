import { ReviewTable } from "../_components/ReviewTable.tsx";
import { ReviewData } from "../_utils/review.ts";


export const layout = "base.tsx"
export const url = "/all.html"

export default function(data: Lume.Data, helpers: Lume.Helpers) {
    const intro_section = data.content ? (
        <section id={"list-all-section-intro"}>
            {data.children}
        </section>
    ) : null

    const reviews: ReviewData[] = data.search.pages("review")

    const reviews_section = (
        <section id={"list-all-section-all"}>
            <h2>
                Review list
                <small>
                    <a href={helpers.url("/all/feed.rss")}>
                        <i className={"fa-sharp fa-solid fa-rss"}/> Feed
                    </a>
                </small>
                <small>
                    <a href={helpers.url("/all/index.json")}>
                        <i className={"fa-sharp fa-solid fa-brackets-curly"}/> Raw
                    </a>
                </small>
            </h2>
            <div>
                <ReviewTable id={"list-all-table"} reviews={reviews} priority={"mixed"}/>
            </div>
        </section>
    )

    return (
        <main id={"list-all-main"}>
            {intro_section}
            {reviews_section}
            <script src={"/_static/scripting/sort.js"}/>
            <script src={"/_static/scripting/installSortOnLoad.js"}/>
        </main>
    )
}
