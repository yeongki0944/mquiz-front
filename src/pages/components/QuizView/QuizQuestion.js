import Grid from "@mui/material/Grid";
import {Card, CardContent} from "@mui/material";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        width: "100%",
        height: "100%",
        padding: theme.spacing(2),
        verticalAlign: "middle",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
    },
    item: {
        width: "100%",
        height: "100%",
        padding: theme.spacing(2),
        verticalAlign: "middle",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
    },
}));

export const QuizQuestion = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Paper className={classes.item}>
                {props.question}
            </Paper>
        </div>
    )
}
