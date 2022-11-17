import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import * as React from "react";
import {useDispatch} from "react-redux";

export default function QOX() {
    const dispatch = useDispatch();
    const modifyQuiz = (keytype, key, value) => {
        dispatch({type: 'MODIFY_QUIZ', payload: {keytype, key, value}})
    }
    return (
        <Box>
            <h3>정답</h3>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Answer</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="O" control={<Radio/>} label="O"/>
                    <FormControlLabel value="X" control={<Radio/>} label="X"/>
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
