import {
    APP_LANG,
    COUNTRY_CODES_LIST,
    EDIT_COUNTRIES_LIST,
    EDIT_DETAIL_COUNTRY,
    EDIT_SEARCHED_DATA, EDIT_SPINNER_STATE,
    GET_COUNTRY_CODES_LIST
} from "./types";


export function editLang(lang) {
    return {
        type: APP_LANG,
        payload: lang
    }
}

export function editSearchedData(data) {
    return {
        type: EDIT_SEARCHED_DATA,
        payload: data
    }
}

export function editCountriesList(data) {
    return {
        type: EDIT_COUNTRIES_LIST,
        payload: data
    }
}

export function editDetailCountry(data) {
    return {
        type: EDIT_DETAIL_COUNTRY,
        payload: data
    }
}

export function getCountryCodesList(data) {
    return {
        type: GET_COUNTRY_CODES_LIST,
        payload: data
    }
}

export function countryCodesList() {
    return {
        type: COUNTRY_CODES_LIST
    }
}

export function editSpinnerState(state) {
    return {
        type: EDIT_SPINNER_STATE,
        payload: state
    }
}