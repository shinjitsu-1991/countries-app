import {takeEvery, put, call} from 'redux-saga/effects';
import {
    APP_LANG,
    COUNTRY_CODES_LIST,
    EDIT_APP_LANG,
    EDIT_COUNTRIES_LIST,
    EDIT_SEARCHED_DATA, EDIT_SPINNER_STATE,
    GET_COUNTRY_CODES_LIST
} from "./types";

export function* sagaWatcher() {
    yield takeEvery(APP_LANG, editAppLang)
    yield takeEvery(EDIT_SEARCHED_DATA, editSearched)
    yield takeEvery(COUNTRY_CODES_LIST, editCodesList)
}

function* editAppLang(action) {
    if(window.localStorage.getItem('country_app_lang') !== action.payload) {
        window.localStorage.setItem('country_app_lang', action.payload)
    }
    yield put({type: EDIT_APP_LANG, payload: action.payload})
}

function* editSearched(action) {
    yield put({type:EDIT_SPINNER_STATE, payload: true})
    let historyStorage = window.localStorage.getItem('countries_history_storage');
    if(historyStorage && JSON.parse(historyStorage)[action.payload]){
        yield put({type:EDIT_COUNTRIES_LIST, payload: JSON.parse(historyStorage)[action.payload]})
    } else {
        let allData = [];
        if (/\D/.test(action.payload)) {
            const dataByFullName = yield call(getCountriesData, `https://restcountries.eu/rest/v2/name/${action.payload}?fullText=true`),
                dataByShortName = yield call(getCountriesData, `https://restcountries.eu/rest/v2/alpha/${action.payload}`),
                dataByCurrency = yield call(getCountriesData, `https://restcountries.eu/rest/v2/currency/${action.payload}`);
            [dataByFullName,dataByShortName,dataByCurrency].forEach((item) => {
                if(Array.isArray(item)) {
                    item.forEach((innerItem) => {
                        allData.push(innerItem);
                    })
                } else {
                    allData.push(item);
                }
            })
        } else {
            const dataByCallingCode = yield call(getCountriesData, `https://restcountries.eu/rest/v2/callingcode/${action.payload}`);
            if(Array.isArray(dataByCallingCode)) {
                dataByCallingCode.forEach((innerItem) => {
                    allData.push(innerItem);
                })
            } else {
                allData.push(dataByCallingCode);
            }
        }
        let used = {};
        let allDataFiltered = allData.filter((obj) => {
            return obj.name in used ? 0:(used[obj.name]=1);
        });
        yield put({type:EDIT_COUNTRIES_LIST, payload: allDataFiltered})
        editHistoryStorage(action.payload, allDataFiltered)
    }
    yield put({type:EDIT_SPINNER_STATE, payload: false})
}

async function getCountriesData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            return [];
        }
    } catch (e) {
        console.log(e)
    }
}

function editHistoryStorage(request,val) {
    let currentStorage = window.localStorage.getItem('countries_history_storage');
    if(!currentStorage) {
        let newRequest = {};
        newRequest[request] = val;
        window.localStorage.setItem('countries_history_storage', JSON.stringify(newRequest));
    } else {
        let parsedStorage = JSON.parse(currentStorage);
        if(!parsedStorage[request]) {
            parsedStorage[request] = val;
            window.localStorage.setItem('countries_history_storage', JSON.stringify(parsedStorage));
        }
    }
}

function* editCodesList() {
    const data = yield call(getCountriesData, 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code')
    yield put({type:GET_COUNTRY_CODES_LIST, payload: data})
}