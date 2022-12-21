import {Avatar,} from "@mui/material";
import * as React from "react";
import {Card_panel, Img, Item} from "../../layouts/LayOuts";


export default function HostProfile(props) {

    return (
        <Card_panel sx={props.sx} sm={props.sm}>
            <Item sx={{place:'left'}}>
                <Img
                    alt="complex"
                    src="/img/Spaceman_star.png"
                    sx={{width: '5vw', height: '5vw'}}
                    sm={{width: '20vw', height: '20vw'}}
                />
                <p>{props.name} 님 환영합니다.</p>

                <p>닉네임 : {props.info}</p>
            </Item>
        </Card_panel>
    )
}
