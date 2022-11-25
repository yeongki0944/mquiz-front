import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {QuizView} from "../components/QuizView/QuizView";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {QuizStartCounter} from "../components/QuizStartCounter";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import {R_setCurrentShow_play} from "../redux/reducers/quizplayReducer";
import {useHistory} from "react-router-dom";


const Counter = styled(Paper)({
    width: '100%',
    height: '100vh',
});

export const QuizHostPlay = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    //wait -> (count -> play ->result -> count) -> result
    const [command, setCommand] = useState("wait");
    const {quizPlay} = useSelector(state => state.quizPlay);
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quizPlay.currentShow));

    useEffect(() => {
        // console.log(quiz);
        // console.log(currentQuiz);
    }, []);

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
        }
    }, [command]);

    return (
        <div id={"content"}>
            {command === "wait" ? <Button onClick={handleCommand}>Start</Button> :
                <Button onClick={handleCommand}>Next</Button>}
            {command === "start" && <Counter><QuizStartCounter/></Counter>}
            {command === "show" && <QuizView currentQuiz={currentQuiz}/>}
            {command === "result" && <div>result</div>}
            {command === "final" && <div>final</div>}
            {/*<QuizView currentQuiz={currentQuiz}/>*/}
        </div>
    );
}
