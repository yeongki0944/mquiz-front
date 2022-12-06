import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {R_setContent, R_setData} from "../../../redux/reducers/quizplayReducer";
import styled from "styled-components";
import {Btn, Card, Item, Item_c} from "../../LayOuts/LayOuts";
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

export const Type_Reply = () => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [quizAnswer, setquizAnswer] = useState('');

    const handleInput = (e) => {
        setquizAnswer(e.target.value);
    }

    const handleSubmit = (answer) => {
        console.log(answer);
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

    return (
        <Item sx={{place: 'center', display: 'block'}}>
            <Item sx={{place: 'center', display: 'block', height: '90%'}}>
                {quizPlay.command === "RESULT" ?  //정답화면 정답일 시
                    <Card sx={{place: 'center', background: 'orange'}}>
                        {quizPlay.quiz.answer}
                    </Card>
                    :
                    quizPlay.nickName === null && //호스트 화면
                    quizPlay.command === "SHOW" &&
                        <TextField id="quizAnswer" name="quizAnswer" type="quizAnswer" label="정답을 입력해 주세요"
                                   variant="outlined"
                                   aria-readonly={true}
                                   disabled={true}
                        />
                }
                {quizPlay.command != "RESULT" && quizPlay.nickName != null && //클라이언트
                    <TextField id="quizAnswer" name="quizAnswer" type="quizAnswer" label="정답을 입력해 주세요"
                               variant="outlined"
                               onBlur={handleInput}
                               onKeyPress={handleEnterKey}
                    />
                }
            </Item>
            <Item sx={{place: 'center', display: 'block', height: '10%'}}>
                {quizPlay.command === "RESULT" ? null :
                    quizPlay.nickName === null ?
                        <Item sx={{place: 'center', display: 'flex', margin: 'auto'}}>
                            <Btn sx={{place: 'center', height: '100%', width: '10%'}} onClick={handleNext}>다음</Btn>
                            <Btn sx={{place: 'center', height: '100%', width: '10%'}} onClick={handleSkip}>건너뛰기</Btn>
                        </Item>
                        :
                        <Btn sx={{place: 'center', height: '100%', width: '10%', margin: 'auto'}}
                             onClick={handleSubmit}>정답제출</Btn>
                }
            </Item>
        </Item>
    )

}

