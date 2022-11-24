import {useDispatch, useSelector} from "react-redux";
import {Box, FormControl, FormGroup, FormLabel, TextField} from "@mui/material";
import {R_modifyQuiz, R_modifyQuizAnswer} from "../../../../redux/reducers/quizInfoReducer";
import * as React from "react";

export const Type_Reply = () => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    const handleChangeText = (event) => {
        const {name, value} = event.target;
        dispatch(R_modifyQuizAnswer(value));
        console.log(value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">정답</FormLabel>
            <FormGroup>
                <TextField
                    multiline
                    rows={4}
                    placeholder={"정답을 입력하세요."}
                    variant="outlined"
                    defaultValue={currentQuiz.answer["1"]}
                    onBlur={handleChangeText}
                    name={"1"}
                />
            </FormGroup>
        </FormControl>

    );
}
