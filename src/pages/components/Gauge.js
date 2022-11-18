import {Box, LinearProgress} from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {ProgressBar} from "react-bootstrap";



const makeStyle = makeStyles({
    root:{
        width: '100%',
        alignItems: 'center',
    },
    progress: {
        borderRadius: 10,
        height: 20,
    },
});

/**
 * props:
 *  - Qnum: 현재 문제 번호
 *  - TotalQcnt: 총 문제 수
 *  - timeprogress: 시간 진행률(1~100)
 *  - timeleft: 남은 시간
 */
export const Gauge = (props) => {
    const classes = makeStyle();
    return (
        <Box className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={0.5}>
                    {props.Qnum}/{props.TotalQcnt}
                </Grid>
                <Grid item xs={11}>
                    <ProgressBar animated now={props.timeprogress} />
                </Grid>
                <Grid item xs={0.5}>
                    {props.timeleft}
                </Grid>
            </Grid>
        </Box>
    )
}
