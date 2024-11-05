import { AnimeTable } from "../_components/AnimeTable.tsx";
import { AnimeData } from "../_utils/anime.ts";

export const layout = "base.tsx";
export const url = "/anime.html";

export default function (data: Lume.Data, helpers: Lume.Helpers) {
    const introSection = data.content
        ? (
            <section id={"list-anime-section-intro"}>
                {data.children}
            </section>
        )
        : null;

    const anime: AnimeData[] = data.search.pages("anime");

    const animeSection = (
        <section id={"list-anime-section-games"}>
            <h2>
                Anime list
                <small>
                    <a href={helpers.url("/anime/feed.rss")}>
                        <i className={"fa-sharp fa-solid fa-rss"} /> Feed
                    </a>
                </small>
                <small>
                    <a href={helpers.url("/anime/index.json")}>
                        <i className={"fa-sharp fa-solid fa-brackets-curly"} />
                        {" "}
                        JSON
                    </a>
                </small>
            </h2>
            <div>
                <AnimeTable
                    id={"list-anime-table"}
                    anime={anime}
                    priority={"mixed"}
                />
            </div>
        </section>
    );

    return (
        <main id={"list-anime-main"}>
            {introSection}
            {animeSection}
            <script src={"/_static/scripting/sort.js"} />
            <script src={"/_static/scripting/installSortOnLoad.js"} />
        </main>
    );
}
