import {Link} from "react-router-dom";
import React from "react";
import {Item_c, Page_Gradiant} from "../components/LayOuts/LayOuts";
import styled from "styled-components";

export const Item = styled.div`
    margin :auto;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    @media (min-width: 300px) and (max-width: 767px) {
        display: block;
    }
    @media (min-width: 767px) {
        display: flex;    
    }
`

const Card_Btn = styled.div`
    background: linear-gradient(50deg, #FF8B6A, #A5AEFF);
    border : 1px solid #FFD2BB;
    border-radius: 5px;
    border-shadow: 10 10 10px #D6F8B8;
    margin: auto;
    font-size: 2.5rem;
    font-weight: 600;
    justify-content: center;
    align-items: center;
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
            <Item>
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
            </Item>
        </Page_Gradiant>
    );
}
