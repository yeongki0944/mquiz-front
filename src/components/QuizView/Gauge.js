import * as React from "react";
import {ProgressBar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useRef, useState} from "react";
import {stompSend} from "../../function/WebSocket";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {useDispatch, useSelector} from "react-redux";
import {Content, Item, Text} from "../../LayOuts/LayOuts";
import {getNickname, getPinNum, getRole} from "../../function/localStorage";

/**
 * props:
 *  - quizPlay : quizPlay
 *  - TotalQcnt: 총 문제 수
 *  - timeprogress: 시간 진행률(1~100)
 */

export const Gauge = (props) => {
    const dispatch = useDispatch();

    const {quizPlay} = useSelector(state => state.quizPlay);

    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(100); // 0.1초

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    useInterval(
        () => {
            // Your custom logic here
            setCount(count + 100 / props.timeleft * 0.1);
        },
        count < 100 ? delay : null
    );

    useEffect(()=>{
            if(count === 101){
                return;
            }
            else if(count >= 100){
                if(getRole() === "HOST" ){ // 호스트

                }
                else{ // 클라이언트
                    dispatch(R_setData({key: "command", value: "SUBMIT"}));
                    stompSend("submit", {
                        pinNum: getPinNum(),
                        action: "SUBMIT",
                        nickName: getNickname(),
                        submit: {
                            answer: [],
                            answerTime: quizPlay.quiz.time,
                            quizNum: quizPlay.quiz.num
                        }
                    });
                }
                setCount(101)
            }
    },[count]);

    return (
        <Content sx={{width:'100%'}}>
            <Text sx={{color:'#FFC107',fontSize:'2vw'}} sm={{fontSize:'5vw'}}>
                문제 {props.Qnum} / {props.TotalQcnt}
            </Text>
            <Item sx={{place:'center', width:'100%'}}>
                <ProgressBar
                    style={{width:'95%'}}
                    animated
                    now={count < 100 ? count : 100}
                    label={parseInt((count / (100 / props.timeleft * 0.1))*0.1)}
                />
            </Item>
        </Content>
    )
}



