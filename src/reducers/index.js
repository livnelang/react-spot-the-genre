import { SET_ARTISTS, SET_CURRENT_ARTIST } from "../constants/action-types";
import jsonData from './genres.json';



const initialState = {
    allGenres: jsonData.genres,
    score: 0,
    artists: [],
    currentArtist: null,
    currentGuesses: {}
};

function rootReducer(state = initialState, action) {

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
