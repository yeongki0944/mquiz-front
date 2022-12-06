import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import Button from "@mui/material/Button";
import {stompSend} from "../../../function/WebSocket";
import {Btn, Card, Item, Item_c} from "../../LayOuts/LayOuts";
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
            if (ans == item) {
                console.log("true");
                chk = true;
            }
        })
        return chk;
    }

    return (
        <Item sx={{place: 'center', display: 'block'}}>
            <Item sx={{place: 'center', display: 'block', height: '90%'}}>
                {Object.keys(currentQuiz.choiceList).map((item, index) => {
                    return (
                        <Item sx={{place: 'center', float: 'left', width: '50%', height: '50%'}} key={index}
                              onClick={setSelected}>
                            {quizPlay.command === "RESULT" && chkAnswer(item) ?  //정답화면 정답일 시
                                <Card sx={{place: 'center',background:'orange'}} id={item}>
                                    {index + 1}.{currentQuiz.choiceList[item]}
                                </Card>
                                :
                                quizPlay.nickName === null && //호스트 화면
                                <Card sx={{place: 'center'}} id={item}>{index + 1}.{currentQuiz.choiceList[item]}</Card>

                            }

                            {quizPlay.command != "RESULT" && quizPlay.nickName != null && //클라이언트
                                <Card sx={{place: 'center'}} id={item}>{index + 1}.{currentQuiz.choiceList[item]}</Card>
                            }
                        </Item>
                    )
                })}

            </Item>
            <Item sx={{place: 'center', display: 'block', height: '10%'}}>
                {quizPlay.command === "RESULT" ? null :
                    quizPlay.nickName === null ?
                        <Item sx={{place: 'center', display: 'flex', margin: 'auto'}}>
                            <Btn sx={{place: 'center', height: '100%', width: '10%'}} onClick={handleNext}>다음</Btn>
                            <Btn sx={{place: 'center', height: '100%', width: '10%'}} onClick={handleSkip}>건너뛰기</Btn>
                        </Item>
                        :
                        <Btn sx={{place: 'center', height: '100%', width: '10%', margin: 'auto'}}
                             onClick={handleSubmit}>정답제출</Btn>
                }
            </Item>
        </Item>
    )

}
