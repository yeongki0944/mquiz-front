import {Box, TextField} from "@mui/material";
import * as React from "react";
import {useDispatch} from "react-redux";
import {R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";

export default function QRep() {
    const dispatch = useDispatch();
    return (
        <Box>
            <h3>정답</h3>
            <TextField
                id="qfield"
                multiline
                rows={4}
                defaultValue={""}
                onBlur={(e) => {
                    dispatch(R_modifyQuizAnswer([e.target.value]));
                }}
            />
        </Box>
    );
}
