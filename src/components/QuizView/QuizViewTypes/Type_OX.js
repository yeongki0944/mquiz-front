import {useDispatch, useSelector} from "react-redux";
import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import styled from "styled-components";
import {R_setContent, R_setData} from "../../../redux/reducers/quizplayReducer";
import {Content, Item, Item_c} from "../../LayOuts/LayOuts";
import Button from "@mui/material/Button";
import {stompSend} from "../../../function/WebSocket";
import {AnswerBox} from "./AnswerBox";


export const Type_OX = () => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);

    const setSelected = (e) => {
        if (e.target.id === "selected") {
            e.target.id = "";
            e.target.style.border = "none";
        } else {
            //delete all selected
            const selected = document.querySelectorAll("#selected");
            selected.forEach(item => {
                item.id = "";
                item.style.border = "none";
            })
            e.target.id = "selected";
            e.target.style.border = "1px solid orange";
        }
    }
    const handleSubmit = () => {
        const selected = document.getElementById("selected");
        const answers = [selected.innerText];
        stompSend("submit", {
            pinNum: quizPlay.pinNum,
            action: "SUBMIT",
            nickName: quizPlay.nickName,
            submit: {
                answer: answers,
                answerTime: 1,
                quizNum: quizPlay.quiz.num
            }
        });
        dispatch(R_setData({key: "command", value: "SUBMIT"}));
    }
    const handleSkip = () => {
        stompSend("skip", {
            pinNum: quizPlay.pinNum,
            action: "COMMAND",
            command: "START"
        });
    }
    const handleNext = () => {
        stompSend("result", {
            pinNum: quizPlay.pinNum,
            action: "COMMAND",
            command: "RESULT"
        });
    }
    if (quizPlay.nickName === null) { //제작 시
        return (
            <Content sx={{display: 'block', height: '85%'}}>
                <Item sx={{place: 'center', display: 'block', height: '95%', width: '100%'}}>
                    <AnswerBox answer={"O"}/>
                    <AnswerBox answer={"X"}/>
                </Item>
                <Item sx={{place: 'center', width: '100%'}}><Button variant="contained" onClick={handleNext}>다음</Button></Item>
                <Item sx={{place: 'center', width: '100%'}}><Button variant="contained"
                                                                    onClick={handleSkip}>건너뛰기</Button></Item>
            </Content>

        )
    } else {
        return (
            <Content sx={{display: 'block', height: '85%'}}>
                <Item sx={{place: 'center', display: 'block', height: '95%', width: '100%'}}>
                    <AnswerBox answer={"O"} onClick={setSelected}/>
                    <AnswerBox answer={"X"} onClick={setSelected}/>
                </Item>
                <Item sx={{width: '100%'}}><Button variant="contained" onClick={handleSubmit}>정답제출</Button></Item>
            </Content>
        );
    }
}
