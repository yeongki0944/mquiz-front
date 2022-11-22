import {useDispatch, useSelector} from "react-redux";
import {Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@mui/material";
import {R_modifyQuizAnswer} from "../../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import {useState} from "react";

export const Type_OX = () => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    const handleChange = (event) => {
        dispatch(R_modifyQuizAnswer(quiz.currentShow, event.target.value));
    };
    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">O/X</FormLabel>
                <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={currentQuiz.answer}
                    onChange={handleChange}
                >
                    <FormControlLabel value="O" control={<Radio/>} label="O"/>
                    <FormControlLabel value="X" control={<Radio/>} label="X"/>
                </RadioGroup>


            </FormControl>
        </>
    );
}
