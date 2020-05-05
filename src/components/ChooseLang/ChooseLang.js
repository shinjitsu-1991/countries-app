import React from "react";
import {useDispatch} from "react-redux";
import {editLang} from "redux/actions";
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list:{
        paper: {
            height: 140,
            width: 140,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "uppercase",
            fontSize: 30,
            transition: '.3s',
        }
    },
    default: {
        paper: {

        }
    }

}));

const ChooseLang = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const itemView = () => {
        if(props.view === 'list') {
            return classes.list;
        }
        return classes.default;
    }
    return (
        <div className='choose-lang_item' onClick={()=>{dispatch(editLang(props.lang))}} key={props.lang}>
            <p>{props.mess}</p>
            <Paper elevation={3} className={itemView.paper}>
                {props.lang}
            </Paper>
        </div>
    )
}

export default ChooseLang;