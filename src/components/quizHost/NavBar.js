import * as React from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {Content, Item, Item_c, Text} from "../../LayOuts/LayOuts";

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
        <Item sx={{place: 'center', width: "100%", height: '5vh',backgroundColor:'rgba(0,0,0,0.5)'}} sm={{position:'absolute',bottom:0}}>
            <Item sx={{place: 'center'}} onClick={() => {
                history.push("/")
            }}>
                <Text sx={{color:'#fff',cursor:'pointer'}}>Home</Text>
            </Item>
            <Item sx={{place: 'center'}} onClick={() => {
                history.push("/QHost")
            }}>
                <Text sx={{color:'#fff',cursor:'pointer'}}>DashBoard</Text>
            </Item>
            <Item sx={{place: 'center',cursor:'pointer'}} onClick={() => {
                history.push("/QHost/find")
            }}>
                <Text sx={{color:'#fff'}}>Find</Text>
            </Item>
            <Item sx={{place: 'center',cursor:'pointer'}} onClick={() => {
                history.push("/QHost/report")
            }}>
                <Text sx={{color:'#fff'}}>Report</Text>
            </Item>
        </Item>
    )
}
