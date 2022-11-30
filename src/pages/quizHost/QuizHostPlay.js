import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {QuizView} from "../../components/QuizView/QuizView";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {QuizStartCounter} from "../../components/QuizStartCounter";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import {R_setData, R_setContent} from "../../redux/reducers/quizplayReducer";
import {useHistory} from "react-router-dom";
import {Page_Gradiant} from "../../components/LayOuts/LayOuts";
/*import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";*/
import {QuizHostReady} from "./QuizHostReady";
import {stompInit, stompSend, stompDisconnect, stompSubscribe} from "../../function/WebSocket";

const Counter = styled(QuizStartCounter)({
    width: '100%',
    height: '100vh',
});

export const QuizHostPlay = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    //wait -> (count -> play ->result -> count) -> result
    const {quizPlay} = useSelector(state => state.quizPlay);
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quizPlay.quizNum));
    const QuizCount = quiz.quizData.length;

    useEffect(() => {
        // console.log(quiz);
        // console.log(currentQuiz);
    }, []);

    //이거 웹소캣이랑 연동
    const startCommand = () => {
        dispatch(R_setData({key:"command", value:"START"}));
        stompSend("START/"+quizPlay.pinNum, {
            pinNum: quizPlay.pinNum,
            command: quizPlay.command
        });
    }

    // ready : 웹소켓 연결
    // wait : 퀴즈 대기방 대기, 호스트가 시작 버튼 누르면 start로 이동
    // start : 퀴즈 시작, 3초 카운트 후 퀴즈 표시
    // show : 퀴즈 문제 표시
    // result : 중간 결과 표시
    // final : 최종 결과 표시
    useEffect(() => {
        switch (quizPlay.command) {
            case "READY":
                stompInit(quizPlay.pinNum);
                setTimeout(() => {
                    dispatch(R_setData({key:"command", value:"WAIT"}));
                }, 50);
                break;
            case "START":
                setTimeout(() => {
                    dispatch(R_setData({key:"command", value:"SHOW"}));
                }, 3000);
                break;
            case "SHOW":
                setTimeout(()=>{
                    dispatch(R_setData({key:"command", value:"RESULT"}));
                }, quiz.quizData[quizPlay.quizNum].time*1000);
                break;
            case "RESULT":
                if(quizPlay.quizNum === QuizCount)
                {
                    dispatch(R_setData({key:"command", value:"FINAL"}));
                }
                else{
                    dispatch(R_setData({key:"quizNum", value:quizPlay.quizNum + 1}));
                }
                break;
            case "FINAL":
                stompSend(quizPlay.command + "/" + quizPlay.pinNum, {
                    pinNum: quizPlay.pinNum,
                    command: quizPlay.command
                });
                stompDisconnect();
                break;
        }
        if (quizPlay.command !== "READY" && quizPlay.command !== "FINAL" && quizPlay.command !== "SHOW" && quizPlay.command !== "WAIT")
        {
            stompSend(quizPlay.command + "/" + quizPlay.pinNum,{
                pinNum:quizPlay.pinNum,
                command : quizPlay.command
            });
        }
    }, [quizPlay.command]);

    return (

        <Page_Gradiant>

            {/*{quizPlay.command === "ready" && <QuizHostReady/>}
            {quizPlay.command === "wait" ? <Button onClick={handleCommand}>Start</Button> :
                <Button onClick={handleCommand}>Next</Button>}
            {quizPlay.command === "start" && <Counter/>}
            {quizPlay.command === "show" && <QuizView currentQuiz={currentQuiz}/>}
            {quizPlay.command === "result" && <div>result</div>}
            {quizPlay.command === "final" && <div>final</div>}*/}

            {quizPlay.command === "WAIT" && <QuizHostReady startCommand={startCommand}/>}
            {quizPlay.command === "START" && <Counter/>}
            {quizPlay.command === "SHOW" && <QuizView currentQuiz={currentQuiz}/>}
            {quizPlay.command === "RESULT" && <div><Button variant={"contained"} onClick={startCommand}>다음문제</Button></div>}
            {quizPlay.command === "FINAL" && <div><Button variant={"contained"} onClick={()=>{history.push({pathname: '/'})}}>메인으로 돌아가기</Button></div>}

            {/*<QuizView currentQuiz={currentQuiz}/>*/}
        </Page_Gradiant>
    );
}
