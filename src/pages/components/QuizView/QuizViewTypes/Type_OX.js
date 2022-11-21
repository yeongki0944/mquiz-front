import {useDispatch} from "react-redux";
import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";

export const Type_OX = () =>{
    return (
        <div >
            <Paper>O</Paper>
            <Paper>X</Paper>
        </div>
    );
}
