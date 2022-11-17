import {Box, TextField} from "@mui/material";
import * as React from "react";
import {useDispatch} from "react-redux";

export default function QRep() {
    const dispatch = useDispatch();
    const modifyQuiz = (keytype, key, value) => {
        dispatch({type: 'MODIFY_QUIZ', payload: {keytype, key, value}})
    }
    return (
        <Box>
            <h3>정답</h3>
            <TextField
                id="qfield"
                multiline
                rows={4}
                placeholder={"답을 입력해주세요."}
            />
        </Box>
    );
}
