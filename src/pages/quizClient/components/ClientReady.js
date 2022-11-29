import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

export function ClientReady(props) {
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });
    return (
        <Grid container spacing={2}>
            <Grid item>
                <ButtonBase sx={{width: 128, height: 128}}>
                    <Img alt="complex" src="/img/logo192.png"></Img>
                </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography variant="h5" component="div" align='center'>
                            {props.nickName} 님이
                        </Typography>

                        <Typography variant="h5" component="div" align='center'>
                            입장하였습니다.
                        </Typography>

                        <Typography variant="h6" component="div" align='center'>
                            화면에서 닉네임을 확인해 주세요
                        </Typography>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
