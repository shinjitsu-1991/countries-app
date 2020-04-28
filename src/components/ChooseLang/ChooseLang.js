import React from "react";
import {useDispatch} from "react-redux";
import {editLang} from "redux/actions";

const ChooseLang = (props) => {
    const dispatch = useDispatch();
    return (
        <div className='choose-lang_item' onClick={()=>{dispatch(editLang(props.lang))}} key={props.lang}>
            <p>{props.mess}</p>
            <div className='choose-lang_code'>
                {props.lang}
            </div>
        </div>
    )
}

export default ChooseLang;