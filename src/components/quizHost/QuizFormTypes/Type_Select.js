import {useDispatch, useSelector} from "react-redux";
import {R_modifyQuiz, R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import {useEffect} from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material";
import * as React from "react";

export const Type_Select = () => {
    const dispatch = useDispatch();

    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    //answer is an array type
    const answer = currentQuiz.answer;

    const handleChangeChk = (event) => {
        const {name, checked} = event.target;
        if (checked) {
            dispatch(R_modifyQuizAnswer(answer.concat(name)));
        } else {
            dispatch(R_modifyQuizAnswer(answer.filter(item => item !== name)));
        }
    };

    const handleChangeText = (event) => {
        const {name, value} = event.target;
        dispatch(R_modifyQuiz({keytype: "choiceList", key: name, value: value}));
    };

    return (
        <FormControl component="fieldset">
            <FormGroup>
                {Object.keys(currentQuiz.choiceList).map((item, index) => {
                    return (
                        <div key={index}>
                            <FormControlLabel
                                control={<Checkbox checked={answer.includes(item)} onChange={handleChangeChk}
                                                   name={item}/>}
                            />
                            <TextField
                                variant="outlined"
                                defaultValue={currentQuiz.choiceList[item]}
                                placeholder={"답을 입력해주세요."}
                                onBlur={handleChangeText}
                                name={item}
                            />
                        </div>
                    )
                })}
            </FormGroup>
        </FormControl>
    )
}
