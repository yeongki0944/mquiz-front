import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {QuizView} from "../components/QuizView/QuizView";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {R_setCurrentShow} from "../redux/reducers/quizplayReducer";
import {QuizStartCounter} from "../components/QuizStartCounter";
import {styled} from "@mui/system";
import Paper from "@mui/material/Paper";


const Counter = styled(Paper)({
    width : '100%',
    height : '100vh',
});

export const QuizHostPlay = () => {
    const dispatch = useDispatch();

    //wait -> (count -> play ->result -> count) -> result
    const [gameStatus, setGameStatus] = useState("wait");
    const {quiz} = useSelector(state => state.quiz);
    const {quizPlay} = useSelector(state => state.quizPlay);
    const currentQuiz = quiz.quizData.find(item => item.num === quizPlay.currentShow);


    //이거 웹소캣이랑 연동
    const handleNext = () => {
        switch (gameStatus) {
            case "wait":
                setGameStatus("count");
                break;
            case "count":
                setGameStatus("play");
                break;
            case "play":
                setGameStatus("result");
                break;
            case "result":
                setGameStatus("count");
                break;
        }
    }

    return (
        <div id={"content"}>
            {/*<Counter><QuizStartCounter/></Counter>*/}
            {/*<Button onClick={handleNext}>Next</Button>*/}
            {/*if gaemStatus == wait button is start else button is next*/}
            {gameStatus === "wait" ? <Button onClick={handleNext}>Start</Button> : <Button onClick={handleNext}>Next</Button>}
            {gameStatus === "count" && <Counter><QuizStartCounter/></Counter>}
            {gameStatus === "play" && <QuizView quiz={currentQuiz}/>}
            {gameStatus === "result" && <div>result</div>}
            {/*<QuizView currentQuiz={currentQuiz}/>*/}
            {/*{gameStatus === "waiting" ? null : <QuizView currentQuiz={currentQuiz}/>}*/}
        </div>
    );
}
