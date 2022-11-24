import {useDispatch} from "react-redux";
import {Box, TextField} from "@mui/material";
import {R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";

export const Type_Reply = () =>{
    return (
        <div>
            <TextField></TextField>
        </div>
    );
}
