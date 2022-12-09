import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Content, Item, Page_Default} from "../LayOuts/LayOuts";


/*
* 참고 사이트 : https://velog.io/@yhko1992/react%EC%97%90%EC%84%9C-%EC%B9%B4%EC%9A%B4%ED%8A%B8%EB%8B%A4%EC%9A%B4%EC%9D%84-%ED%95%B4%EB%B3%BC%EA%B9%8C%EB%82%98
*/


/**
 * props:
 *  컴포넌트 내부에서 처리
 */
export const QuizStartCounter = () => {

    const [count, setCount] = useState(3);
    const [delay, setDelay] = useState(1000);

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
            setCount(count - 1);
        },
        count > 0 ? delay : null
    );

    return (
        <Content sx={{width: '100vw', height: '100vh'}}>
            <Item sx={{place:'center',fontWeight:'bold',color:'#fff',fontSize:'10rem'}} sm={{fontSize:'5rem'}}>{count > 0 ? count : "GO!"}</Item>
        </Content>
    )
}
