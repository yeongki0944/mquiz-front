import * as React from 'react';
import {Item, Page} from "../../layouts/LayOuts";
import {PinNumCheck} from "../../components/quizClient/QClientPinNumInput";
import {useEffect, useState} from "react";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {useDispatch, useSelector} from "react-redux";
import {NickNameCheck} from "../../components/quizClient/QClientNickNameInput";
import {QClientReady} from "../../components/quizClient/QClientReady";
import {QStartCounter} from "../../components/QStartCounter";
import {QuizView} from "../../components/QuizView/QuizView";
import {QClientSubmitWait} from "../../components/quizClient/QClientSubmitWait";
import {RankPage} from "../../components/result/RankPage";
import {FinalRankPage} from "../../components/result/FinalRankPage";
import {QClientReconnect} from "../../components/quizClient/QClientReconnect";
import {QClientBanModal} from "../../components/quizClient/QClientBanModal";
import {stompInit} from "../../function/WebSocket";
import {flushLocalStorage, getCorrectCnt, getPinNum} from "../../function/localStorage";
import {HomeButton} from "../../components/HomeButton";
import {VolumeControlButton} from "../../components/VolumeControlButton";
import {flushRedux, setCommand} from "../../function/reduxFunction";



export const QClientMain = () => {
    // pinNum -> nickName -> wait-> (count -> play ->result -> count) -> result
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [open, setOpen] = useState(false); // 추방 확인 모달창 제어

    /**
     * 퀴즈 진행 command 시 페이지 변경용 useEffect
     * NICK: 웹소켓 시작
     * START: 퀴즈 시작 카운트 다운 이후 퀴즈 시작
     * KICK: 추방
     */
    useEffect(() => {
        switch (quizPlay.command) {
            case "NICK": //최초 세팅
                stompInit(getPinNum());
                break;
            case "START": //시작 시 3초 카운터 실행
                setTimeout(() => {
                    setCommand("SHOW");
                }, 3000);
                break;
            case "KICK": //추방
                setOpen(true);
                flushLocalStorage();
                flushRedux();
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
        <Page sx={{bg:'img',img: '/img/background_1.jpg'}} id={"capture"}>
            <HomeButton sx={{position: 'absolute', top: 5, left: 5, zIndex: 100,width:'5vh',height:'5vh'}}/>
            {/*{quizPlay.command === "WAIT" &&*/}
            {/*    <VolumeControlButton sx={{place: 'top-right', height: '5vh'}} mediaName='Ready'/>}*/}
            {/*{quizPlay.command != "WAIT" &&*/}
            {/*    <VolumeControlButton sx={{place: 'top-right', height: '5vh'}} mediaName='Play'/>}*/}
            <Item sx={{place:"center"}} sm={{place:'center'}}>
                {quizPlay.command === "PIN" && <PinNumCheck/>}
                {quizPlay.command === "NICK" && <NickNameCheck/>}
                {quizPlay.command === "WAIT" && <QClientReady/>}
                {quizPlay.command === "START" && <QStartCounter/>}
                {quizPlay.command === "SHOW" && <QuizView currentQuiz={quizPlay.quiz} state={"play"}/>}
                {quizPlay.command === "SUBMIT" && <QClientSubmitWait/>}
                {quizPlay.command === "RESULT" && <RankPage/>}
                {quizPlay.command === "FINAL" && <RankPage/>}
                {quizPlay.command === "RECONNECT" && <QClientReconnect/>}
                <QClientBanModal open={open} setOpen={setOpen}/>
            </Item>
        </Page>
    );
}
