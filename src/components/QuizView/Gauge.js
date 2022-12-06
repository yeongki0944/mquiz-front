import {Box, LinearProgress} from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {ProgressBar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useRef, useState} from "react";
import styled from 'styled-components';
import {stompSend} from "../../function/WebSocket";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        width: "100%",
        // height: "100%",
        padding: theme.spacing(2),
        textAlign: "center",
        // verticalAlign: "middle",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // margin: "auto",
    },
    item: {
        width: "10%",
        padding: theme.spacing(2),
        verticalAlign: "middle",
        alignItems: "center",
        justifyContent: "center",
    },
    progress: {
        width: "90%",
        padding: theme.spacing(2),
    },
}));

/**
 * props:
 *  - quizPlay : quizPlay
 *  - TotalQcnt: 총 문제 수
 *  - timeprogress: 시간 진행률(1~100)
 */

export const Gauge = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {quizPlay} = useSelector(state => state.quizPlay);

    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(100); // 0.1초
    const [countValue, setCountValue] = useState(1);

    function useInterval(callback, delay) {
        const savedCallback = useRef();
        if(countValue === 1){
            setCountValue(100 / quizPlay.quiz.time * 0.1);
        }

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
            setCount(count + countValue);
        },
        count < 100 ? delay : null
    );

    useEffect(()=>{
            if(count === 101){
                return;
            }
            else if(count > 100){
                if(quizPlay.nickName === null ){ // 호스트
                    
                }
                else{ // 클라이언트
                    stompSend("submit", {
                        pinNum: quizPlay.pinNum,
                        action: "SUBMIT",
                        nickName: quizPlay.nickName,
                        submit: {
                            answer: [],
                            answerTime: quizPlay.time,
                            quizNum: quizPlay.num
                        }
                    });
                    dispatch(R_setData({key: "command", value: "SUBMIT"}));
                }
                setCount(101)
            }
    },[count]);

    return (
        <div className={classes.content}>
            <div>
                문제 {quizPlay.quiz.num} / {props.TotalQcnt}
            </div>
            <div>
                <ProgressBar animated
                             now={count < 100 ? count : 100}
                             label={parseInt(count / countValue * 0.1)}/>
            </div>
        </div>
    )
}



