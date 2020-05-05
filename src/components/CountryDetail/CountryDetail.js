import React from "react";
import {connect} from "react-redux";
import {editDetailCountry} from "redux/actions";
import getCurrentTranslation from "translation/currentTranslation";
import {Modal, Paper, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        left: '50%',
        top: '10px',
        width: '100%',
        maxWidth: 500,
        height: 'calc(100vh - 20px)',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        transform: 'translateX(-50%)',
        overflowY: 'auto'
    },
    img: {
        width: 150,
        height: 'auto'
    },
    close: {
        width: 25,
        height: 25,
        position: 'absolute',
        right: 5,
        top: 5,
        cursor: 'pointer'
    },
    modalContainer: {
        width: '100%',
        margin: 0
    }
}));

const CountryDetail = (props) => {
    const classes = useStyles();
    const checkDetailCountry = () => {
        if(props.country_data.countries !== null && props.country_data.detail_country !== '') {
            let currentDetailCountry = props.country_data.countries.filter((item)=>{
                return item['name'] === props.country_data.detail_country;
            })
            let translation = getCurrentTranslation(props.lang)
            return (
                <Modal open={true}>
                    <Paper className={classes.paper}>
                        <CloseIcon className={classes.close} onClick={()=>{props.editDetail('')}} />
                        <Grid
                            className={classes.modalContainer}
                            container
                            direction='column'
                            justify='flex-start'
                            alignitems='flex-start'
                            spacing={3}>
                            <Grid item>
                                <img className={classes.img} src={currentDetailCountry[0]['flag']} alt=""/>
                            </Grid>
                            <Grid item>
                                <p>{translation[0].translations[0]['country_name']}: {currentDetailCountry[0]['name']}</p>
                                <p>{translation[0].translations[0]['country_code']}: {currentDetailCountry[0]['alpha2Code']}</p>
                                <p>{translation[0].translations[0]['country_calling_code']}: {currentDetailCountry[0]['callingCodes']}</p>
                                <p>{translation[0].translations[0]['country_capital']}: {currentDetailCountry[0]['capital']}</p>
                                <p>{translation[0].translations[0]['country_region']}: {currentDetailCountry[0]['region']}</p>
                                <p>{translation[0].translations[0]['country_population']}: {currentDetailCountry[0]['population']}</p>
                                <p>{translation[0].translations[0]['country_currency']}: {currentDetailCountry[0]['currencies'][0]['name']} ({currentDetailCountry[0]['currencies'][0]['code']})</p>
                            </Grid>
                        </Grid>
                    </Paper>
                </Modal>
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