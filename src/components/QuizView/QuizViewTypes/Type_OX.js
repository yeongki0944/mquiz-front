import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {R_setData} from "../../../redux/reducers/quizplayReducer";
import {Card, Item, Text} from "../../../layouts/LayOuts";
import {stompSend} from "../../../function/WebSocket";
import {PlayActionBar} from "../PlayActionBar";
import {getNickname, getPinNum, getRole} from "../../../function/localStorage";
import {getSolvedTime} from "../../../function/Timer";
import {setCommand} from "../../../function/reduxFunction";

export const Type_OX = () => {
    const dispatch = useDispatch();
    const {quizPlay} = useSelector(state => state.quizPlay);

    const setSelected = (e) => {
        if (e.target.id === "selected") {
            e.target.id = "";
            e.target.style.border = "none";
        } else {
            //delete all selected
            const selected = document.querySelectorAll("#selected");
            selected.forEach(item => {
                item.id = "";
                item.style.border = "none";
            })
            e.target.id = "selected";
            e.target.style.border = "1px solid orange";
        }
    }

    const handleSubmit = () => { //OX
        const selected = document.getElementById("selected");
        const answers = [selected.innerText];
        stompSend("submit", {
            pinNum: getPinNum(),
            action: "SUBMIT",
            nickName: getNickname(),
            submit: {
                answer: answers,
                answerTime: getSolvedTime(),
                quizNum: quizPlay.quiz.num
            }
        });
        setCommand("SUBMIT");
    }

    return (
        <Item sx={{place: 'center', display: 'block'}}>
            <Item sx={{place: 'center', display: 'flex', height: '80%'}}>
                {
                    quizPlay.command === "RESULT" && quizPlay.quiz.answer[0] === "O" ?  //정답화면 정답일 시
                    <Item sx={{place: 'center',display: 'flex'}} sm={{display:'block'}}>
                        <Card sx={{place: 'center',minWidth: '45%',margin:'auto',background:'orange'}} sm={{minHeight:'45%',minWidth:'45%'}}>
                            <Text sx={{fontSize:'4rem'}} sm={{fontSize:'3rem'}}>O</Text>
                        </Card>
                        <Card sx={{place: 'center',minWidth: '45%',margin:'auto',backgroundColor:'rgba(255,255,255,0.5)'}} sm={{minHeight:'45%',minWidth:'45%'}}>
                            <Text sx={{fontSize:'4rem'}} sm={{fontSize:'3rem'}}>X</Text>
                        </Card>
                    </Item>
                    :
                    quizPlay.command === "RESULT" && quizPlay.quiz.answer[0] === "X" ?
                        <Item sx={{place: 'center', width: '100%', height: '100%', display: 'flex'}} sm={{display:'block'}}>
                            <Card sx={{place: 'center',minWidth: '45%',margin:'auto',backgroundColor:'rgba(255,255,255,0.5)'}} sm={{minHeight:'45%',minWidth:'45%'}}>
                                <Text sx={{fontSize:'4rem'}} sm={{fontSize:'3rem'}}>O</Text>
                            </Card>
                            <Card sx={{place: 'center',minWidth: '45%',margin:'auto',background:'orange'}} sm={{minHeight:'45%',minWidth:'45%'}}>
                                <Text sx={{fontSize:'4rem'}} sm={{fontSize:'3rem'}}>X</Text>
                            </Card>
                        </Item>
                        :
                        getRole() === "HOST" && //호스트 화면
                        <Item sx={{place: 'center', width: '100%', height: '100%',display:'flex'}} sm={{}}>
                            <Card sx={{place: 'center',minWidth: '45%',margin:'auto',backgroundColor:'rgba(255,255,255,0.5)'}} sm={{minHeight:'45%',minWidth:'45%'}}>
                                <Text sx={{fontSize:'4rem'}} sm={{fontSize:'3rem'}}>O</Text>
                            </Card>
                            <Card sx={{place: 'center',minWidth: '45%',margin:'auto',backgroundColor:'rgba(255,255,255,0.5)'}} sm={{minHeight:'45%',minWidth:'45%'}}>
                                <Text sx={{fontSize:'4rem'}} sm={{fontSize:'3rem'}}>X</Text>
                            </Card>
                        </Item>
                }
                {quizPlay.command !== "RESULT" && getRole() === "CLIENT" && //클라이언트 화면
                    <Item sx={{place: 'center', width: '100%', height: '100%', display: 'flex'}} sm={{}}>
                        <Card sx={{place: 'center',minWidth: '45%',margin:'auto',backgroundColor:'rgba(255,255,255,0.5)'}} sm={{minHeight:'45%',minWidth:'45%'}} onClick={setSelected}>
                            <Text sx={{fontSize:'4rem'}} sm={{fontSize:'3rem'}}>O</Text>
                        </Card>
                        <Card sx={{place: 'center',minWidth: '45%',margin:'auto',backgroundColor:'rgba(255,255,255,0.5)'}} sm={{minHeight:'45%',minWidth:'45%'}} onClick={setSelected}>
                            <Text sx={{fontSize:'4rem'}} sm={{fontSize:'3rem'}}>X</Text>
                        </Card>
                    </Item>
                }

            </Item>
            <PlayActionBar sx={{place: 'center', display: 'block', height: '20%'}} handleSubmit={handleSubmit}/>
        </Item>
    )
}
