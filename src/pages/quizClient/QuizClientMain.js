import * as React from 'react';
import {Item, Page} from "../../LayOuts/LayOuts";
import {PinNumCheck} from "../../components/quizClient/ClientPinNumInput";



export const QuizClientMain = () => {
    // pinNum -> nickName -> wait-> (count -> play ->result -> count) -> result
    return (
        <Page sx={{bg:"grad-right", grad1:"rebeccapurple", grad2:"salmon"}}>
            <Item sx={{place:"center"}} sm={{place:'center'}}>
                <PinNumCheck/>
            </Item>
        </Page>
    );
}
