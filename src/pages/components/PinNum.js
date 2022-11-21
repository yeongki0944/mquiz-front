import {LinearProgress} from "@mui/material";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import { useState } from 'react';

// Grid Item 설정
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const PinNum = (props) => {

    return (
        <>
            <Grid item xs={3} md={12}>
                <Item>
                    <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
                        <b>PIN : {props.pinNum} </b>
                    </Typography>
                </Item>
            </Grid>
        </>
    )
}
