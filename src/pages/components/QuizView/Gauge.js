import {Box, LinearProgress} from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {ProgressBar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        width: "100%",
        height: "100%",
        padding: theme.spacing(2),
        textAlign: "center",
        // verticalAlign: "middle",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // margin: "auto",
    },
    item: {
        width: "10%",
        padding: theme.spacing(2),
        verticalAlign: "middle",
        alignItems: "center",
        justifyContent: "center",
    },
    progress: {
        width: "90%",
        padding: theme.spacing(2),
    },
}));

/**
 * props:
 *  - Qnum: 현재 문제 번호
 *  - TotalQcnt: 총 문제 수
 *  - timeprogress: 시간 진행률(1~100)
 *  - timeleft: 남은 시간
 */
export const Gauge = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <div>
                문제 {props.Qnum} / {props.TotalQcnt}
            </div>
            <div>
                <ProgressBar animated now={props.timeprogress} label={props.timeleft}/>
            </div>
        </div>
    )
}

