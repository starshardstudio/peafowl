export type Rating = number

export function ratingToIconDef(rating?: Rating): string {
    if(rating === undefined) {
        return "fa-face-meh-blank"
    }
    else if(rating == 0) {
        return "fa-face-meh-blank"
    }
    else if(rating < 35) {
        return "fa-face-frown"
    }
    else if(rating < 65) {
        return "fa-face-meh"
    }
    else if(rating < 95) {
        return "fa-face-smile"
    }
    else {
        return "fa-face-grin-stars"
    }
}

export function ratingToClassName(rating?: Rating): string {
    if(rating === undefined) {
        return "rating-unset"
    }
    else if(rating === 0) {
        return "rating-unset"
    }
    else if(rating < 35) {
        return "rating-bad"
    }
    else if(rating < 65) {
        return "rating-mixed"
    }
    else if(rating < 95) {
        return "rating-good"
    }
    else {
        return "rating-perfect"
    }
}
