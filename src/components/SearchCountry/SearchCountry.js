import React, {Component} from "react";
import {connect} from "react-redux";
import getCurrentTranslation from "translation/currentTranslation";
import {countryCodesList, editSearchedData} from "redux/actions";
import CountriesList from "components/CountriesList";

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
                return <option key={item['alpha2Code']} value={item['name']}>{item['alpha2Code']}</option>
            })
            return (
                <select
                    id='country-code-select'
                    onChange={(e) => {
                        this.props.editSearchData(e.target.value);this.setState({inputValue: e.target.value})
                    }}>
                    <option disabled selected value=''>{translation[0].translations[0]['select_default']}</option>
                    {codesList}
                </select>
            )
        }
    }

    render() {
        let translation = getCurrentTranslation(this.props.lang)
        return (
            <div className='search-country_container'>
                <div className='search-country_description'>{translation[0].translations[0].before_input_mess}</div>
                <div className='search-country_wrap'>
                    <div className="input-wrap">
                        <input
                            value={this.state.inputValue}
                            onChange={(e)=>this.setState({inputValue: e.target.value})}
                            onKeyPress={(event) => {
                                if(event.key === 'Enter') {
                                    this.props.editSearchData(this.state.inputValue);
                                }
                            }}
                        />
                        <button
                            onClick={()=>{

                                document.getElementById('country-code-select').selectedIndex = -1;
                            }}>
                            {translation[0].translations[0].search}
                        </button>
                        {this.addSelect(translation)}
                    </div>
                    <div className='search-country_results'>
                        <CountriesList />
                    </div>
                </div>

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