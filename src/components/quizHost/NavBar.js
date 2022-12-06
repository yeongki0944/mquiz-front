import * as React from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {Item_c} from "../LayOuts/LayOuts";

const Styled_NavBar = styled(BottomNavigation)`
    width: 100%;
    height: 5vh;
    @media (min-width: 767px) {
    }

    @media (min-width: 300px) and (max-width: 767px) {
        position: absolute;
        bottom: 0;
    }
`;

export const NavBar = () => {
    const history = useHistory();
    return (
            <Styled_NavBar showLabels>
                <BottomNavigationAction label="Main" onClick={() => {
                    history.push("/")
                }}/>
                <BottomNavigationAction label="DashBoard" onClick={() => {
                    history.push("/QHost")
                }}/>
                <BottomNavigationAction label="Find" onClick={() => {
                    history.push("/QHost/find")
                }}/>
                <BottomNavigationAction label="Report" onClick={() => {
                    history.push("/QHost/report")
                }}/>
            </Styled_NavBar>
    )
}
