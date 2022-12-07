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
import {PlayActionBar} from "../PlayActionBar";

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

    const handleSubmit = () => { //OX
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

    return (
        <Item sx={{place: 'center', display: 'block'}}>
            <Item sx={{place: 'center', display: 'flex', height: '80%'}}>
                {quizPlay.command === "RESULT" && quizPlay.quiz.answer[0] === "O" ?  //정답화면 정답일 시
                    <Item sx={{place: 'center',display: 'flex'}} sm={{display:'block'}}>
                        <Card sx={{place: 'center',minWidth: '45%',margin:'auto',background:'orange'}} sm={{minHeight:'45%',minWidth:'45%'}}>O</Card>
                        <Card sx={{place: 'center',minWidth: '45%',margin:'auto'}} sm={{minHeight:'45%',minWidth:'45%'}}>X</Card>
                    </Item>
                    :
                    quizPlay.command === "RESULT" && quizPlay.quiz.answer[0] === "O" ?
                        <Item sx={{place: 'center', width: '100%', height: '100%', display: 'flex'}} sm={{display:'block'}}>
                            <Card sx={{place: 'center',minWidth: '45%',margin:'auto'}} sm={{minHeight:'45%',minWidth:'45%'}}>O</Card>
                            <Card sx={{place: 'center',minWidth: '45%',margin:'auto',background:'orange'}} sm={{minHeight:'45%',minWidth:'45%'}}>X</Card>
                        </Item>
                        :
                        quizPlay.nickName === null && //호스트 화면
                        <Item sx={{place: 'center', width: '100%', height: '100%',display:'flex'}} sm={{}}>
                            <Card sx={{place: 'center',minWidth: '45%',margin:'auto'}} sm={{minHeight:'45%',minWidth:'45%'}}>O</Card>
                            <Card sx={{place: 'center',minWidth: '45%',margin:'auto'}} sm={{minHeight:'45%',minWidth:'45%'}}>X</Card>
                        </Item>
                }
                {quizPlay.command != "RESULT" && quizPlay.nickName != null && //클라이언트 화면
                    <Item sx={{place: 'center', width: '100%', height: '100%', display: 'flex'}} sm={{}}>
                        <Card sx={{place: 'center',minWidth: '45%',margin:'auto'}} sm={{minHeight:'45%',minWidth:'45%'}} onClick={setSelected}>O</Card>
                        <Card sx={{place: 'center',minWidth: '45%',margin:'auto'}} sm={{minHeight:'45%',minWidth:'45%'}} onClick={setSelected}>X</Card>
                    </Item>
                }

            </Item>
            <PlayActionBar sx={{place: 'center', display: 'block', height: '20%'}} handleSubmit={handleSubmit}/>
        </Item>
    )
}
