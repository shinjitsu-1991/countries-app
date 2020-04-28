import React from "react";
import {connect} from "react-redux";
import {editDetailCountry} from "redux/actions";
import getCurrentTranslation from "translation/currentTranslation";

const CountryDetail = (props) => {
    const checkDetailCountry = () => {
        if(props.country_data.countries !== null && props.country_data.detail_country !== '') {
            let currentDetailCountry = props.country_data.countries.filter((item)=>{
                return item['name'] === props.country_data.detail_country;
            })
            let translation = getCurrentTranslation(props.lang)
            return (
                <div className="detail-country">
                    <div className="detail-country-wrap">
                        <div onClick={()=>{props.editDetail('')}} className="detail-country-close">&#10006;</div>
                        <div className="detail-country-info">
                            <img src={currentDetailCountry[0]['flag']} alt=""/>
                            <p>{translation[0].translations[0]['country_name']}: {currentDetailCountry[0]['name']}</p>
                            <p>{translation[0].translations[0]['country_code']}: {currentDetailCountry[0]['alpha2Code']}</p>
                            <p>{translation[0].translations[0]['country_calling_code']}: {currentDetailCountry[0]['callingCodes']}</p>
                            <p>{translation[0].translations[0]['country_capital']}: {currentDetailCountry[0]['capital']}</p>
                            <p>{translation[0].translations[0]['country_region']}: {currentDetailCountry[0]['region']}</p>
                            <p>{translation[0].translations[0]['country_population']}: {currentDetailCountry['population']}</p>
                            <p>{translation[0].translations[0]['country_currency']}: {currentDetailCountry[0]['currencies'][0]['name']} ({currentDetailCountry[0]['currencies'][0]['code']})</p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <>{checkDetailCountry()}</>
    );
}

const mapStateToProps = state => {
    return {
        country_data: state.countries,
        lang: state.app.lang,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editDetail: (data) => dispatch(editDetailCountry(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);