import {useDispatch, useSelector} from "react-redux";
import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import styled from "styled-components";
import {R_setContent, R_setData} from "../../../redux/reducers/quizplayReducer";
import {Item_c} from "../../LayOuts/LayOuts";
import Button from "@mui/material/Button";
import {stompSend} from "../../../function/WebSocket";

const Content = styled(Item_c)`
  display: block;
  height: 85%;
`;
const Answers = styled(Item_c)`
    height: 95%;
    display: block;
`;

const AnswerArea = styled(Item_c)`
    float:left;
    @media (min-width: 300px) and (max-width: 767px) {
        height: 45%;
        width: 50%;
    }
    @media (min-width: 767px) {
        width: 50%;
    }
`

const Card_Btn = styled(Item_c)`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    
    @media (min-width: 300px) and (max-width: 767px) {
        height: 90%;
        width: 90%;
        min-height: 120px;
    }
    @media (min-width: 767px) {
        height: 90%;
        width: 90%;
        min-height: 100px;
        margin-bottom: 10px;
    }
`

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
        dispatch(R_setData({key:"command", value:"SUBMIT"}));
    }
    const handleSkip = () => {
        stompSend("skip", {
            pinNum: quizPlay.pinNum,
            action:"COMMAND",
            command:"START"
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
            <Content>
                <Answers>
                    <AnswerArea><Card_Btn>O</Card_Btn></AnswerArea>
                    <AnswerArea><Card_Btn>X</Card_Btn></AnswerArea>
                </Answers>
                <Item_c><Button variant="contained" onClick={handleNext}>다음</Button></Item_c>
                <Item_c><Button variant="contained" onClick={handleSkip}>건너뛰기</Button></Item_c>
            </Content>

        )
    } else {
        return (
            <Content>
                <Answers>
                    {console.log(quizPlay.quiz)}
                    <AnswerArea><Card_Btn onClick={setSelected}>O</Card_Btn></AnswerArea>
                    <AnswerArea><Card_Btn onClick={setSelected}>X</Card_Btn></AnswerArea>
                </Answers>
                <Item_c><Button variant="contained" onClick={handleSubmit}>정답제출</Button></Item_c>

            </Content>
        );
    }
}
