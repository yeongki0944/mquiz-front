import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {QuizView} from "../components/QuizView/QuizView";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {QuizStartCounter} from "../components/QuizStartCounter";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";
import {R_setCurrentShow_play} from "../redux/reducers/quizplayReducer";


const Counter = styled(Paper)({
    width: '100%',
    height: '100vh',
});

export const QuizHostPlay = () => {
    const dispatch = useDispatch();

    //wait -> (count -> play ->result -> count) -> result
    const [gameStatus, setGameStatus] = useState("wait");
    const {quizPlay} = useSelector(state => state.quizPlay);
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = (quiz.quizData.find(item => item.num === quizPlay.currentShow));

    useEffect(() => {
        // console.log(quiz);
        // console.log(currentQuiz);
    }, []);

    //이거 웹소캣이랑 연동
    const handleNext = () => {
        switch (gameStatus) {
            case "wait":
                setGameStatus("start");
                break;
            case "start":
                setGameStatus("result");
                break;
            case "show": //start 이후 자동
                setGameStatus("result");
                break;
            case "result":
                dispatch(R_setCurrentShow_play(quizPlay.currentShow + 1));
                setGameStatus("start");
                break;
        }
    }

    useEffect(() => {
        if (gameStatus === "start") {
            setTimeout(() => {
                setGameStatus("show");
            }, 3000);
        }
    }, [gameStatus]);

    return (
        <div id={"content"}>
            {gameStatus === "wait" ? <Button onClick={handleNext}>Start</Button> :
                <Button onClick={handleNext}>Next</Button>}
            {gameStatus === "start" && <Counter><QuizStartCounter/></Counter>}
            {gameStatus === "show" && <QuizView currentQuiz={currentQuiz}/>}
            {gameStatus === "result" && <div>result</div>}
            {gameStatus === "final" && <div>final</div>}
            {/*<QuizView currentQuiz={currentQuiz}/>*/}
        </div>
    );
}
