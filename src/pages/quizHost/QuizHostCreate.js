import * as React from "react";
import Grid from "@mui/material/Grid";
import {ListPanel} from "./components/Create/ListPanel";
import {FormPanel} from "./components/Create/FormPanel";
import {ControlPanel} from "./components/Create/ControlPanel";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {QuizView} from "../components/QuizView/QuizView";
import './styles/BaseLayout.css';
import './styles/QuizHostCreate.css';
import {NavBar} from "../components/NavBar";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {R_setCurrentShow, R_setId, R_setQuiz} from "../redux/reducers/quizInfoReducer";
import CustomAxios from "../function/CustomAxios";


export const QuizHostCreate = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quiz.currentShow));

    // useEffect(() => {
        // console.log(quiz.quizData.find(item => item.num === "11));
    // }, []);

    return (
        <div id={"content"}>
            <div id={"navbar"}>
                <NavBar/>
            </div>
            <div id={"panel"}>
                <div id={"list"}>
                    <ListPanel quiz={quiz}/>
                </div>
                <div id={"quizview"}>
                    <QuizView currentQuiz={currentQuiz}/>
                </div>
                <div id={"form"}>
                    <FormPanel currentQuiz={currentQuiz}/>
                </div>
            </div>

            <div id={"control"}>
                <ControlPanel quiz={quiz}/>
            </div>
        </div>
    )
}
