import * as React from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

const Styled_NavBar = styled(BottomNavigation)`
    width: 100%;
    height: 5vh;
`;

export const NavBar = () => {
    const history = useHistory();
    return (
        <Styled_NavBar showLabels>
            <BottomNavigationAction label="Main" onClick={()=>{history.push("/")}}/>
            <BottomNavigationAction label="DashBoard" onClick={()=>{history.push("/QHost")}}/>
            <BottomNavigationAction label="Find" onClick={()=>{history.push("/QHost/find")}}/>
            <BottomNavigationAction label="Report" onClick={()=>{history.push("/QHost/report")}}/>
        </Styled_NavBar>
    )
}
