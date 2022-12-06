import {Link} from "react-router-dom";
import React from "react";
import {Item_b, Item_c, Item_t, Page_Gradiant} from "../../components/LayOuts/LayOuts";
import styled from "styled-components";

export const Item_b_Logo = styled(Item_b)`
    width: 100%;
    @media (min-width: 300px) and (max-width: 767px) {
        height:20vh;
    }
    @media (min-width: 767px) {
        height:30vh;
    }
`

export const Item_t_Content = styled(Item_t)`
    width: 100%;
    @media (min-width: 300px) and (max-width: 767px) {
        display: block;
        height: 80vh;
    }
    @media (min-width: 767px) {
        height: 60vh;
    }
`

const Card_Btn = styled(Item_c)`
    background: linear-gradient(50deg, #FF8B6A, #A5AEFF);
    border : 1px solid #FFD2BB;
    border-radius: 5px;
    border-shadow: 10 10 10px #D6F8B8;
    font-size: 2.5rem;
    font-weight: 600;
    display: flex;
    color: #fff;
    
    @media (min-width: 300px) and (max-width: 767px) {
        min-width: 350px;
        min-height: 250px;
        margin: 0 1rem;
        margin-top: 5rem; 
        
    }
    @media (min-width: 767px) {
        min-width: 350px;
        min-height: 250px;
        margin: 0 1rem;
    }
`;

export default function Home() {
    return (
        <Page_Gradiant>
            <Item_b_Logo>
                <img alt="complex" src="/img/logo.png"></img>
            </Item_b_Logo>
            <Item_t_Content>
                <Link to="/QHost">
                    <Card_Btn className={"btn"}>
                        퀴즈 만들기
                    </Card_Btn>
                </Link>
                <Link to="/QClient">
                    <Card_Btn className={"btn"}>
                        퀴즈 풀기
                    </Card_Btn>
                </Link>
            </Item_t_Content>
        </Page_Gradiant>
    );
}
