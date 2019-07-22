import { SET_ARTISTS, SET_CURRENT_ARTIST, SET_SHOW_GUESS_RESULT, SET_ARTIST_COUNTER, INCREMENT_SCORE, RESET_GAME } from "../constants/action-types";
import jsonData from './genres.json';



const initialState = {
    allGenres: jsonData.genres,
    score: 0,
    artists: [],
    artistCounter: 0,
    currentArtist: null,
    currentGuesses: {},
    showGuessResult: { displayMessage: false, success: false }
};

function rootReducer(state = initialState, action) {

    if (action.type === SET_ARTISTS) {
        return Object.assign({}, state, {
            artists: action.payload
        });
    }

    if (action.type === SET_CURRENT_ARTIST) {
        return Object.assign({}, state, {
            currentArtist: state.artists[state.artistCounter]
        });
    }

    if (action.type === SET_SHOW_GUESS_RESULT) {
        return Object.assign({}, state, {
            showGuessResult: action.payload
        });
    }

    if (action.type === SET_ARTIST_COUNTER) {
        return Object.assign({}, state, {
            artistCounter: state.artistCounter + 1
        });
    }
    if (action.type === INCREMENT_SCORE) {
        return Object.assign({}, state, {
            score: state.score + 1
        });
    }
    if (action.type === RESET_GAME) {
        return Object.assign({}, state, {
            score: 0,
            artistCounter: 0,
            showGuessResult: { displayMessage: false, success: false }
        });
    }

    return state;
}

export default rootReducer;
