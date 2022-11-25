import * as React from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import styled from "styled-components";

const Styled_NavBar = styled(BottomNavigation)`
    width: 100%;
    height: 5vh;
`;

export const NavBar = (props) => {
    return (
        <Styled_NavBar showLabels>
            <BottomNavigationAction label="메뉴1"/>
            <BottomNavigationAction label="메뉴2"/>
            <BottomNavigationAction label="메뉴3"/>
        </Styled_NavBar>
    )
}
