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
import TextField from "@mui/material/TextField";
import {useSelector} from "react-redux";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

/**
 * 대기방 component
 */
export function ClientReady() {
    const {quizPlay} = useSelector(state => state.quizPlay);

    return (

        <Box align='center' sx={{minWidth: 275}}>
            <Img alt="complex" src="/img/logo192.png"></Img>
            <Typography variant="h5" component="div" align='center'>
                {quizPlay.nickName} 님이
            </Typography>
            <Typography variant="h5" component="div" align='center'>
                입장하였습니다.
            </Typography>
            <Typography variant="h6" component="div" align='center'>
                화면에서 닉네임을 확인해 주세요
            </Typography>
        </Box>
    );
}
