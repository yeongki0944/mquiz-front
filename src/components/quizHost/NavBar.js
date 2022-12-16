import * as React from "react";
import {useHistory} from "react-router-dom";
import {Item, Text} from "../../layouts/LayOuts";
import {redirectPage} from "../../function/common";


export const NavBar = () => {
    const history = useHistory();
    return (
        <Item sx={{place: 'center', width: "100%", height: '5vh',backgroundColor:'rgba(0,0,0,0.5)'}} sm={{position:'absolute',bottom:0}}>
            <Item sx={{place: 'center'}} onClick={() => {
                redirectPage("MAIN");
            }}>
                <Text sx={{color:'#fff',cursor:'pointer'}}>Home</Text>
            </Item>
            <Item sx={{place: 'center'}} onClick={() => {
                redirectPage("QHOST");
            }}>
                <Text sx={{color:'#fff',cursor:'pointer'}}>DashBoard</Text>
            </Item>
            <Item sx={{place: 'center',cursor:'pointer'}} onClick={() => {
                redirectPage("QHOSTREPORT");
            }}>
                <Text sx={{color:'#fff'}}>Report</Text>
            </Item>
        </Item>
    )
}
