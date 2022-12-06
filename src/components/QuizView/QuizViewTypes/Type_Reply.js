import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {R_setContent, R_setData} from "../../../redux/reducers/quizplayReducer";
import styled from "styled-components";
import {Item_c} from "../../LayOuts/LayOuts";
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
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
    @media (min-width: 300px) and (max-width: 767px) {
    }
    @media (min-width: 767px) {
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
            <Content>
                <Answers>
                    <AnswerArea>
                        <TextField id="quizAnswer" name="quizAnswer" type="quizAnswer" label="정답을 입력해 주세요"
                                   variant="outlined"
                                   aria-readonly={true}
                        />
                    </AnswerArea>
                </Answers>
                <Item_c><Button variant="contained" onClick={handleNext}>다음</Button></Item_c>
                <Item_c><Button variant="contained" onClick={handleSkip}>건너뛰기</Button></Item_c>
            </Content>

        )
    } else {
        return (
            <Content>
                <Answers>
                    <AnswerArea>
                        <TextField id="quizAnswer" name="quizAnswer" type="quizAnswer" label="정답을 입력해 주세요"
                                   variant="outlined"
                                   onBlur={handleInput}
                                   onKeyPress={handleEnterKey}
                        />
                    </AnswerArea>
                </Answers>
                <Item_c><Button variant="contained" onClick={() => {
                    handleSubmit(quizAnswer)
                }}>정답제출</Button></Item_c>
            </Content>
        );
    }
}

