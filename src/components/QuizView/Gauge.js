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
import {useDispatch} from "react-redux";

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

    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(100); // 0.1초

    let countValue = (100 / props.quizPlay.quiz.time * 0.1)

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
            setCount(count + countValue);
        },
        count < 100 ? delay : null
    );

    useEffect(()=>{
        if(count >= 100){
            if(props.quizPlay.nickName !== null){
                stompSend("submit", {
                    pinNum: props.quizPlay.pinNum,
                    action: "SUBMIT",
                    nickName: props.quizPlay.nickName,
                    submit: {
                        answer: [],
                        answerTime: props.quizPlay.quiz.time,
                        quizNum: props.quizPlay.quiz.num
                    }
                })
                dispatch(R_setData({key: "command", value: "SUBMIT"}));
            }
        }
    },[count])

    return (
        <div className={classes.content}>
            <div>
                문제 {props.quizPlay.quiz.num} / {props.TotalQcnt}
            </div>
            <div>
                <ProgressBar animated
                             now={count < 100 ? count : 101}
                             label={parseInt(count / countValue * 0.1)}/>
            </div>
        </div>
    )
}



