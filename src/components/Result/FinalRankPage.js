import styled from "styled-components";
import {Btn, Content, Item, Item_c, Item_l, Page, Page_Default} from "../LayOuts/LayOuts";
import {useSelector} from "react-redux";
import {Rank} from "./Rank";
import {useEffect, useState} from "react";
import {Answer} from "./Answer";
import {Avatar, Button} from "@mui/material";
import {stompSend} from "../../function/WebSocket";
import {PinNum} from "../PinNum";
import * as React from "react";

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



export const FinalRankPage = (props) => {
    const {quizPlay} = useSelector(state => state.quizPlay);

    const [rank, setRank] = useState();
    const [rankScore, setRankScore] = useState();

    useEffect(()=>{
        quizPlay.rank.map((item)=>{
            if(item.nickName === quizPlay.nickName){
                setRank(item.rank);
                setRankScore(item.rankScore);
            }
        })
    },[]);

    return (
        <Item sx={{
            display: "block",
            maxWidth: "1200px",
            width: "100%",
            height: "100%",
            margin: "auto",
            background: "#ffffff"
        }}>
            <Item sx={{place: "left", borderBottom: "1px solid black", height: "5%"}}>
                <PinNum pinNum={quizPlay.pinNum}/>
            </Item>

            {quizPlay.nickName !== null ? (
                <Item sx={{height: "40%", place: "center"}}>
                    <Avatar sx={{width: 300, height: 300}}><h2>{quizPlay.nickName}</h2></Avatar>
                </Item>
            ) : (
                <Item sx={{place: "center", display: "block", height: '', margin: "auto"}}>
                    {quizPlay.rank.map(
                        (item, index) => {
                            if (item.rank === 1 || item.rank === 2 || item.rank === 3) {
                                return (
                                    <Item key={index} sx={{place: "center", height: "30%", margin: "30px"}}>
                                        <Rank
                                            rank={item.rank}
                                            nickName={item.nickName}
                                            score={item.rankScore}
                                        />
                                    </Item>
                                )
                            }
                        }
                    )}
                </Item>
            )}

            {quizPlay.nickName !== null &&
                <Item sx={{place: "center", height: "10%"}}><h1>당신은 <b>{rank}위</b> 입니다.</h1></Item>
            }

            {quizPlay.nickName !== null &&
                <Item sx={{place: "center", height: "10%"}}><h1>({rankScore} 점)</h1></Item>
            }

            {quizPlay.nickName !== null && (
                <Item sx={{
                    height: "25%",
                    border: "1px solid #f5f5f5",
                    background: "#f5f5f5",
                    display: "flex",
                    place: "center"
                }}>
                    <Item sx={{place: "center", width: "35%"}}>
                        <h2>총 참가자 : {quizPlay.userList.length}명</h2>
                    </Item>
                    <Item sx={{place: "center", width: "65%"}}>
                        <h2>총 {quizPlay.quiz.num}문제 중, N문제 정답 / N문제 오답 </h2>
                    </Item>
                </Item>
            )}


            <Item sx={{place: "bottom", height: "10%"}}>
                <Btn sx={{place: "center"}} onClick={()=>{

                }}>
                    화면 캡처
                </Btn>
                <Btn sx={{place: "center"}} onClick={()=>{

                }}>
                    확인
                </Btn>
            </Item>
        </Item>
    )
}
