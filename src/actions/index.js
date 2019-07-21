import { SET_ARTISTS, SET_CURRENT_ARTIST, SET_SHOW_GUESS_RESULT, SET_ARTIST_COUNTER } from "../constants/action-types";

export function setArtists(payload) {
    return { type: SET_ARTISTS, payload };
}

export function setCurrentArtist(payload) {
    return { type: SET_CURRENT_ARTIST, payload };
}

export function setShowGuessResult(payload) {
    return { type: SET_SHOW_GUESS_RESULT, payload };
}

export function setArtistCounter(payload) {
    return { type: SET_ARTIST_COUNTER, payload };
}