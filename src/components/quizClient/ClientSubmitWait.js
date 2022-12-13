import * as React from 'react';
import {Content, Item} from "../../LayOuts/LayOuts";
import {CircularProgress} from "@mui/material";

export function ClientSubmitWait() {
    return (
        <Content>
            <Item sx={{place:'center', marginBottom:'15px'}} sm={{place:'center'}}>
                {/* 대기 프로그래스 바 */}
                <CircularProgress size={150}/>
                <img
                    alt={"test"}
                    src={"/img/logo192.png"}
                    style={{
                        position:"absolute",
                        width:100,
                        height:100
                }}/>
            </Item>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                <h3>정답을 제출했습니다!</h3>
            </Item>
            <Item sx={{place:'center'}} sm={{place:'center'}}>
                <h3>잠시 기다려주세요!!</h3>
            </Item>
        </Content>
    );
}
