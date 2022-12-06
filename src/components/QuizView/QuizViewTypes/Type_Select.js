import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import Button from "@mui/material/Button";
import {stompSend} from "../../../function/WebSocket";
import {Item, Item_c} from "../../LayOuts/LayOuts";
import {R_setData} from "../../../redux/reducers/quizplayReducer";

const Content = styled(Item_c)`
  display: block;
  height: 85%;
`;
const Answers = styled(Item_c)`
    height: 95%;
    display: block;
`;

const AnswerArea = styled(Item_c)`
    float:left;
    @media (min-width: 300px) and (max-width: 767px) {
        height: 45%;
        width: 50%;
    }
    @media (min-width: 767px) {
        width: 50%;
    }
`

const Card_Btn = styled(Item_c)`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    
    @media (min-width: 300px) and (max-width: 767px) {
        height: 90%;
        width: 90%;
        min-height: 120px;
    }
    @media (min-width: 767px) {
        height: 90%;
        width: 90%;
        min-height: 100px;
        margin-bottom: 10px;
    }
`

export const Type_Select = (props) => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);
    const currentQuiz = props.currentQuiz;


    const setSelected = (e) => {
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
            answers.push("num" + item.innerHTML[0]);
        })
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

    const chkAnswer = (item) => {
        let chk = false;
        quizPlay.quiz.answer.forEach(ans => {
            console.log(item);
            console.log(ans);
            if (ans == item) {
                console.log("true");
                chk = true;
            }
        })
        console.log(chk);
        return chk;
    }


    if (quizPlay.command == "RESULT") {
        return (
            <Content sx={{display: "block"}}>
                {
                    Object.keys(currentQuiz.choiceList).map((item, index) => {
                        return (
                            <AnswerArea key={index}>
                                {
                                    chkAnswer(item) ?
                                        <Card_Btn>
                                            <Item sx={{color: 'red'}}>
                                                {currentQuiz.choiceList[item]}
                                            </Item>
                                        </Card_Btn>
                                        :
                                        <Card_Btn>
                                            {currentQuiz.choiceList[item]}
                                        </Card_Btn>
                                }
                            </AnswerArea>
                        )
                    })
                }
            </Content>
        )
    } else if (quizPlay.nickName === null) { //제작 시
        return (
            <Content>
                <Answers>
                    {currentQuiz.choiceList.num1 != "" &&
                        <AnswerArea><Card_Btn>{currentQuiz.choiceList.num1}</Card_Btn></AnswerArea>}
                    {currentQuiz.choiceList.num2 != "" &&
                        <AnswerArea><Card_Btn>{currentQuiz.choiceList.num2}</Card_Btn></AnswerArea>}
                    {currentQuiz.choiceList.num3 != "" &&
                        <AnswerArea><Card_Btn>{currentQuiz.choiceList.num3}</Card_Btn></AnswerArea>}
                    {currentQuiz.choiceList.num4 != "" &&
                        <AnswerArea><Card_Btn>{currentQuiz.choiceList.num4}</Card_Btn></AnswerArea>}
                </Answers>
                <Item sx={{display: 'flex'}}>
                    <Item_c><Button variant="contained" onClick={handleNext}>다음</Button></Item_c>
                    <Item_c><Button variant="contained" onClick={handleSkip}>건너뛰기</Button></Item_c>
                </Item>

            </Content>

        )
    } else {
        return (
            <Content>
                <Answers>
                    {currentQuiz.choiceList.num1 != "" &&
                        <AnswerArea onClick={setSelected}><Card_Btn
                            id={"num1"}>1.{currentQuiz.choiceList.num1}</Card_Btn></AnswerArea>
                    }
                    {currentQuiz.choiceList.num2 != "" &&
                        <AnswerArea onClick={setSelected}><Card_Btn
                            id={"num2"}>2.{currentQuiz.choiceList.num2}</Card_Btn></AnswerArea>
                    }
                    {currentQuiz.choiceList.num3 != "" &&
                        <AnswerArea onClick={setSelected}><Card_Btn
                            id={"num3"}>3.{currentQuiz.choiceList.num3}</Card_Btn></AnswerArea>
                    }
                    {currentQuiz.choiceList.num4 != "" &&
                        <AnswerArea onClick={setSelected}><Card_Btn
                            id={"num4"}>4.{currentQuiz.choiceList.num4}</Card_Btn></AnswerArea>
                    }
                </Answers>
                <Item_c><Button variant="contained" onClick={handleSubmit}>정답제출</Button></Item_c>

            </Content>
        );
    }


}
