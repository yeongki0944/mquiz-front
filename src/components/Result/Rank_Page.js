import styled from "styled-components";
import {Btn, Content, Item, Item_c, Item_l, Page_Default} from "../../LayOuts/LayOuts";
import {useSelector} from "react-redux";
import {Rank} from "./Rank";
import {useState} from "react";
import {Answer} from "./Answer";
import {Button} from "@mui/material";
import {stompSend} from "../../function/WebSocket";
import {VolumeControlButton} from "../VolumeControlButton";
import * as React from "react";
import {getRole} from "../../function/localStorage";

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
            {
                props.quizPlay.nickName != null
                && <Item sx={{
                    place: 'left',
                    display: 'block',
                    width: '90%',
                    height: '100%',
                    // font-size: 4vw;
                    fontWeight: '600',
                    lineHeight: '2.5rem',
                }}>
                    내 점수
                </Item>
                && props.quizPlay.rank.map(
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
                )
            }
            <Item sx={{
                place: 'left',
                display: 'block',
                width: '90%',
                height: '100%',
                // font-size: 4vw;
                fontWeight: '600',
                lineHeight: '2.5rem',
            }}>
                참여자 점수
            </Item>
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
        <Content>
            <VolumeControlButton sx={{place: 'top-right', height: '5vh'}}/>
            <Item sx={{place: 'center', height: '85vh'}}>
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
            </Item>
        </Content>
    )
}
