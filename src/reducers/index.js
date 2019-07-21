import { SET_ALL_GENRES, SET_ARTISTS, SET_CURRENT_ARTIST } from "../constants/action-types";

const initialState = {
    allGenres: {},
    score: 0,
    artists: [],
    currentArtist: null,
    currentGuesses: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === SET_ALL_GENRES) {
        return Object.assign({}, state, {
            allGenres: action.payload
        });
    }

    if (action.type === SET_ARTISTS) {
        return Object.assign({}, state, {
            artists: action.payload
        });
    }

    if (action.type === SET_CURRENT_ARTIST) {
        return Object.assign({}, state, {
            currentArtist: action.payload
        });
    }
    return state;
}

export default rootReducer;
