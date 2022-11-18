import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {Card, CardContent} from "@mui/material";
import {Gauge, PinField} from "../../components/PlayBoard";

export default function PlayBoard() {
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    return (
        <>
            <PinField pin ={"12345"}/>
            <Gauge QuestionNum={"1"} QuestionCnt={"10"} timeprogress={10}/>
        </>
    )

}
