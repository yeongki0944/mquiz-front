import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {R_setContent, R_setData} from "../../../redux/reducers/quizplayReducer";
import styled from "styled-components";
import {Content, Item, Item_c} from "../../LayOuts/LayOuts";
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {stompSend} from "../../../function/WebSocket";
import {AnswerBox} from "./AnswerBox";


export const Type_Reply = () => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [quizAnswer, setquizAnswer] = useState('');

    const handleInput = (e) => {
        setquizAnswer(e.target.value);
    }

    const handleSubmit = (answer) => {
        stompSend("submit", {
            pinNum: quizPlay.pinNum,
            action: "SUBMIT",
            nickName: quizPlay.nickName,
            submit: {
                answer: [answer],
                answerTime: 1,
                quizNum: quizPlay.quiz.num
            }
        });
        dispatch(R_setData({key: "command", value: "SUBMIT"}));
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e.target.value);
        }
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

    if (quizPlay.command === "RESULT") {
        return (
            <Content>
                <Answers>
                    <AnswerArea>
                        {quizPlay.quiz.answer}
                    </AnswerArea>
                </Answers>
            </Content>
        )
    } else if (quizPlay.nickName === null) { //제작 시
        return (
            <Content sx={{display: 'block', height: '85%'}}>
                <Item sx={{place: 'center', display: 'block', height: '95%', width: '100%'}}>
                    <Item sx={{width: '100%', place: 'center'}}>
                        <TextField id="quizAnswer" name="quizAnswer" type="quizAnswer" label="정답을 입력해 주세요"
                                   variant="outlined"
                                   onBlur={handleInput}
                                   onKeyPress={handleEnterKey}
                        />
                    </Item>
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
                    <Item sx={{width: '100%', place: 'center'}}>
                        <TextField id="quizAnswer" name="quizAnswer" type="quizAnswer" label="정답을 입력해 주세요"
                                   variant="outlined"
                                   onBlur={handleInput}
                                   onKeyPress={handleEnterKey}
                        />
                    </Item>
                </Item>
                <Item sx={{width: '100%'}}><Button variant="contained" onClick={handleSubmit}>정답제출</Button></Item>
            </Content>
        );
    }
}

