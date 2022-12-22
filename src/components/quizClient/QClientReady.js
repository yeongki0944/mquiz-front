import * as React from 'react';
import {useSelector} from "react-redux";
import {Content, Img, Item, Text} from "../../layouts/LayOuts";
import {getNickname} from "../../function/localStorage";

/**
 * 대기방 component
 */
export function QClientReady() {
    return (
        <Content>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                    <Img
                        alt="complex"
                        src="/img/Spaceman.png"
                        sx={{width: '20vw', height: '20vw'}}
                        sm={{width: '50vw', height: '50vw'}}
                    />
            </Item>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                    <b>{getNickname()}</b>님이 입장했습니다.
                </Text>
            </Item>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                    화면에서 닉네임을 확인해 주세요
                </Text>
            </Item>
        </Content>
    );
}
