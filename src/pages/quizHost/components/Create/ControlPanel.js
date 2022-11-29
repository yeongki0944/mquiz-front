import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {R_addQuiz, R_setCurrentShow} from "../../../redux/reducers/quizInfoReducer";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import * as React from "react";
import axios from "axios";
import CustomAxios from "../../../function/CustomAxios";
import styled from "styled-components";

const Styled_BottomNavigation = styled(BottomNavigation)`
    width: 100%;
    height: 5vh;
`;

export const ControlPanel = (props) => {
    const dispatch = useDispatch();
    const quiz = props.quiz;
    const save = async () => {
        console.log(quiz.quizData);
        await CustomAxios.post('/v1/show', quiz)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const addPage = () => {
        dispatch(R_addQuiz());
        dispatch(R_setCurrentShow(quiz.quizData.length));
    }

    return (
        <Styled_BottomNavigation showLabels>
            <BottomNavigationAction label="+ Page" onClick={addPage}/>
            <BottomNavigationAction label="+ Show"/>
            <BottomNavigationAction label="Save" onClick={save}/>
        </Styled_BottomNavigation>
    )
}
