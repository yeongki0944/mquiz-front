import {useDispatch, useSelector} from "react-redux";
import {Box, FormControl, FormGroup, FormLabel, TextField} from "@mui/material";
import {R_modifyQuiz, R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";

export const Type_Reply = () => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    const handleChangeText = (event) => {
        const {name, value} = event.target;
        dispatch(R_modifyQuizAnswer([value]));
    };

    return (
        <div>
            <TextField
                multiline
                rows={4}
                placeholder={"질문을 입력해주세요."}
                variant="outlined"
                defaultValue={currentQuiz.answer[0]}
                onBlur={handleChangeText}
                name={"Question"}
            />
        </div>

    );
}
