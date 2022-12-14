import {useEffect, useState} from "react";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {QuizStartCounter} from "../../components/QuizStartCounter";
import {QuizView} from "../../components/QuizView/QuizView";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NickNameCheck} from "../../components/quizClient/ClientNickNameInput";
import {ClientReady} from "../../components/quizClient/ClientReady";
import {ClientCountOutModal} from "../../components/quizClient/ClientCountOutModal";
import {Item, Page} from "../../LayOuts/LayOuts";
import {stompInit} from "../../function/WebSocket";
import {Rank_Page} from "../../components/Result/Rank_Page";
import {FinalRankPage} from "../../components/Result/FinalRankPage";
import {ClientSubmitWait} from "../../components/quizClient/ClientSubmitWait";
import {QuizClientReconnect} from "./QuizClientReconnect";
import {getPinNum} from "../../function/localStorage";

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
        switch (quizPlay.command) {
            case null: //최초 세팅
                stompInit(getPinNum());
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
        <Page sx={{bg:'img',img: '/img/background_1.jpg'}}>
            <Item sx={{place:"center"}} sm={{place:'center'}}>
                {quizPlay.command === null && <NickNameCheck/>}
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
