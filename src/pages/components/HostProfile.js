import Grid from "@mui/material/Grid";
import {Avatar} from "@mui/material";
import * as React from "react";

export default function HostProfile(props) {

    return(
        <Grid container spacing={3}>
            <Grid item xs={12}/> {/* 빈칸 띄우기용 */}
            {/*프로필*/}
            <Grid item xs={2}/>
            <Grid item xs={0.6}>
                <Avatar sx={{width: 56, height: 56}}>H</Avatar>
            </Grid>
            <Grid item xs={7.4}>
                <Grid item xs={7.4}> 닉네임</Grid>
                <Grid item xs={7.4}> 정보 | 정보 | 정보</Grid>
            </Grid>
            <Grid item xs={2}/>
        </Grid>
    )
}
