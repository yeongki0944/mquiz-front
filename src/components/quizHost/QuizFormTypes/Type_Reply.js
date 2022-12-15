import {useDispatch, useSelector} from "react-redux";
import {TextField} from "@mui/material";
import {R_modifyQuiz, R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import {Item} from "../../../LayOuts/LayOuts";

export const Type_Reply = () => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    const handleChangeText = (event) => {
        const {name, value} = event.target;
        dispatch(R_modifyQuizAnswer([value]));
        dispatch(R_modifyQuiz({keytype: "choiceList", key: 'num1', value: event.target.value}));
    };

    return (
        <Item sx={{place:'center'}}>
            <TextField
                multiline
                rows={4}
                placeholder={"질문을 입력해주세요."}
                variant="outlined"
                defaultValue={currentQuiz.answer[0]}
                onBlur={handleChangeText}
                name={"Question"}
            />
        </Item>
        // <div>
        //     <TextField
        //         multiline
        //         rows={4}
        //         placeholder={"질문을 입력해주세요."}
        //         variant="outlined"
        //         defaultValue={currentQuiz.answer[0]}
        //         onBlur={handleChangeText}
        //         name={"Question"}
        //     />
        // </div>

    );
}
