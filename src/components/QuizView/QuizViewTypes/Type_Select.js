import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {stompSend} from "../../../function/WebSocket";
import {Content, Item, Item_c} from "../../LayOuts/LayOuts";
import {R_setData} from "../../../redux/reducers/quizplayReducer";
import {AnswerBox} from "./AnswerBox";


export const Type_Select = (props) => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);
    const currentQuiz = props.currentQuiz;


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

    const handleSubmit = () => {
        const selected = document.querySelectorAll("#selected");
        const answers = [];
        selected.forEach(item => {
            const className = item.className.split(" ").find(item => item.startsWith("num"));
            answers.push(className);
        })
        // dispatch(R_setAnswer({answer: answers, answerTime: 0}));
        stompSend("submit", {
            pinNum: quizPlay.pinNum,
            action: "SUBMIT",
            nickName: quizPlay.nickName,
            submit: {
                answer: answers,
                answerTime: 1,
                quizNum: quizPlay.quiz.num
            }
        });
        dispatch(R_setData({key: "command", value: "SUBMIT"}));

    }

    const handleSkip = () => {
        stompSend("skip", {
            pinNum: quizPlay.pinNum,
            action: "COMMAND",
            command: "START"
        });
    }
    const handleNext = () => {
        stompSend("result", {
            pinNum: quizPlay.pinNum,
            action: "COMMAND",
            command: "RESULT"
        });
    }

    if (!quizPlay.nickName) {
        return (
            <Content sx={{display: 'block', height: '85%'}}>
                <Item sx={{place: 'center', display: 'block', height: '95%', width: '100%'}}>
                    {
                        Object.keys(currentQuiz.choiceList).map((item, index) => {
                            if (currentQuiz.choiceList[item] != "") {
                                return (
                                    <AnswerBox key={index} answer={currentQuiz.choiceList[item]}/>
                                )
                            }
                        })
                    }
                </Item>
                <Item sx={{place: 'center', width: '100%'}}><Button variant="contained" onClick={handleNext}>다음</Button></Item>
                <Item sx={{place: 'center', width: '100%'}}><Button variant="contained"
                                                                    onClick={handleSkip}>건너뛰기</Button></Item>
            </Content>
        )
    } else {
        return (
            <Content xs={{width: '100%'}}>
                <Item sx={{place: 'center', display: 'block', height: '95%', width: '100%'}}>
                    {
                        Object.keys(currentQuiz.choiceList).map((item, index) => {
                            if (currentQuiz.choiceList[item] != "") {
                                return (
                                    <AnswerBox key={index} answer={currentQuiz.choiceList[item]} onClick={setSelected}/>
                                )
                            }
                        })
                    }
                </Item>
                <Item sx={{width: '100%'}}><Button variant="contained" onClick={handleSubmit}>정답제출</Button></Item>
            </Content>
        );
    }


}
