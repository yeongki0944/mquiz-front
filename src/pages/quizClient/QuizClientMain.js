import * as React from 'react';
import {Item, Page} from "../../LayOuts/LayOuts";
import {PinNumCheck} from "../../components/quizClient/ClientPinNumInput";
import {useEffect, useState} from "react";
import {disableBackPage, disableRefresh} from "../../function/common";
import {checkConnected} from "../../function/Reconnect";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {useDispatch, useSelector} from "react-redux";
import {NickNameCheck} from "../../components/quizClient/ClientNickNameInput";
import {ClientReady} from "../../components/quizClient/ClientReady";
import {QuizStartCounter} from "../../components/QuizStartCounter";
import {QuizView} from "../../components/QuizView/QuizView";
import {ClientSubmitWait} from "../../components/quizClient/ClientSubmitWait";
import {Rank_Page} from "../../components/Result/Rank_Page";
import {FinalRankPage} from "../../components/Result/FinalRankPage";
import {QuizClientReconnect} from "./QuizClientReconnect";
import {ClientCountOutModal} from "../../components/quizClient/ClientCountOutModal";
import {stompInit} from "../../function/WebSocket";
import {flushLocalStorage, getPinNum} from "../../function/localStorage";



export const QuizClientMain = () => {
    // pinNum -> nickName -> wait-> (count -> play ->result -> count) -> result
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [open, setOpen] = useState(false); // 추방 확인 모달창 제어

    useEffect(() => {
        if(checkConnected()){
            console.log("들어옴");
            dispatch(R_setData({key:'command',value:'RECONNECT'}));
        }
        else{
            dispatch(R_setData({key:'command',value:'PIN'}));
        }
        disableBackPage();
        disableRefresh();
    }, []);


    /**
     * 퀴즈 진행 command 시 페이지 변경용 useEffect
     * NICK: 웹소켓 시작
     * START: 퀴즈 시작 카운트 다운 이후 퀴즈 시작
     * KICK: 추방
     */
    useEffect(() => {
        console.log(quizPlay.command);
        switch (quizPlay.command) {
            case "NICK": //최초 세팅
                stompInit(getPinNum());
                break;
            case "START": //시작 시 3초 카운터 실행
                setTimeout(() => {
                    dispatch(R_setData({key: "command", value: "SHOW"}));
                }, 3000);
                break;
            case "KICK": //추방
                setOpen(true);
                flushLocalStorage();
                break;
        }
    }, [quizPlay.command]);


    /**
     * PIN: 핀 입력창
     * NICK: 닉네임 입력창
     * WAIT: 닉네임 입력 후 대기방
     * READY: 대기방
     * START: 시작 카운터
     * SHOW: 문제 표시
     * RESULT: 결과 표시
     * FINAL: 최종 결과 표시
     */
    return (
        <Page sx={{bg:'img',img: '/img/background_1.jpg'}}>
            <Item sx={{place:"center"}} sm={{place:'center'}}>
                {quizPlay.command === "PIN" && <PinNumCheck/>}
                {quizPlay.command === "NICK" && <NickNameCheck/>}
                {quizPlay.command === "WAIT" && <ClientReady/>}
                {quizPlay.command === "START" && <QuizStartCounter/>}
                {quizPlay.command === "SHOW" && <QuizView currentQuiz={quizPlay.quiz} state={"play"}/>}
                {quizPlay.command === "SUBMIT" && <ClientSubmitWait/>}
                {quizPlay.command === "RESULT" && <Rank_Page/>}
                {quizPlay.command === "FINAL" && <FinalRankPage/>}
                {quizPlay.command === "RECONNECT" && <QuizClientReconnect/>}
                <ClientCountOutModal open={open} setOpen={setOpen}/>
            </Item>
        </Page>
    );
}
