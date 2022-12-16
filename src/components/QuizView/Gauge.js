import * as React from "react";
import {ProgressBar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useRef, useState} from "react";
import {stompSend} from "../../function/WebSocket";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {useDispatch, useSelector} from "react-redux";
import {Content, Item, Text} from "../../layouts/LayOuts";
import {getNickname, getPinNum, getQuizTime, getRole} from "../../function/localStorage";
import {getGaugeTimer, getRemainingTimebySec, getSolvedTime, getTime} from "../../function/Timer";

/**
 * props:
 *  - quizPlay : quizPlay
 *  - TotalQcnt: 총 문제 수
 *  - timeprogress: 시간 진행률(1~100)
 */

export const Gauge = (props) => {
    const dispatch = useDispatch();

    const {quizPlay} = useSelector(state => state.quizPlay);

    const [count, setCount] = useState(quizPlay.quiz.time);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(getGaugeTimer(quizPlay.quiz.time + 3));
            if (count <= 0) {
                clearInterval(interval);
                setCount(0);
                if (getRole() === "HOST") { // 호스트

                } else { // 클라이언트
                    dispatch(R_setData({key: "command", value: "SUBMIT"}));
                    stompSend("submit", {
                        pinNum: getPinNum(),
                        action: "SUBMIT",
                        nickName: getNickname(),
                        submit: {
                            answer: [],
                            answerTime: getSolvedTime(),
                            quizNum: quizPlay.quiz.num
                        }
                    });
                }
            }
        }, quizPlay.quiz.time);
        return () => clearInterval(interval);
    }, [count]);


    return (
        <Content sx={{width: '100%'}}>
            <Text sx={{color: '#FFC107', fontSize: '2vw'}} sm={{fontSize: '5vw'}}>
                문제 {props.Qnum} / {props.TotalQcnt}
            </Text>
            <Item sx={{place: 'center', width: '100%'}}>
                <Item sx={{place: 'center', width: '10%'}}>
                    <Text sx={{color: '#FFC107', fontSize: '3vw'}} sm={{fontSize: '6vw'}}>
                        {count / 10}
                        /{quizPlay.quiz.time}</Text>
                </Item>
                <Item sx={{place: 'center', width: '90%'}}>
                    <ProgressBar
                        style={{width: '100%'}}
                        animated
                        now={count / quizPlay.quiz.time * 10}
                    />
                </Item>
            </Item>
        </Content>
    )
}



