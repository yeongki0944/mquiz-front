import styled from "styled-components";
import {Content, Item, Item_c, Item_l, Page, Page_Default} from "../LayOuts/LayOuts";
import {useSelector} from "react-redux";
import {Rank} from "./Rank";
import {useState} from "react";
import {Answer} from "./Answer";
import {Button} from "@mui/material";
import {stompSend} from "../../function/WebSocket";
import {PinNum} from "../PinNum";

const Top_text = styled(Item_l)`
    display: block;
    width: 90%;
    height: 100%;
    // font-size: 4vw;
    font-weight: 600;
    line-height: 2.5rem;
`;

const Page_Content = styled(Item_c)`
    display: block;
    width: 60%;
    height: 60%;
`
const RankBox = (props) => {

}

export const FinalRankPage = () => {
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [view, setView] = useState('answer');

    if(quizPlay.nickName === null){
        return (
            <Content>

            </Content>
        )
    }else{
        return (
            <Page sx={{bg:"#ffffff"}}>
                <Content sx={{display:"block", margin:10}}>
                    <Item sx={{place:"left", margin: 10, borderBottom:"1px solid black"}}>
                        <PinNum pinNum={quizPlay.pinNum}/>
                    </Item>
                    <Item sx={{height:350, place:"center", margin:10}}>
                        프로필 사진
                    </Item>
                    <Item sx={{matgin:10, place:"center"}}>
                        <h1>당신은 <b>{quizPlay.rank}위</b> 입니다.</h1>
                    </Item>
                    <Item sx={{matgin:10, place:"center"}}>
                        <h1>({quizPlay.rank} 점)</h1>
                    </Item>
                    <Item sx={{margin:100, height: 200, border:"1px solid #f5f5f5", background:"#f5f5f5", display:"flex"}}>
                        <Item sx={{margin:25}}>
                                <h2>test_test</h2>
                        </Item>
                        <Item sx={{margin:25}}>
                            <h2>test_test</h2>
                        </Item>
                    </Item>
                </Content>
            </Page>
        )
    }
}
