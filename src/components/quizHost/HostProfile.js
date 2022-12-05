import {Avatar, Card, CardContent} from "@mui/material";
import * as React from "react";
import {Content, Item} from "../LayOuts/LayOuts";


export const HostProfile = (props) => {

    return (
        <Content sx={props.sx}>
            <Item sx={{width: '100%',place:'top-left'}}>
                <Avatar sx={{width: 100, height: 100}}>H</Avatar>
                <p>{props.name}</p>
                {props.info}
            </Item>
        </Content>
    )
}
