import React from "react";
import { connect } from "react-redux";
import ChooseLang from "components/ChooseLang";
import {editLang} from "redux/actions";
import { lang } from "translation/translations";
import SearchCountry from "components/SearchCountry";
import CountryDetail from "components/CountryDetail";
import 'App.sass';
import SearchCountriesHeader from "components/SearchCountriesHeader";

const App = (props) => {
    const checkLang = () => {
        let savedLang = window.localStorage.getItem('country_app_lang');
        if(!savedLang && props.lang === null) {
            return (
                <div className='choose-lang_container'>
                    {lang.map((item) => {
                        return <ChooseLang key={item["lang"]} lang={item["lang"]} mess={item["translations"][0]["entry_mess"]} />
                    })}
                </div>
            )
        } else if(savedLang && props.lang === null) {
            props.editLang(savedLang);
        } else {
            return (
                <div className={isDetail()}>
                    <SearchCountriesHeader />
                    <SearchCountry />
                    <CountryDetail />
                </div>
            )
        }
    }

    const isDetail = () => {
        if(props.detail !== ''){
            return 'no-scroll'
        }
    }

    return(
        <div className="countries-main-container">
            {checkLang()}
        </div>

    )
}

const mapStateToProps = state => {
    return {
        lang: state.app.lang,
        detail: state.countries.detail_country
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editLang: (lang) => dispatch(editLang(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);