import {Box, LinearProgress} from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {ProgressBar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useRef, useState} from "react";
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    content: {
        width: "100%",
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
 *  - Qnum: 현재 문제 번호
 *  - TotalQcnt: 총 문제 수
 *  - timeprogress: 시간 진행률(1~100)
 *  - timeleft: 남은 시간
 */

export const Gauge = (props) => {
    const classes = useStyles();
    const [count, setCount] = useState(1);
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
            setCount(count + 0.1);
        },
        count < 100 ? delay : null
    );

    return (
        <div className={classes.content}>
            <div>
                문제 {props.Qnum} / {props.TotalQcnt}
            </div>
            <div>
                <ProgressBar animated now={count < 100 ? count : setCount(0)} label={parseInt(count)}/>
            </div>
        </div>
    )
}



