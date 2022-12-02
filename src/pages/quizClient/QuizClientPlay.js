
import {useEffect, useState} from "react";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {QuizStartCounter} from "../../components/QuizStartCounter";
import {QuizView} from "../../components/QuizView/QuizView";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NickNameCheck} from "../../components/quizClient/ClientNickNameInput";
import {ClientReady} from "../../components/quizClient/ClientReady";
import {ClientCountOutModal} from "../../components/quizClient/ClientCountOutModal";
import {useHistory} from "react-router-dom";
import {Item_c, Page_Gradiant} from "../../components/LayOuts/LayOuts";
import {stompDisconnect, stompInit, stompSend} from "../../function/WebSocket";



export const QuizClientPlay = () => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quizPlay.quizNum));
    const [open, setOpen] = useState(false);


    /**
     * 퀴즈 진행 command 시 페이지 변경용 useEffect
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
            <Item_c>
                {quizPlay.command === null && <NickNameCheck/>}
                {quizPlay.command === "WAIT" && <ClientReady/>}
                {quizPlay.command === "START" && <Page_Gradiant><QuizStartCounter/></Page_Gradiant>}
                {quizPlay.command === "SHOW" && <QuizView currentQuiz={currentQuiz}/>}
                {quizPlay.command === "RESULT" && <div>result</div>}
                {quizPlay.command === "FINAL" && <div>final</div>}
                <ClientCountOutModal open ={open} setOpen={setOpen}/>
            </Item_c>
        </Page_Gradiant>
    );
}
