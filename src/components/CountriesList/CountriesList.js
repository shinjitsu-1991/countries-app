import React from "react";
import {editSearchedData} from "redux/actions";
import {connect} from "react-redux";
import getCurrentTranslation from "translation/currentTranslation";
import CountriesItem from "components/CountriesItem";
import Spinner from "components/Spinner";
import {Grid} from "@material-ui/core";

const CountriesList = (props) => {
    const translation = getCurrentTranslation(props.lang);
    const returnedElements = () => {
        if(props.spinner) {
            return <Spinner />
        }
        if(props.country_data.searched_data !== '' && props.country_data.countries !== null && props.country_data.countries.length > 0) {
            let counter = 1;
            return props.country_data.countries.map((item) => {
                return <CountriesItem key={counter++} img={item['flag']} name={item['name']} code={item['alpha2Code']} callCode={item['callingCodes'][0]} currency={item['currencies'][0]['name']}/>
            })
        } else if(props.country_data.searched_data !== '' && props.country_data.countries !== null && props.country_data.countries.length < 1) {
            return translation[0].translations[0]['no_result'];
        } else {
            return '';
        }
    }

    return (
        <Grid
            container spacing={3}>
            {returnedElements()}
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        country_data: state.countries,
        lang: state.app.lang,
        spinner: state.app.spinner,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editSearchData: (data) => dispatch(editSearchedData(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountriesList);