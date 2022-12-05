import * as React from "react";
import {useHistory} from "react-router-dom";
import {Content, Item} from "../LayOuts/LayOuts";

export const NavBar = (props) => {
    const history = useHistory();
    return (
        <Content sx={props.sx} sm={props.sm}>
            <Item sx={{margin:'auto'}} onClick={()=>history.push("/")}>Main</Item>
            <Item sx={{margin:'auto'}} onClick={()=>history.push("/QHost")}>DashBoard</Item>
            <Item sx={{margin:'auto'}} onClick={()=>history.push("/QHost/find")}>Find</Item>
            <Item sx={{margin:'auto'}} onClick={()=>history.push("/QHost/report")}>Report</Item>
        </Content>
    )
}
