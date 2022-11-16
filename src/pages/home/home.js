import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import React from "react";

export default function Home() {
    return (

        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Link to="/QHost">
                <Card>
                    <CardContent>
                        <Typography sx={{fontSize: 14}}>
                            퀴즈 만들기
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
            <Link to="/QClient">
                <Card>
                    <CardContent>
                        <Typography sx={{fontSize: 14}}>
                            퀴즈 풀기
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
}
