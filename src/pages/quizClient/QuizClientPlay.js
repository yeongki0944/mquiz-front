import styled from "styled-components";
import {useEffect, useState} from "react";
import {R_setCurrentShow_play} from "../redux/reducers/quizplayReducer";
import {QuizStartCounter} from "../components/QuizStartCounter";
import {QuizView} from "../components/QuizView/QuizView";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {NickNameCheck} from "./components/ClientNickNameInput";
import {ClientReady} from "./components/ClientReady";
import {ClientCountOutModal} from "./components/ClientCountOutModal";
import {useHistory} from "react-router-dom";
import {Item_c, Page_Gradiant} from "../components/LayOuts/LayOuts";



export const QuizClientPlay = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // pinNum -> nickName -> wait-> (count -> play ->result -> count) -> result
    const [command, setCommand] = useState("nickName");
    const {quizPlay} = useSelector(state => state.quizPlay);
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quizPlay.quizNum));
    const [open, setOpen] = useState(false);


    //이거 웹소캣이랑 연동
    const handleCommand = () => {
        switch (command) {
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
        }
    }
    useEffect(() => {
        switch (command){
            case "start":
                setTimeout(() => {
                    setCommand("show");
                }, 3000);
                break;
            case "kick":
                setOpen(true);
        }
    }, [command]);

    return (
        <Page_Gradiant>
            <Item_c>
                <Button onClick={handleCommand}>{command}</Button>
                <Button onClick={()=>setOpen(true)}>kick</Button>
                {command == "nickName" && <NickNameCheck setCommand={setCommand}/>}
                {command == "wait" && <ClientReady/>}
                {command === "start" && <Page_Gradiant><QuizStartCounter/></Page_Gradiant>}
                {command === "show" && <QuizView currentQuiz={currentQuiz}/>}
                {command === "result" && <div>result</div>}
                {command === "final" && <div>final</div>}
                <ClientCountOutModal open ={open} setOpen={setOpen}/>
            </Item_c>
        </Page_Gradiant>
    );
}
