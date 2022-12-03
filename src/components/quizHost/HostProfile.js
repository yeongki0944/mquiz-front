import {Avatar, Card, CardContent} from "@mui/material";
import * as React from "react";
import {Item_c, Item_l, Item_r} from "../LayOuts/LayOuts";
import styled from "styled-components";

const Item_c_Content = styled(Item_c)`
    width: 100%;
    height: 100%;
`
const Item_l_Info = styled(Item_l)`
    width: 100%;
`
export default function HostProfile(props) {

    return (
        <Item_c_Content>
            <Item_l_Info>
                <Avatar sx={{width: 100, height: 100}}>H</Avatar>
                <p>{props.name}</p>
                {props.info}
            </Item_l_Info>
        </Item_c_Content>
    )
}
