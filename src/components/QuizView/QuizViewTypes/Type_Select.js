import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import {stompSend} from "../../../function/WebSocket";
import {Card, Item} from "../../../layouts/LayOuts";
import {R_setData} from "../../../redux/reducers/quizplayReducer";
import {PlayActionBar} from "../PlayActionBar";
import {getNickname, getPinNum, getRole} from "../../../function/localStorage";
import {getSolvedTime} from "../../../function/Timer";
import {setCommand} from "../../../function/reduxFunction";


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
            e.target.style.border = "3px solid orange";
        }
    }

    const handleSubmit = () => { //선택형
        const selected = document.querySelectorAll("#selected");
        const answers = [];

        selected.forEach(item => {
            answers.push("num" + item.innerHTML[0]);
        })
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

    const chkAnswer = (item) => {
        let chk = false;
        quizPlay.quiz.answer.forEach(ans => {
            if (ans == item) {
                chk = true;
            }
        })
        return chk;
    }

    return (
        <Item sx={{place: 'center', display: 'block'}}>
            <Item sx={{place: 'center', display: 'block', height: '80%'}}>
                {Object.keys(currentQuiz.choiceList).map((item, index) => {
                    return (
                        <Item sx={{place: 'center', width: '25%', height: '100%', float: 'left'}}
                              sm={{width: '50%', height: '50%'}}
                              key={index}
                              >
                            {quizPlay.command === "RESULT" ?  //정답화면 정답일 시
                                currentQuiz.choiceList[item] != "" ?
                                        chkAnswer(item) ?
                                            <Card sx={{width:'90%',height:'90%',backgroundColor:'orange',fontSize:'2rem'}}
                                                  sm={{fontSize:'1rem'}}
                                                  id={item}>{index + 1}.{currentQuiz.choiceList[item]}</Card>
                                            :
                                            <Card sx={{width:'90%',height:'90%',backgroundColor:'rgba(255,255,255,0.5)',fontSize:'2rem'}}
                                                  sm={{fontSize:'1rem'}}
                                                  id={item}>{index + 1}.{currentQuiz.choiceList[item]}</Card>

                                    : null
                                :
                                getRole() === "HOST" && //호스트 화면
                                currentQuiz.choiceList[item] != "" ?
                                    <Card sx={{width:'90%',height:'90%',backgroundColor:'rgba(255,255,255,0.5)',fontSize:'2rem'}}
                                          sm={{fontSize:'1rem'}}
                                          id={item}>{index + 1}.{currentQuiz.choiceList[item]}</Card>
                                    : null

                            }

                            {quizPlay.command != "RESULT" && getRole() === "CLIENT" && //클라이언트
                            currentQuiz.choiceList[item] != "" ?
                                <Card sx={{width:'90%',height:'90%',backgroundColor:'rgba(255,255,255,0.5)',fontSize:'2rem'}}
                                      sm={{fontSize:'1rem'}}
                                      id={item} onClick={setSelected}>{index + 1}.{currentQuiz.choiceList[item]}</Card>
                                : null
                            }
                        </Item>
                    )
                })}

            </Item>
            <Item sx={{place:'center',width:'100%',height:'20%'}}>
                <PlayActionBar sx={{place: 'center', display: 'block',width:'100%'}} handleSubmit={handleSubmit}/>
            </Item>
        </Item>
    )

}
