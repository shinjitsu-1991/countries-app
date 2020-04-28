import {APP_LANG, EDIT_APP_LANG, EDIT_SPINNER_STATE} from "./types";

const initialState = {
    lang: null,
    spinner: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_LANG:
            return state;
        case EDIT_APP_LANG:
            return { ...state, lang: action.payload}
        case EDIT_SPINNER_STATE:
            return {...state, spinner: action.payload}
        default:
            return state;
    }
}