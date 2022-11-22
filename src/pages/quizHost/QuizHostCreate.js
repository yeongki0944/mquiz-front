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


export const QuizHostCreate = () => {
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    return (
        <div id={"content"}>
            <div id={"navbar"}>
                <NavBar/>
            </div>
            <div id={"panel"}>
                <div id={"list"}>
                    <ListPanel quiz={quiz}/>
                </div>

                    <QuizView currentQuiz={currentQuiz}/>
                    <FormPanel currentQuiz={currentQuiz}/>
            </div>
            <div id={"control"}>
                <ControlPanel quiz={quiz}/>
            </div>
        </div>
    )
}
