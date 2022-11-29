import {useDispatch, useSelector} from "react-redux";
import {Box, TextField} from "@mui/material";
import {R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const Type_Reply = () => {
    const dispatch = useDispatch();
    const quizPlay = useSelector(state => state.quizPlay);

    if(TextField.valueOf() !== null || TextField.valueOf() !=="") {
        return (
            <div>
                <TextFiel></TextFiel>
                <Typography variant="h5" component="div" align='center'>
                    {/*<Button type="submit" variant="contained">참여확인</Button>*/}
                    <Button variant="contained" onClick={() => {
                    }}>정답제출</Button>
                </Typography>
            </div>
        );
    }
        return (
            <div>
                <TextField></TextField>
            </div>
        );
    }

