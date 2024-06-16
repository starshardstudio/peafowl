import {GameTable} from "../_components/GameTable.tsx"
import { GameData } from "../_utils/game.ts";


export const layout = "base.tsx"
export const url = "/games.html"

export default function(data: Lume.Data, helpers: Lume.Helpers) {
    const intro_section = data.content ? (
        <section id={"list-games-section-intro"}>
            {data.children}
        </section>
    ) : null

    const games: GameData[] = data.search.pages("game")
                                  .sort((a, b) => (b.rating - a.rating)) as GameData[]

    const games_section = (
        <section id={"list-games-section-games"}>
            <h2>
                Videogames list
            </h2>
            <div>
                <GameTable games={games} priority={"mixed"}/>
            </div>
        </section>
    )

    return (
        <main id={"list-games-main"}>
            {intro_section}
            {games_section}
        </main>
    )
}
