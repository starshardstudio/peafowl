import { ReviewData, ReviewIdentifier, ReviewWikidataIdentifier } from "./review.ts";

export interface AnimeAnidbIdentifier extends ReviewIdentifier {
    type: "anidb";
    aid: string;
}

export interface AnimeMalIdentifier extends ReviewIdentifier {
    type: "mal";
    id: string;
}

export interface AnimeAnnIdentifier extends ReviewIdentifier {
    type: "ann";
    id: string;
}

export interface AnimeAnilistIdentifier extends ReviewIdentifier {
    type: "anilist";
    id: string;
}

export type AnimeIdentifier = ReviewWikidataIdentifier | AnimeAnidbIdentifier | AnimeMalIdentifier | AnimeAnnIdentifier | AnimeAnilistIdentifier;

export interface AnimeData extends ReviewData {
    name_original: string;

    active?: boolean;

    progress?: AnimeProgress;

    started_on?: Date;
    completed_on?: Date;
    mastered_on?: Date;
}

export type AnimePage = Lume.Page<AnimeData>;

export enum AnimeProgress {
    Unset = "",
    New = "new",
    Started = "started",
    Completed = "completed",
    Mastered = "mastered",
}

export function animeProgressToIconDef(progress?: AnimeProgress): string {
    switch (progress) {
        case undefined:
            return "";
        case AnimeProgress.Unset:
            return "";
        case AnimeProgress.New:
            return "fa-ellipsis";
        case AnimeProgress.Started:
            return "fa-play";
        case AnimeProgress.Completed:
            return "fa-star";
        case AnimeProgress.Mastered:
            return "fa-heart";
    }
}

export function animeProgressToClassName(progress?: AnimeProgress): string {
    switch (progress) {
        case undefined:
            return "progress-unset";
        case AnimeProgress.Unset:
            return "progress-unset";
        case AnimeProgress.New:
            return "progress-new";
        case AnimeProgress.Started:
            return "progress-started";
        case AnimeProgress.Completed:
            return "progress-completed";
        case AnimeProgress.Mastered:
            return "progress-mastered";
    }
}

export function animeProgressToTitle(progress?: AnimeProgress): string {
    switch (progress) {
        case undefined:
            return "";
        case AnimeProgress.Unset:
            return "";
        case AnimeProgress.New:
            return "New";
        case AnimeProgress.Started:
            return "Started";
        case AnimeProgress.Completed:
            return "Completed";
        case AnimeProgress.Mastered:
            return "Mastered";
    }
}

// Duplicated in _static/scripting/sort.js
export function animeProgressToNumber(progress?: AnimeProgress): number {
    switch (progress) {
        case undefined:
            return 0;
        case AnimeProgress.Unset:
            return 0;
        case AnimeProgress.New:
            return 10;
        case AnimeProgress.Started:
            return 20;
        case AnimeProgress.Completed:
            return 35;
        case AnimeProgress.Mastered:
            return 50;
    }
}

export function compareAnimeProgress(a: AnimeData, b: AnimeData): number {
    return animeProgressToNumber(a.progress) - animeProgressToNumber(b.progress);
}
