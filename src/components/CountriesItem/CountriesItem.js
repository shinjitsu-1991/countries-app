import React from "react";
import {connect} from 'react-redux'
import {editDetailCountry} from "redux/actions";
import {Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
    },
    img: {
        width: 120,
        height: 'auto'
    },
    paper: {
        height: 'auto',
        padding: theme.spacing(2),
        cursor: "pointer"
    },
    listItem : {
        width: '100%',
        margin: 0
    }

}))

const CountriesItem = (props) => {
    const classes = useStyles();
    return (
        <Grid className={classes.listItem} item xs={12} onClick={()=>props.editDetail(props.name)}>
            <Paper className={classes.paper}>
                <Grid
                    className={classes.container}
                    container
                    spacing={2}
                    direction='row'
                    justify='flex-start'
                    alignItems='center'>
                    <Grid item>
                        <img className={classes.img} src={props.img} alt=""/>
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction='column'
                            justify='flex-start'
                            alignItems='flex-start'
                        >
                            <Typography variant="body2">{props.name}</Typography>
                            <Typography variant="body2">{props.code}</Typography>
                            <Typography variant="body2">{props.callCode}</Typography>
                            <Typography variant="body2">{props.currency}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        editDetail: (data) => dispatch(editDetailCountry(data))
    }
}

export default connect(null, mapDispatchToProps)(CountriesItem);