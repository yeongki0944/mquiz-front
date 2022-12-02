import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {QuizView} from "../../components/QuizView/QuizView";
import {useEffect} from "react";
import {QuizStartCounter} from "../../components/QuizStartCounter";
import {styled} from "@mui/system";
import {R_setData, R_setContent} from "../../redux/reducers/quizplayReducer";
import {Page_Gradiant} from "../../components/LayOuts/LayOuts";
import {QuizHostReady} from "./QuizHostReady";
import {stompInit, stompSend, stompDisconnect, stompSubscribe} from "../../function/WebSocket";

export const QuizHostPlay = () => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);


    /**
     * 퀴즈 진행 command 시 페이지 변경용 useEffect
     * READY : 웹 소켓 시작 후 퀴즈 시작 전 대기 화면
     * START : 퀴즈 시작 카운트 다운 이후 퀴즈 진행 화면
     */
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
        }
    }, [quizPlay.command]);


    /**
     * WAIT : 퀴즈 대기방 대기, 호스트가 시작 버튼 누르면 START로 이동
     * START : 퀴즈 시작, 3초 카운트 후 퀴즈 표시
     * SHOW : 퀴즈 문제 표시
     * RESULT : 중간 결과 표시
     * FINAL : 최종 결과 표시
     */
    return (

        <Page_Gradiant>
            {quizPlay.command === "WAIT" && <QuizHostReady/>}
            {quizPlay.command === "START" && <QuizStartCounter/>}
            {quizPlay.command === "SHOW" && <QuizView currentQuiz={quizPlay.quiz}/>}
            {quizPlay.command === "RESULT" && <div>중간결과창</div>}
            {quizPlay.command === "FINAL" && <div>최종결과창</div>}
        </Page_Gradiant>
    );
}
