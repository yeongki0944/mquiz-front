import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import { useState } from 'react';
import style from '../Style/layoutstyle.css';
import {NickNameCheck} from "../../components/ClientNickNameInput";

export default function QuizClientCreateNickName(props) {

    return (
        <>
            <NickNameCheck></NickNameCheck>
        </>
    );
}
