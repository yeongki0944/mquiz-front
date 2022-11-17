import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Form from "./Form";
import Preview from "./Preview";
import List from "./List";
import Controlbar from "./Controlbar";
import {Button, Card, Container} from "@mui/material";
import {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    content:{
        height:'100vh',
        overflowX:'hidden',
        overflowY:'hidden',
        backgroundColor:'#f5f5f5',
    },
    container: {
        // height: '100vh',
        // padding: theme.spacing(3),
    },
    components: {
        // padding: theme.spacing(2),
        border: '1px solid #e0e0e0',
    },
}));

export default function Panel(props) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일


    const {currentShow} = useSelector(state => state.currentShow);
    const { quizData } = useSelector((state) => state.quizData);



    // useEffect(() => {
    // switch (props.mode) {
    //     case "create":
    //         setQuizList()
    //         break;
    //     case "edit":
    //         setQuizList()
    //         break;
    // }
    // },[]);

    // const handleImgFile = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setImgBase64(reader.result);
    //         setImgFile(file);
    //     }
    //
    // }

    return (
        <div className={classes.content}>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={2} className={classes.components}>
                    <List/>
                </Grid>
                <Grid item xs={7} className={classes.components}>
                    <Preview/>
                </Grid>
                <Grid item xs={3} className={classes.components}>
                    <Form/>
                </Grid>
                <Grid item xs={12} className={classes.components}>
                    <Controlbar/>
                </Grid>
            </Grid>
        </div>
    );

}

