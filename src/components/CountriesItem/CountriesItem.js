import React from "react";
import {connect} from 'react-redux'
import {editDetailCountry} from "redux/actions";

const CountriesItem = (props) => {
    return (
        <div className='countries-item' onClick={()=>props.editDetail(props.name)}>
            <img src={props.img} alt=""/>
            <div className='countries-item_description'>
                <p><strong>{props.name}</strong></p>
                <p><strong>{props.code}</strong></p>
                <p><strong>{props.callCode}</strong></p>
                <p><strong>{props.currency}</strong></p>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        editDetail: (data) => dispatch(editDetailCountry(data))
    }
}

export default connect(null, mapDispatchToProps)(CountriesItem);