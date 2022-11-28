import {Link} from "react-router-dom";
import React from "react";
import {Item_c, Page_Gradiant} from "../components/LayOuts/LayOuts";
import styled from "styled-components";


const Card_Btn = styled.div`
    // justify-content: center;
    // align-items: center;
    border : 2px solid #D47AE8;
    border-radius: 5px;
    border-shadow: 10 10 10px #D47AE8;
    @media (min-width: 300px) and (max-width: 767px) {
        // display: flex;
        // width: 50vh;
        background-color: #FFEBCC;
    }
    @media (min-width: 767px) {
        display: flex;
        width: 25vh;
        background-color: #FFEBCC;
        margin: 0 1rem;
    }
`;

export default function Home() {
    return (
        <Page_Gradiant>
            <Item_c>
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
            </Item_c>
        </Page_Gradiant>
    );
}
