import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useSelector} from "react-redux";
import './QuizTypes.css';



export const Type_Select = () => {
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    return (
        <div id={"content"}>
            <div class={"answers"}elevation={2}>{currentQuiz.choiceList["1"]}</div>
            <div class={"answers"}elevation={2}>{currentQuiz.choiceList["2"]}</div>
            {/*2번까지는 빈값도 표시*/}
            {currentQuiz.choiceList["3"]==="" ? null : <div class={"answers"}elevation={2}>{currentQuiz.choiceList["3"]}</div>}
            {currentQuiz.choiceList["4"]==="" ? null : <div class={"answers"}elevation={2}>{currentQuiz.choiceList["4"]}</div>}
        </div>
    );
}
