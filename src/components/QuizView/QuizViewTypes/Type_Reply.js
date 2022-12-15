import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import { useState} from "react";
import {R_setData} from "../../../redux/reducers/quizplayReducer";
import { Card, Item} from "../../../LayOuts/LayOuts";
import {TextField} from "@mui/material";
import {stompSend} from "../../../function/WebSocket";
import {PlayActionBar} from "../PlayActionBar";
import {getNickname, getPinNum, getRole} from "../../../function/localStorage";

export const Type_Reply = () => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [quizAnswer, setquizAnswer] = useState('');

    const handleInput = (e) => {
        setquizAnswer(e.target.value);
    }

    const handleSubmit = () => {
        let answer_text = document.getElementById('quizAnswer').value;
        console.log(answer_text);
        stompSend("submit", {
            pinNum: getPinNum(),
            action: "SUBMIT",
            nickName: getNickname(),
            submit: {
                answer: [answer_text],
                answerTime: 1,
                quizNum: quizPlay.quiz.num
            }
        });
        dispatch(R_setData({key: "command", value: "SUBMIT"}));
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <Item sx={{place: 'center', display: 'block'}}>
            <Item sx={{place: 'center', display: 'block', height: '90%'}}>
                {quizPlay.command === "RESULT" ?  //정답화면 정답일 시
                    <Item sx={{place: 'center'}}>
                        <Card sx={{place: 'center', background: 'orange'}}>
                            {quizPlay.quiz.answer}
                        </Card>
                    </Item>
                    :
                    getRole() === "HOST" && //호스트 화면
                    <Item sx={{place: 'center'}}>
                        <TextField id="quizAnswer" name="quizAnswer" type="quizAnswer" label="정답을 입력해 주세요"
                                   variant="outlined"
                                   aria-readonly={true}
                                   disabled={true}
                        />
                    </Item>
                }
                {quizPlay.command != "RESULT" && getRole() === "CLIENT" && //클라이언트
                    <Item sx={{place: 'center'}}>
                        <TextField id="quizAnswer" name="quizAnswer" type="quizAnswer" label="정답을 입력해 주세요"
                                   variant="outlined"
                                   onBlur={handleInput}
                                   onKeyPress={handleEnterKey}
                        />
                    </Item>
                }
            </Item>
            <PlayActionBar sx={{place: 'center', display: 'block', height: '20%'}} handleSubmit={handleSubmit}/>
        </Item>
    )

}

