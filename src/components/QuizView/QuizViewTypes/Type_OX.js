import {useDispatch, useSelector} from "react-redux";
import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import styled from "styled-components";
import {R_setContent, R_setData} from "../../../redux/reducers/quizplayReducer";
import {Btn, Card, Item, Item_c} from "../../LayOuts/LayOuts";
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
        // console.log(answers);
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


    return (
        <Item sx={{place: 'center', display: 'block'}}>
            <Item sx={{place: 'center', display: 'flex', height: '80%', width: '100%'}}>
                {quizPlay.command === "RESULT" && quizPlay.quiz.answer[0] === "O" ?  //정답화면 정답일 시
                    <Item sx={{place: 'center', width: '100%', height: '100%', display: 'flex'}} sm={{display:'block'}}>
                        <Card sx={{place: 'center', minWidth: '45%',fontSize:'10rem',background:'orange'}} sm={{minHeight:'45%',fontSize:'5rem'}}>O</Card>
                        <Card sx={{place: 'center', minWidth: '45%',fontSize:'10rem'}} sm={{minHeight:'45%',fontSize:'5rem'}}>X</Card>
                    </Item>
                    :
                    quizPlay.command === "RESULT" && quizPlay.quiz.answer[0] === "O" ?
                        <Item sx={{place: 'center', width: '100%', height: '100%', display: 'flex'}} sm={{display:'block'}}>
                            <Card sx={{place: 'center', minWidth: '45%',fontSize:'10rem'}} sm={{minHeight:'45%',fontSize:'5rem'}}>O</Card>
                            <Card sx={{place: 'center', minWidth: '45%',fontSize:'10rem',background:'orange'}} sm={{minHeight:'45%',fontSize:'5rem'}}>X</Card>
                        </Item>
                        :
                        quizPlay.nickName === null && //호스트 화면
                        <Item sx={{place: 'center', width: '100%', height: '100%', display: 'flex'}} sm={{display:'block'}}>
                            <Card sx={{place: 'center', minWidth: '45%',fontSize:'10rem'}} sm={{minHeight:'45%',fontSize:'5rem'}}>O</Card>
                            <Card sx={{place: 'center', minWidth: '45%',fontSize:'10rem'}} sm={{minHeight:'45%',fontSize:'5rem'}}>X</Card>
                        </Item>
                }
                {quizPlay.command != "RESULT" && quizPlay.nickName != null && //클라이언트 화면
                    <Item sx={{place: 'center', width: '100%', height: '100%', display: 'flex'}} sm={{display:'block'}}
                          onClick={setSelected}>
                        <Card sx={{place: 'center', minWidth: '45%',fontSize:'10rem'}} sm={{minHeight:'45%',fontSize:'5rem'}}>O</Card>
                        <Card sx={{place: 'center', minWidth: '45%',fontSize:'10rem'}} sm={{minHeight:'45%',fontSize:'5rem'}}>X</Card>
                    </Item>
                }

            </Item>
            <Item sx={{place: 'center', display: 'block', height: '10%'}} sm={{height:'20%'}}>
                {quizPlay.command === "RESULT" ? null :
                    quizPlay.nickName === null ?
                        <Item sx={{place: 'center', display: 'flex', margin: 'auto'}}>
                            <Btn sx={{place: 'center', height: '100%', width: '10%'}} sm={{width:'50%',height:'50%'}} onClick={handleNext}>다음</Btn>
                            <Btn sx={{place: 'center', height: '100%', width: '10%'}} sm={{width:'50%',height:'50%'}} onClick={handleSkip}>건너뛰기</Btn>
                        </Item>
                        :
                        <Btn sx={{place: 'center', height: '100%', width: '10%', margin: 'auto'}} sm={{width:'50%',height:'50%'}}
                             onClick={handleSubmit}>정답제출</Btn>
                }
            </Item>
        </Item>
    )
}
