import * as React from 'react';
import {Item_c, Page_Gradiant} from "../../components/LayOuts/LayOuts";
import {PinNumCheck} from "../../components/quizClient/ClientPinNumInput";



export const QuizClientMain = () => {
    // pinNum -> nickName -> wait-> (count -> play ->result -> count) -> result
    return (
        <Page_Gradiant>
            <Item_c>
                <PinNumCheck/>
            </Item_c>
        </Page_Gradiant>
    );
}
