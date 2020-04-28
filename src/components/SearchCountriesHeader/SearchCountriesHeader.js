import React from "react";
import {connect} from "react-redux";
import {lang} from "translation/translations";
import ChooseLang from "components/ChooseLang";

const SearchCountriesHeader = (props) => {
    const addHeader = () => {
        let countriesList = lang.map((item) => {
            return <ChooseLang key={item["lang"]} lang={item["lang"]} />
        })
        return (
            <div className="countries-header">
                <div className="countries-lang-switcher">
                    {props.lang}
                    <div className="countries-lang-dropdown">
                        {countriesList}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <>{addHeader()}</>
    );
}

const mapStateToProps = state => {
    return {
        lang: state.app.lang,
    };
};

export default connect(mapStateToProps, null)(SearchCountriesHeader);