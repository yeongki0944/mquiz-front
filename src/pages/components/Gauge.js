import {LinearProgress} from "@mui/material";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export const Gauge = (props) => {
    return (
        <>
            <Grid container>
                <Grid>
                    {props.Qnum}/{props.TotalQcnt}
                </Grid>
                <Grid>
                    <LinearProgress variant="determinate" value={props.timeprogress} />
                </Grid>

            </Grid>
        </>
    )
}
