import styled from "styled-components";
import {Btn, Content, Item, Item_c, Item_l, Page_Default} from "../../LayOuts/LayOuts";
import {useSelector} from "react-redux";
import {Rank} from "./Rank";
import {useState} from "react";
import {Answer} from "./Answer";
import {Button} from "@mui/material";
import {stompSend} from "../../function/WebSocket";

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
    // const {quizPlay} = useSelector(state => state.quizPlay);

    return (
        <div>
            {props.quizPlay.nickName != null && <Top_text>내 점수</Top_text> &&
                props.quizPlay.rank.map(
                    (item, index) => {
                        if (item.nickName === props.quizPlay.nickName) {
                            return (
                                <Rank
                                    key={index}
                                    rank={item.rank}
                                    nickName={item.nickName}
                                    score={item.rankScore}
                                />
                            )
                        }
                    }
                )}
            <Top_text>참여자 점수</Top_text>
            {props.quizPlay.rank.map(
                (item, index) => {
                    //if rank == 1 or 2 or 3
                    if (item.rank === 1 || item.rank === 2 || item.rank === 3) {
                        return (
                            <Rank
                                key={index}
                                rank={item.rank}
                                nickName={item.nickName}
                                score={item.rankScore}
                            />
                        )
                    }
                }
            )}
        </div>
    )

}

export const Rank_Page = () => {
    const {quizPlay} = useSelector(state => state.quizPlay);
    const [view, setView] = useState('answer');

    return (
        <Item sx={{place: 'center', display: 'block', maxWidth: '1200px', margin: 'auto', background: '#f5f5f5'}}>
            <Item sx={{place: 'center', height: '90vh'}}>
                {view === 'rank' && <RankBox quizPlay={quizPlay}/>}
                {view === 'answer' && <Answer currentQuiz={quizPlay.quiz}/>}
            </Item>
            <Item sx={{place: 'center', height: '10vh'}}>
                {view === 'rank' && <Btn sx={{place: 'center'}} onClick={() => {
                    setView("answer");
                }}>정답보기</Btn>
                }
                {view === 'answer' &&
                    <Btn sx={{place: 'center'}}
                         onClick={() => {
                             setView("rank");
                         }}>결과보기</Btn>
                }
                {quizPlay.nickName === null &&
                    <Btn sx={{place: 'center'}}
                         onClick={() => {
                             stompSend("start", {
                                 pinNum: quizPlay.pinNum,
                                 command: "START",
                             })
                         }}>
                        다음문제
                    </Btn>
                }
            </Item>
        </Item>
    )
}
