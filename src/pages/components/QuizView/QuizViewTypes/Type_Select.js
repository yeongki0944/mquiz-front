import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useSelector, useDispatch} from "react-redux";
import './QuizTypes.css';
import {Type_OX} from "./Type_OX";
import {Type_Reply} from "./Type_Reply";
import {R_setContent} from "../../../redux/reducers/quizplayReducer";


export const Type_Select = () => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    if(currentQuiz === ""){
        return(
        <div id={"answer"}>
            <div className={"answers"} elevation={2}>{currentQuiz.choiceList["1"]}</div>
            <div className={"answers"} elevation={2}>{currentQuiz.choiceList["2"]}</div>
            {/*2번까지는 빈값도 표시*/}
            {currentQuiz.choiceList["3"] === "" ? null :
                <div className={"answers"} elevation={2}>{currentQuiz.choiceList["3"]}</div>}
            {currentQuiz.choiceList["4"] === "" ? null :
                <div className={"answers"} elevation={2}>{currentQuiz.choiceList["4"]}</div>}
        </div>
        )
    }else {
        {console.log((currentQuiz))}
        return (
            <div id={"answer"} >
                <div className={"answers"}elevation={2} onclick={()=>{
                    dispatch(R_setContent({key: "answer", value: currentQuiz.choiceList["1"]}));
                }}>{currentQuiz.choiceList["1"]}</div>

                <div className={"answers"}elevation={2} onclick={()=>{
                    dispatch(R_setContent({key: "answer", value: currentQuiz.choiceList["2"]}));
                }}>{currentQuiz.choiceList["2"]}</div>

                <div className={"answers"}elevation={2}>{currentQuiz.choiceList["2"]}</div>
                {/*2번까지는 빈값도 표시*/}
                {currentQuiz.choiceList["3"]==="" ? null : <div class={"answers"}elevation={2}>{currentQuiz.choiceList["3"]}</div>}
                {currentQuiz.choiceList["4"]==="" ? null : <div class={"answers"}elevation={2}>{currentQuiz.choiceList["4"]}</div>}
            </div>
        );
    }

}
