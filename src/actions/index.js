import { SET_ARTISTS, SET_CURRENT_ARTIST } from "../constants/action-types";

export function setArtists(payload) {
    return { type: SET_ARTISTS, payload };
}

export function setCurrentArtist(payload) {
    return { type: SET_CURRENT_ARTIST, payload };
}

