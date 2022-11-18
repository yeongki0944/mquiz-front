import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import * as React from "react";
import {useDispatch} from "react-redux";
import {R_modifyQuiz, R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";

export default function QOX() {
    const dispatch = useDispatch();
    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">정답</FormLabel>
                <RadioGroup
                    row
                    aria-label="quiz"
                    name="quiz"
                    defaultValue="O"
                    onChange={(e) => {
                        dispatch(R_modifyQuizAnswer(e.target.value));
                    }}  
                >
                    <FormControlLabel value="O" control={<Radio/>} label="O"/>
                    <FormControlLabel value="X" control={<Radio/>} label="X"/>
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
