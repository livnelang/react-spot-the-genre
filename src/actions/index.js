import { SET_ALL_GENRES, SET_ARTISTS, SET_CURRENT_ARTIST } from "../constants/action-types";

export function setAllGenres(payload) {
    return { type: SET_ALL_GENRES, payload };
}

export function setArtists(payload) {
    return { type: SET_ARTISTS, payload };
}

export function setCurrentArtist(payload) {
    return { type: SET_CURRENT_ARTIST, payload };
}

