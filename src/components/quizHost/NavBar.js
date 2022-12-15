import * as React from "react";
import {useHistory} from "react-router-dom";
import {Item, Text} from "../../LayOuts/LayOuts";


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
