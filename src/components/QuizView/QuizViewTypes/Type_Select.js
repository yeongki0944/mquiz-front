import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import './QuizTypes.css';
import styled from "styled-components";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {R_setAnswer} from "../../../redux/reducers/quizplayReducer";
import {stompSend} from "../../../function/WebSocket";

const Card_Btn = styled.div`
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    border-radius: 5px;
        
    @media (min-width: 300px) and (max-width: 767px) {
        margin: 5px;
        width:45%;
        height: 15vh;
        float:left;
    }
    @media (min-width: 767px) {
        margin : 10px;
        width:45%;
        height: 15vh;
        display: block;
        float: left;
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
`;

export const Type_Select = () => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const {quizPlay} = useSelector(state => state.quizPlay);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);


    const setSelected = (e) => {
        console.log(e.target.id);
        if (e.target.id === "selected") {
            e.target.id = "";
            e.target.style.border = "none";
        } else {
            e.target.id = "selected";
            e.target.style.border = "1px solid orange";
        }
    }

    // dispatch(R_setAnswer({answer: quizPlay.submit.answer.concat(ans),answerTime: 0}));
    // dispatch(R_setAnswer(answer.filter(item => item !== name)));

    const handleSubmit = () => {
        const selected = document.querySelectorAll("#selected");
        const answers = [];
        selected.forEach(item => {
            const className = item.className.split(" ").find(item => item.startsWith("num"));
            answers.push(className);
        })
        dispatch(R_setAnswer({answer: answers, answerTime: 0}));
        stompSend("submit", {
            pinNum: quizPlay.pinNum,
            quizNum: quizPlay.quizNum,
            nickName: quizPlay.nickName,
            submit:{score: 100}
        });
    }


    if (quizPlay.nickName === null) { //제작 시
        return (
            <div>
                {currentQuiz.choiceList.num1 != "" && <Card_Btn>{currentQuiz.choiceList.num1}</Card_Btn>}
                {currentQuiz.choiceList.num2 != "" && <Card_Btn>{currentQuiz.choiceList.num2}</Card_Btn>}
                {currentQuiz.choiceList.num3 != "" && <Card_Btn>{currentQuiz.choiceList.num3}</Card_Btn>}
                {currentQuiz.choiceList.num4 != "" && <Card_Btn>{currentQuiz.choiceList.num4}</Card_Btn>}
            </div>

        )
    } else {
        return (
            <div>
                {currentQuiz.choiceList.num1 != "" &&
                    <Card_Btn onClick={setSelected} className="num1">{currentQuiz.choiceList.num1}</Card_Btn>
                }
                {currentQuiz.choiceList.num2 != "" &&
                    <Card_Btn onClick={setSelected} className="num2">{currentQuiz.choiceList.num2}</Card_Btn>
                }
                {currentQuiz.choiceList.num3 != "" &&
                    <Card_Btn onClick={setSelected} className="num3">{currentQuiz.choiceList.num3}</Card_Btn>
                }
                {currentQuiz.choiceList.num4 != "" &&
                    <Card_Btn onClick={setSelected} className="num4">{currentQuiz.choiceList.num4}</Card_Btn>
                }
                <Typography variant="h5" component="div" align='center'>
                    <Button variant="contained" onClick={handleSubmit}>정답제출</Button>
                </Typography>

            </div>
        );
    }


}
