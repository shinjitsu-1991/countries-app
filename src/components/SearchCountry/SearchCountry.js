import React, {Component} from "react";
import {connect} from "react-redux";
import getCurrentTranslation from "translation/currentTranslation";
import {countryCodesList, editSearchedData} from "redux/actions";
import CountriesList from "components/CountriesList";
import {TextField, Button, Select, MenuItem, Grid} from '@material-ui/core';

class SearchCountry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    componentDidMount() {
        this.props.addCountriesCodes();
    }

    addSelect(translation) {
        if(this.props.country_code_list !== null) {
            let codesList = this.props.country_code_list.map((item) => {
                return <MenuItem key={item['alpha2Code']} value={item['name']}>{item['alpha2Code']}</MenuItem>
            })
            return (
                <Select
                    labelId="country-code-label"
                    id='country-code-select'
                    onChange={(e) => {
                        this.props.editSearchData(e.target.value);this.setState({inputValue: e.target.value})
                    }}
                    value="">
                    {codesList}
                </Select>
            )
        }
    }

    render() {

        let translation = getCurrentTranslation(this.props.lang)
        return (
            <div className='search-country_container'>
                <div className='search-country_description'>{translation[0].translations[0].before_input_mess}</div>
                <Grid container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={4}>
                    <Grid item xs={12} container spacing={2}>
                        <Grid item>
                            <TextField
                                value={this.state.inputValue}
                                onChange={(e)=>this.setState({inputValue: e.target.value})}
                                onKeyPress={(event) => {
                                    if(event.key === 'Enter') {
                                        this.props.editSearchData(this.state.inputValue);
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={()=>{
                                    this.props.editSearchData(this.state.inputValue);
                                    document.getElementById('country-code-select').selectedIndex = -1;
                                }}>
                                {translation[0].translations[0].search}
                            </Button>
                        </Grid>
                        <Grid item>
                            {this.addSelect(translation)}
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        <CountriesList />
                    </Grid>

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        country_data: state.countries.searched_data,
        country_code_list: state.countries.countries_code_list,
        lang: state.app.lang,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editSearchData: (data) => dispatch(editSearchedData(data)),
        addCountriesCodes : () => dispatch(countryCodesList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCountry);