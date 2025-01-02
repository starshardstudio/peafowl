import { ReviewData, ReviewIdentifier, ReviewWikidataIdentifier } from "./review.ts";

export interface GameSteamIdentifier extends ReviewIdentifier {
    type: "steam";
    appid: string;
    synced_on?: string;
}

export type GameIdentifier = ReviewWikidataIdentifier | GameSteamIdentifier;

export interface GameData extends ReviewData {
    active?: boolean;

    progress?: GameProgress;
    hours_played?: number;

    purchased_on?: Date;
    started_on?: Date;
    beaten_on?: Date;
    completed_on?: Date;
    mastered_on?: Date;

    identifiers?: GameIdentifier[];
}

export type GamePage = Lume.Page<GameData>;

export enum GameProgress {
    Unset = "",
    NotApplicable = "notapplicable",
    New = "new",
    Started = "started",
    Beaten = "beaten",
    Completed = "completed",
    Mastered = "mastered",
}

export function gameProgressToIconDef(progress?: GameProgress): string {
    switch (progress) {
        case undefined:
            return "";
        case GameProgress.Unset:
            return "";
        case GameProgress.NotApplicable:
            return "fa-hexagon";
        case GameProgress.New:
            return "fa-ellipsis";
        case GameProgress.Started:
            return "fa-play";
        case GameProgress.Beaten:
            return "fa-circle";
        case GameProgress.Completed:
            return "fa-star";
        case GameProgress.Mastered:
            return "fa-heart";
    }
}

export function gameProgressToClassName(progress?: GameProgress): string {
    switch (progress) {
        case undefined:
            return "progress-unset";
        case GameProgress.Unset:
            return "progress-unset";
        case GameProgress.NotApplicable:
            return "progress-notapplicable";
        case GameProgress.New:
            return "progress-new";
        case GameProgress.Started:
            return "progress-started";
        case GameProgress.Beaten:
            return "progress-beaten";
        case GameProgress.Completed:
            return "progress-completed";
        case GameProgress.Mastered:
            return "progress-mastered";
    }
}

export function gameProgressToTitle(progress?: GameProgress): string {
    switch (progress) {
        case undefined:
            return "";
        case GameProgress.Unset:
            return "";
        case GameProgress.NotApplicable:
            return "Not applicable";
        case GameProgress.New:
            return "New";
        case GameProgress.Started:
            return "Started";
        case GameProgress.Beaten:
            return "Beaten";
        case GameProgress.Completed:
            return "Completed";
        case GameProgress.Mastered:
            return "Mastered";
    }
}

// Duplicated in _static/scripting/sort.js
export function gameProgressToNumber(progress?: GameProgress): number {
    switch (progress) {
        case undefined:
            return 0;
        case GameProgress.Unset:
            return 0;
        case GameProgress.NotApplicable:
            return 5;
        case GameProgress.New:
            return 10;
        case GameProgress.Started:
            return 20;
        case GameProgress.Beaten:
            return 30;
        case GameProgress.Completed:
            return 40;
        case GameProgress.Mastered:
            return 50;
    }
}

export function compareGameProgress(a: GameData, b: GameData): number {
    return gameProgressToNumber(a.progress) - gameProgressToNumber(b.progress);
}
