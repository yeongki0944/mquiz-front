import Grid from "@mui/material/Grid";
import {Avatar, Card, CardContent} from "@mui/material";
import * as React from "react";

export default function HostProfile(props) {

    return (
        <Card>
            <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={3}>
                        <Avatar sx={{width: 56, height: 56}}>H</Avatar>
                    </Grid>
                    <Grid item xs={9}>
                        <p>{props.name}</p>
                        {props.info}
                    </Grid>
                </Grid>
            </CardContent>

        </Card>
    )
}
