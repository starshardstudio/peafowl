import {Progress} from "./progress.ts"
import {ReviewData} from "./review.ts"


export interface GameBaseIdentifier {
    platform: string,
    synced_on?: string,
}

export interface GameSteamIdentifier extends GameBaseIdentifier {
    platform: "steam",
    appid: string,
    name?: string,
}

export type GameIdentifier = GameSteamIdentifier;

export interface GameData extends ReviewData {
    active?: boolean,

    progress?: Progress,
    hours_played?: number

    purchased_on?: Date,
    started_on?: Date,
    beaten_on?: Date,
    completed_on?: Date,
    mastered_on?: Date,

    identifiers?: GameIdentifier[]
}

export type GamePage = Lume.Page<GameData>
