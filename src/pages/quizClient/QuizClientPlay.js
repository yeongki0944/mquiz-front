
import {useEffect, useState} from "react";
import {R_setData} from "../redux/reducers/quizplayReducer";
import {QuizStartCounter} from "../components/QuizStartCounter";
import {QuizView} from "../components/QuizView/QuizView";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NickNameCheck} from "./components/ClientNickNameInput";
import {ClientReady} from "./components/ClientReady";
import {ClientCountOutModal} from "./components/ClientCountOutModal";
import {useHistory} from "react-router-dom";
import {Item_c, Page_Gradiant} from "../components/LayOuts/LayOuts";
import {stompInit} from "../function/WebSocket";



export const QuizClientPlay = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // pinNum -> nickName -> wait-> (count -> play ->result -> count) -> result
    const {quizPlay} = useSelector(state => state.quizPlay);
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quizPlay.quizNum));
    const [open, setOpen] = useState(false);


    /**
     * 여기 시현님 하시던거 연결해서 하면 끝납니다.(Host랑 거의 동일)
     * 대신 문제 입력부분은 완성 후 연결해야할듯..?합니다.
     */

    useEffect(() => {
        switch (quizPlay.command){
            case "nickName":
                stompInit(quizPlay.pinNum);
                break;
            case "start":
                setTimeout(() => {
                    R_setData({key: "command", value: "show"});
                }, 3000);
                break;
            case "kick":
                setOpen(true);
                break;

        }
    }, [quizPlay.command]);

    return (
        <Page_Gradiant>
            <Item_c>
                {quizPlay.command == "nickName" && <NickNameCheck/>}
                {quizPlay.command == "wait" && <ClientReady nickName={quizPlay.sender}/>}
                {quizPlay.command === "start" && <Page_Gradiant><QuizStartCounter/></Page_Gradiant>}
                {quizPlay.command === "show" && <QuizView currentQuiz={currentQuiz}/>}
                {quizPlay.command === "result" && <div>result</div>}
                {quizPlay.command === "final" && <div>final</div>}
                <ClientCountOutModal open ={open} setOpen={setOpen}/>
            </Item_c>
        </Page_Gradiant>
    );
}
