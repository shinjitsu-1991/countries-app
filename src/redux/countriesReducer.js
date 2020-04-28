import {
    COUNTRY_CODES_LIST,
    EDIT_COUNTRIES_LIST,
    EDIT_DETAIL_COUNTRY,
    EDIT_SEARCHED_DATA,
    GET_COUNTRY_CODES_LIST
} from "./types";

const initialState = {
    countries: null,
    searched_data: '',
    detail_country: '',
    countries_code_list: null
}

export const countriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_SEARCHED_DATA:
            return {...state, searched_data: action.payload}
        case EDIT_COUNTRIES_LIST:
            return {...state, countries: action.payload};
        case EDIT_DETAIL_COUNTRY:
            return {...state, detail_country: action.payload }
        case GET_COUNTRY_CODES_LIST:
            return {...state, countries_code_list: action.payload}
        case COUNTRY_CODES_LIST:
            return state;
        default:
            return state;
    }
}