import styled from "styled-components";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";
import {R_setCurrentShow_play} from "../redux/reducers/quizplayReducer";
import {PinNumCheck} from "./components/ClientPinNumInput";
import Ready from "./ready/Ready";
import {QuizStartCounter} from "../components/QuizStartCounter";
import {QuizView} from "../components/QuizView/QuizView";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {NickNameCheck} from "./components/ClientNickNameInput";

const Page = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    background: linear-gradient(to right, rebeccapurple, salmon);
`;

const Item = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Counter = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    background: linear-gradient(to right, rebeccapurple, salmon);
`;

export const QuizClientPlay = () => {
    const dispatch = useDispatch();
    // pinNum -> nickName -> wait-> (count -> play ->result -> count) -> result
    const [command, setCommand] = useState("nickName");
    const {quizPlay} = useSelector(state => state.quizPlay);
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quizPlay.currentShow));


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
        if (command === "start") {
            setTimeout(() => {
                setCommand("show");
            }, 3000);
        }
    }, [command]);

    return (
        <Page>
            <Item>
                <Button onClick={handleCommand}>{command}</Button>
                {command == "nickName" && <NickNameCheck setCommand={setCommand}/>}
                {command == "wait" && <Ready/>}
                {command === "start" && <Counter><QuizStartCounter/></Counter>}
                {command === "show" && <QuizView currentQuiz={currentQuiz}/>}
                {command === "result" && <div>result</div>}
                {command === "final" && <div>final</div>}
            </Item>
        </Page>
    );
}
