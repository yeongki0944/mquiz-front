import * as React from 'react';
import {Content, Img, Item, Text} from "../../layouts/LayOuts";
import {CircularProgress} from "@mui/material";

export function QClientSubmitWait() {
    return (
        <Content>
            <Item sx={{place:'center', marginBottom:'15px'}} sm={{place:'center'}}>
                {/* 대기 프로그래스 바 */}
                <CircularProgress size={'20vh'} color={'error'}/>
                <Img
                    alt="complex"
                    src="/img/Spaceman_dabbing.png"
                    sx={{width: '15vw', height: '15vw',position:'absolute'}}
                    sm={{width: '50vw', height: '50vw'}}
                />
            </Item>
            <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                정답을 제출했습니다!
            </Text>
            <Text sx={{color:'#FFC107',fontSize:'3vw'}} sm={{fontSize:'6vw'}}>
                잠시 기다려주세요!!
            </Text>
        </Content>
    );
}
