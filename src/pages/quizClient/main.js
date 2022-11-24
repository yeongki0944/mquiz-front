import * as React from 'react';
import {PinNumCheck} from "../components/Client/ClientPinNumInput";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import {useState} from 'react';

export default function quizClientMain() {
    return (
        <div id={"content"}>
            <div id={"item"}>
                <PinNumCheck></PinNumCheck>
            </div>
        </div>
    );
}
