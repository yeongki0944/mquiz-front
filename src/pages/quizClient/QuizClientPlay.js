import {useEffect, useState} from "react";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {QuizStartCounter} from "../../components/QuizStartCounter";
import {QuizView} from "../../components/QuizView/QuizView";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NickNameCheck} from "../../components/quizClient/ClientNickNameInput";
import {ClientReady} from "../../components/quizClient/ClientReady";
import {ClientCountOutModal} from "../../components/quizClient/ClientCountOutModal";
import {Item_c, Page_Gradiant} from "../../components/LayOuts/LayOuts";
import {stompDisconnect, stompInit, stompSend} from "../../function/WebSocket";
import styled from "styled-components";
import Button from "@mui/material/Button";
import {Rank_Page} from "../../components/RankBox";

const Item_c_full = styled(Item_c)`
    width: 100%;
    height: 100%;
`;

export const QuizClientPlay = () => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [open, setOpen] = useState(false); // 추방 확인 모달창 제어


    /**
     * 퀴즈 진행 command 시 페이지 변경용 useEffect
     * null: 웹소켓 시작
     * START: 퀴즈 시작 카운트 다운 이후 퀴즈 시작
     * KICK: 추방
     */
    useEffect(() => {
        switch (quizPlay.command){
            case null: //최초 세팅
                stompInit(quizPlay.pinNum);
                break;
            case "START": //시작 시 3초 카운터 실행
                setTimeout(() => {
                    dispatch(R_setData({key: "command", value: "SHOW"}));
                }, 3000);
                break;
            case "KICK": //추방
                setOpen(true);
                break;

        }
    }, [quizPlay.command]);

    /**
     * null: 닉네임 입력창
     * WAIT: 닉네임 입력 후 대기방
     * READY: 대기방
     * START: 시작 카운터
     * SHOW: 문제 표시
     * RESULT: 결과 표시
     * FINAL: 최종 결과 표시
     */
    return (
        <Page_Gradiant>
            <Item_c_full>
                {quizPlay.command === null && <NickNameCheck/>}
                {quizPlay.command === "WAIT" && <ClientReady/>}
                {quizPlay.command === "START" && <QuizStartCounter/>}
                {quizPlay.command === "SHOW" && <QuizView currentQuiz={quizPlay.quiz} state={"play"}/>}
                {quizPlay.command === "SUBMIT" && <div>답변전달완료</div>}
                {quizPlay.command === "RESULT" && <Rank_Page/>}
                {quizPlay.command === "FINAL" && <div>final</div>}
                <ClientCountOutModal open ={open} setOpen={setOpen}/>
            </Item_c_full>
        </Page_Gradiant>
    );
}
