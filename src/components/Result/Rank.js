import {Item_c, Item_l, Item_r, Page_Default} from "../LayOuts/LayOuts";
import styled from "styled-components";
import {useSelector} from "react-redux";


const Content = styled(Item_c)`
    display: block;
    width: 100%;
    height: 100%;
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
export const Rank = (props) => {
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


