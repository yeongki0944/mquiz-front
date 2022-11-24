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
import {ClientCountOutModal} from "../../components/Client/ClientCountOutModal";
import {ClientReady} from "../../components/Client/ClientReady";

export default function Ready() {

    return (
        <div id={"content"}>
            <div id={"item"}>
                <ClientReady></ClientReady>
                <ClientCountOutModal></ClientCountOutModal>
            </div>
        </div>
    );
}
