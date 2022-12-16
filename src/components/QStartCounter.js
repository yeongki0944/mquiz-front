import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {useEffect, useRef, useState} from "react";
import {Content, Img, Item} from "../layouts/LayOuts";

/**
 * props:
 *  컴포넌트 내부에서 처리
 */
export const QStartCounter = () => {

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
            <Item sx={{place: 'center'}}>
                <Img
                    src={"/img/count"+count+".png"}
                    sx={{width: '15vw', height: '15vw', position: 'absolute'}}
                    sm={{width: '30vw', height: '30vw'}}
                />
            </Item>
        </Content>
    )
}
