import {Item_c, Item_l, Item_r, Page_Default} from "./LayOuts/LayOuts";
import styled from "styled-components";
import {useSelector} from "react-redux";


const Content = styled(Item_c)`
    display: block;
    width: 100%;
    height: 100%;
`;
const Top_text = styled(Item_l)`
    display: block;
    width: 90%;
    height: 100%;
    // font-size: 4vw;
    font-weight: 600;
    line-height: 2.5rem;
`;
const Rank_sheet = styled(Item_c)`
    width: 100%;
    height: 100%;
    border: 1px solid darkorange;
    border-radius: 30px;
    // @media (min-width: 300px) and (max-width: 767px) {
    //     min-height: 100px;
    // }
    // @media (min-width: 767px) {
    //     min-height: 100px;
    // }
`;
const Rank_Container = styled(Item_l)`
    width: 20%;
    height: 100%;
`;
const Nick_Container = styled(Item_l)`
    width: 50%;
    height: 100%;
    // font-size: 10vw;
`;
const Score_Container = styled(Item_r)`
    width: 30%;
    height: 100%;
    // font-size: 10vw;
`;
const Img_container = styled(Item_c)`
    position: relative;
    text-align: center;
    color: black;
    width: 100%;
    height: 100%;
`;
const Img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;
const Img_text = styled(Item_c)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    color: black;
    font-size: 7vw;
`;
const Rank = (props) => {
    return (
        <Content>
            <Rank_sheet>
                <Rank_Container>
                    <Img_container>
                        <Img src="/img/Rank.png" alt=""/>
                        <Img_text>
                            {props.rank}
                        </Img_text>
                    </Img_container>
                </Rank_Container>
                <Nick_Container>
                    {props.nickName}
                </Nick_Container>
                <Score_Container>
                    {props.score}점
                </Score_Container>
            </Rank_sheet>
        </Content>
    )
}

const RankBox = () => {
    const {quizPlay} = useSelector(state => state.quizPlay);

    return (
        <div>
            {quizPlay.nickName != null && <Top_text>내 점수</Top_text> &&
                quizPlay.rank.map(
                    (item, index) => {
                        if (item.nickName === quizPlay.nickName) {
                            return (
                                <Rank
                                    key={index}
                                    rank={item.rank}
                                    nickName={item.nickName}
                                    score={item.score}
                                />
                            )
                        }
                    }
                )}
            <Top_text>참여자 점수</Top_text>
            {quizPlay.rank.map(
                (item, index) => {
                    //if rank == 1 or 2 or 3
                    if (item.rank === 1 || item.rank === 2 || item.rank === 3) {
                        return (
                            <Rank
                                key={index}
                                rank={item.rank}
                                nickName={item.nickName}
                                score={item.score}
                            />
                        )
                    }
                }
            )}
        </div>
    )

}


const Page_Content = styled(Item_c)`
    width: 60%;
    height: 60%;
`

export const Rank_Page = () => {
    return (
        <Page_Default>
            <Page_Content>
                <Item_c>
                    <RankBox/>
                </Item_c>
            </Page_Content>
        </Page_Default>
    )
}
