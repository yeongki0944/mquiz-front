import {useDispatch, useSelector} from "react-redux";
import {Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@mui/material";
import {R_modifyQuiz, R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import {useState} from "react";

export const Type_OX = () => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    const handleChange = (event) => {
        dispatch(R_modifyQuizAnswer([event.target.value]));
    };
    return (
        <div>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={currentQuiz.answer[0]}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="O" control={<Radio />} label="O"
                                      onChange={handleChange}/>
                    <FormControlLabel value="X" control={<Radio />} label="X"
                                        onChange={handleChange}/>
                </RadioGroup>
            </FormControl>
        </div>
    );
}
