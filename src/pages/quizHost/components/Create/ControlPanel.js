import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {R_addQuiz, R_setCurrentShow} from "../../../redux/reducers/quizInfoReducer";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import * as React from "react";
import axios from "axios";

export const ControlPanel = (props) => {
    const dispatch = useDispatch();
    const quiz = props.quiz;

    const save = () => {
        const data = JSON.stringify(quiz);
        console.log(data);
        // axios.post("http://localhost:8080/save", data)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }
    const addPage = () => {
        dispatch(R_addQuiz());
        dispatch(R_setCurrentShow(quiz.quizData.length));
    }

    return (
        <BottomNavigation showLabels>
            <BottomNavigationAction label="+ Page" onClick={addPage}/>
            <BottomNavigationAction label="+ Show"/>
            <BottomNavigationAction label="Save" onClick={save}/>
        </BottomNavigation>
    )
}
