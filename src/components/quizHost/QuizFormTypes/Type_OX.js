import {useDispatch, useSelector} from "react-redux";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {R_modifyQuiz, R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import {Item} from "../../../layouts/LayOuts";

export const Type_OX = () => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    const handleChange = (event) => {
        dispatch(R_modifyQuizAnswer([event.target.value]));
        dispatch(R_modifyQuiz({keytype: "choiceList", key: 'num1', value: event.target.value}));
    };
    return (
        <Item sx={{place: 'center'}}>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={currentQuiz.answer[0]}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="O" control={<Radio/>} label="O"
                                      onChange={handleChange}/>
                    <FormControlLabel value="X" control={<Radio/>} label="X"
                                      onChange={handleChange}/>
                </RadioGroup>
            </FormControl>
        </Item>
    );
}
