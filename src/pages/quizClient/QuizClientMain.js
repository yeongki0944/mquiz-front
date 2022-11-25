import * as React from 'react';
import {PinNumCheck} from "./components/ClientPinNumInput";
import styled from "styled-components";
const Page = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    background: linear-gradient(to right, rebeccapurple, salmon);
`;

const Item = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const QuizClientMain = () => {
    // pinNum -> nickName -> wait-> (count -> play ->result -> count) -> result
    return (
        <Page>
            <Item>
                <PinNumCheck/>
            </Item>
        </Page>
    );
}
