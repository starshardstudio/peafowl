import { compareDate } from "../_utils/date.ts";
import { GameData } from "../_utils/game.ts";
import { GameTable } from "../_components/GameTable.tsx";
import { compareGameProgress } from "../_utils/game.ts";
import { GlobalData } from "../_utils/site.ts";
import { AnimeTable } from "../_components/AnimeTable.tsx";
import { AnimeData } from "../_utils/anime.ts";

export const layout = "base.tsx";

export default function (data: GlobalData, helpers: Lume.Helpers) {
    const intro_section = data.content
        ? (
            <section id={"index-section-intro"}>
                {data.children}
            </section>
        )
        : null;

    const games: GameData[] = data.search.pages("game");

    const active_games = games
        .filter((game) => game.active)
        .sort(compareDate as any);

    const active_games_section = (
        <section id={"index-section-games-active"} className={"flex flex-v"}>
            <h3>
                Now playing
            </h3>
            <div>
                <GameTable
                    games={active_games}
                    columns={["progress", "name", "hoursplayed", "date"]}
                    priority={"progress"}
                />
            </div>
        </section>
    );

    const top_games = games
        .sort((a, b) => ((b.rating ?? 0) - (a.rating ?? 0)))
        .slice(0, 10);

    const top_games_section = (
        <section id={"index-section-games-top"} className={"flex flex-v"}>
            <h3>
                Top games
            </h3>
            <div>
                <GameTable
                    games={top_games}
                    columns={["rating", "name", "hascontent"]}
                    priority={"rating"}
                />
            </div>
        </section>
    );

    const played_games = games
        .sort((a, b) => ((b.hours_played ?? 0) - (a.hours_played ?? 0)))
        .slice(0, 10);

    const played_games_section = (
        <section id={"index-section-games-top"} className={"flex flex-v"}>
            <h3>
                Most played games
            </h3>
            <div>
                <GameTable
                    games={played_games}
                    columns={["hoursplayed", "name"]}
                />
            </div>
        </section>
    );

    const progress_games = games
        .sort((a, b) => -compareGameProgress(a, b))
        .slice(0, 10);

    const progress_games_section = (
        <section id={"index-section-games-top"} className={"flex flex-v"}>
            <h3>
                Most progressed games
            </h3>
            <div>
                <GameTable
                    games={progress_games}
                    columns={["progress", "name", "hoursplayed"]}
                    priority={"progress"}
                />
            </div>
        </section>
    );

    const latest_games = games
        .sort((a, b) => -compareDate(a, b))
        .slice(0, 10);

    const latest_games_section = (
        <section id={"index-section-games-latest"} className={"flex flex-v"}>
            <h3>
                Latest updates
            </h3>
            <div>
                <GameTable
                    games={latest_games}
                    columns={["hascontent", "name", "date"]}
                />
            </div>
        </section>
    );

    const games_cols = (
            games.length > 0
        )
        ? (
            <section className={"flex flex-v"}>
                <h2>
                    Videogames
                    <small>
                        <a href={helpers.url("~/list-games.md")}>
                            <i
                                className={"fa-sharp fa-solid fa-magnifying-glass"}
                            />{" "}
                            View all
                        </a>
                    </small>
                </h2>
                {active_games.length > 0 && (
                    <div className={"flex flex-1"}>
                        {active_games_section}
                    </div>
                )}
                <div className={"flex flex-2"}>
                    {top_games_section}
                    {progress_games_section}
                </div>
                <div className={"flex flex-2"}>
                    {played_games_section}
                    {latest_games_section}
                </div>
            </section>
        )
        : null;

    const anime: AnimeData[] = data.search.pages("anime");

    const active_anime = anime
        .filter((ani) => ani.active)
        .sort(compareDate as any);

    const active_anime_section = (
        <section id={"index-section-anime-active"} className={"flex flex-v"}>
            <h3>
                Now playing
            </h3>
            <div>
                <AnimeTable
                    anime={active_anime}
                    columns={["progress", "name", "date"]}
                    priority={"progress"}
                />
            </div>
        </section>
    );

    const top_anime = anime
        .sort((a, b) => ((b.rating ?? 0) - (a.rating ?? 0)))
        .slice(0, 10);

    const top_anime_section = (
        <section id={"index-section-anime-top"} className={"flex flex-v"}>
            <h3>
                Top anime
            </h3>
            <div>
                <AnimeTable
                    anime={top_anime}
                    columns={["rating", "name", "hascontent"]}
                    priority={"rating"}
                />
            </div>
        </section>
    );

    const latest_anime = anime
        .sort((a, b) => -compareDate(a, b))
        .slice(0, 10);

    const latest_anime_section = (
        <section id={"index-section-anime-latest"} className={"flex flex-v"}>
            <h3>
                Latest updates
            </h3>
            <div>
                <AnimeTable
                    anime={latest_anime}
                    columns={["hascontent", "name", "date"]}
                />
            </div>
        </section>
    );

    const anime_cols = (
            anime.length > 0
        )
        ? (
            <section className={"flex flex-v"}>
                <h2>
                    Anime
                    <small>
                        <a href={helpers.url("~/list-anime.md")}>
                            <i
                                className={"fa-sharp fa-solid fa-magnifying-glass"}
                            />{" "}
                            View all
                        </a>
                    </small>
                </h2>
                {active_anime.length > 0 && (
                    <div className={"flex flex-1"}>
                        {active_anime_section}
                    </div>
                )}
                <div className={"flex flex-2"}>
                    {top_anime_section}
                    {latest_anime_section}
                </div>
            </section>
        )
        : null;    

    return (
        <main id={"index-main"} className={"flex flex-v"}>
            {intro_section}
            {games_cols}
        </main>
    );
}
