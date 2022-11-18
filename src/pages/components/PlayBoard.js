import Typography from "@mui/material/Typography";
import * as React from "react";
import {LinearProgress} from "@mui/material";

export const PinField = (props) =>{
    return (
        <>
            <h4>{props.pin}</h4>
        </>
    )
}

export const Gauge = (props) => {
    return (
        <>
            {props.QuestionNum}/{props.QuestionCnt}
            <LinearProgress variant="determinate" value={props.timeprogress} />
        </>
    )
}
