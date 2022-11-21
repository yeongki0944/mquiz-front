import {makeStyles} from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {VolumeControlButton} from "../components/VolumeControlButton";


const useStyles = makeStyles((theme) => ({
    content:{
        height:'100vh',
        overflowX:'hidden',
        overflowY:'hidden',
    },
    container: {
        // height: '100vh',
        // padding: theme.spacing(3),
    },
    components: {
        textAlign:"right"
        // padding: theme.spacing(2),
        // border: '1px solid #e0e0e0',
    },
}));

export default function ComponentTest(){
    const classes = useStyles();

    return(
        <div className={classes.content}>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={10}></Grid>
                <Grid item xs={2} className={classes.components}>

                    <VolumeControlButton/>
                </Grid>
            </Grid>
        </div>
    )
}
