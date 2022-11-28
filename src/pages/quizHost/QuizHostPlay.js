import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {QuizView} from "../components/QuizView/QuizView";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {QuizStartCounter} from "../components/QuizStartCounter";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import {R_setCurrentCommand_play, R_setCurrentShow_play} from "../redux/reducers/quizplayReducer";
import {useHistory} from "react-router-dom";
import {Page_Gradiant} from "../components/LayOuts/LayOuts";
/*import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";*/
import {QuizHostReady} from "./QuizHostReady";
import {stompInit, stompSend, stompDisconnect} from "../function/WebSocket";

const Counter = styled(QuizStartCounter)({
    width: '100%',
    height: '100vh',
});

export const QuizHostPlay = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // 테스트용 변수
    let pinNum = "123456"
    /*let sockJs = new SockJS("http://localhost:8080/stomp/quiz");
    let stomp = Stomp.over(sockJs);*/

    //wait -> (count -> play ->result -> count) -> result
    //const [command, setCommand] = useState("ready");
    const {quizPlay} = useSelector(state => state.quizPlay);
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quizPlay.currentShow));
    const QuizCount = quiz.quizData.length;

    /*const stompInit = () => {
        stomp.connect({}, ()=>{
                console.log("STOMP Connection");

                stomp.subscribe("/sub/quiz-play/room/" + pinNum, (msg)=>{
                    console.log(msg);
                });
            });
    }

    const stompSend = () => {
        console.log("Send보냄");
        stomp.send("/pub/quiz/message", {}, JSON.stringify({
            pinNum:pinNum,
            command : quizPlay.currentCommand
        }));
    }

    stompInit();
    */

    useEffect(() => {
        // console.log(quiz);
        // console.log(currentQuiz);
    }, []);

    stompInit(pinNum);

    //이거 웹소캣이랑 연동
    const handleCommand = () => {
        /*console.log(command);
        switch (command) {
            case "ready":
                setCommand("wait");
                break;
            case "wait":
                setCommand("start");
                break;
            case "start":
                setCommand("result");
                break;
            case "show": //start 이후 자동
                setCommand("result");
                break;
            case "result":
                dispatch(R_setCurrentShow_play(quizPlay.currentShow + 1));
                setCommand("start");
                break;
        }*/
        switch (quizPlay.currentCommand) {
            case "wait":
                dispatch(R_setCurrentCommand_play("start"));
                break;
            case "start":
                dispatch(R_setCurrentCommand_play("show"));
                break;
            case "show": //start 이후 자동
                dispatch(R_setCurrentCommand_play("result"));
                break;
            case "result":
                dispatch(R_setCurrentShow_play(quizPlay.currentShow + 1));
                dispatch(R_setCurrentCommand_play("start"));
                break;
        }
    }

    // ready : 호스트가 퀴즈 플레이 버튼을 눌럿을 때 퀴즈 대기방으로 이동
    // wait : 퀴즈 대기방 대기
    // start : 퀴즈 시작, 3초 카운트 후 퀴즈 표시
    // show : 퀴즈 문제 표시
    // result : 중간 결과 표시
    // final : 최종 결과 표시
    useEffect(() => {
        switch (quizPlay.currentCommand) {
            case "ready":
                stompInit(pinNum);
                break;
            case "start":
                setTimeout(() => {
                    //setCommand("show");
                    dispatch(R_setCurrentCommand_play("show"));
                    stompSend("/quiz/message", {
                        pinNum: pinNum,
                        command: quizPlay.currentCommand
                    });
                }, 3000);

                break;
            case "result":
                if(quizPlay.currentShow === QuizCount)
                    dispatch(R_setCurrentCommand_play("final"));
                break;
            case "final":
                stompSend("/quiz/message", {
                    pinNum: pinNum,
                    command: quizPlay.currentCommand
                });
                stompDisconnect();
                break;
        }
        if (quizPlay.currentCommand != "ready" && quizPlay.currentCommand != "final")
        {
            stompSend("/quiz/message",{
                pinNum:pinNum,
                command : quizPlay.currentCommand
            });
        }
    }, [quizPlay.currentCommand]);

    return (
        <Page_Gradiant>
            {quizPlay.currentCommand === "ready" && <QuizHostReady/>}
            {quizPlay.currentCommand === "wait" ? <Button onClick={handleCommand}>Start</Button> :
                <Button onClick={handleCommand}>Next</Button>}
            {quizPlay.currentCommand === "start" && <Counter/>}
            {quizPlay.currentCommand === "show" && <QuizView currentQuiz={currentQuiz}/>}
            {quizPlay.currentCommand === "result" && <div>result</div>}
            {quizPlay.currentCommand === "final" && <div>final</div>}

            {/*{command === "ready" && <QuizHostReady setCommand={setCommand}/>}
            {command === "wait" ? <Button onClick={handleCommand}>Start</Button> :
                <Button onClick={handleCommand}>Next</Button>}
            {command === "start" && <Counter/>}
            {command === "show" && <QuizView currentQuiz={currentQuiz}/>}
            {command === "result" && <div>result</div>}
            {command === "final" && <div>final</div>}*/}

            {/*<QuizView currentQuiz={currentQuiz}/>*/}
        </Page_Gradiant>
    );
}
