import Grid from "@mui/material/Grid";
import {Card, CardContent} from "@mui/material";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";


const Item = styled(Paper) ({
    width: "100%",
    height: "100%",
    padding: "2px",
    verticalAlign: "middle",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
});

export const QuizQuestion = (props) => {
    return (
        <>
            <Item>
                {props.question}
            </Item>
        </>
    )
}
