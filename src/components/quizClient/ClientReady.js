import * as React from 'react';
import {useSelector} from "react-redux";
import {Content, Item} from "../../LayOuts/LayOuts";

/**
 * 대기방 component
 */
export function ClientReady() {
    const {quizPlay} = useSelector(state => state.quizPlay);

    return (
        <Content>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                    <img
                        alt="complex"
                        src="/img/logo192.png"
                        style={{margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '100%'}}
                    />
            </Item>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                <h3><b>{quizPlay.nickName}</b>님이 입장했습니다.</h3>
            </Item>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                <h3>화면에서 닉네임을 확인해 주세요</h3>
            </Item>
        </Content>
    );
}
