import * as React from 'react';
import {PinNumCheck} from "../../components/quizClient/ClientPinNumInput";
import {Item_c, Page_Gradiant} from "../../components/LayOuts/LayOuts";
import styled from "styled-components";

const Item_c_full = styled(Item_c)`
    width: 100%;
    height: 100%;
`;


export const QuizClientMain = () => {
    // pinNum -> nickName -> wait-> (count -> play ->result -> count) -> result
    return (
        <Page_Gradiant>
            <Item_c_full>
                <PinNumCheck/>
            </Item_c_full>
        </Page_Gradiant>
    );
}
