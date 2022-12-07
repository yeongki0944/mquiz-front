import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import {stompSend} from "../../../function/WebSocket";
import {Btn, Card, Item, Item_c} from "../../LayOuts/LayOuts";
import {R_setData} from "../../../redux/reducers/quizplayReducer";
import {PlayActionBar} from "../PlayActionBar";


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

    const handleSubmit = () => { //선택형
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
            <Item sx={{place: 'center', display: 'block', height: '80%'}}>
                {Object.keys(currentQuiz.choiceList).map((item, index) => {
                    return (
                        <Item sx={{place: 'center', width: '25%', height: '100%',float:'left'}}
                              sm={{width: '50%', height: '50%'}}
                              key={index}
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
            <PlayActionBar sx={{place: 'center', display: 'block', height: '20%'}} handleSubmit={handleSubmit}/>
        </Item>
    )

}
