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
    const classes = useStyles();

    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일

    const [quizinfo, setQuizInfo] = useState([
        {
            "_id": "quizId01",
            "showInfo": {
                "owner": "User Email",
                "title": "쇼 제목",
                "category": "일단",
                "tags": ["1번", "2번", "3번"],
                "titleImg-origin": "url",
                "titleImg-thumb": "url",
                "createDate": "생성시간",
                "lastModifyDate": "최근수정시간",
                "isPulic": true,
                "state": "작성중, 완성"
            }
        }
    ]);
    const [currentShow, setCurrentShow] = useState(1);
    const [quizList, setQuizList] = useState([{
        "num": 1,
        "type": "선택형",
        "question": " ",
        "media": {
            "type": "image",
            "url": "",
            "startTime": "",
            "endTime": "",
        },
        "choiceList": {
            "1": "답을 입력해 주세요",
            "2": "답을 입력해 주세요",
            "3": "",
            "4": ""
        },
        "answer": [],
        "time": 0,
        "useScore": true,
        "rate": 0
    }]);
    const [currentQuiz, setCurrentQuiz] = useState(quizList[currentShow - 1]);


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

    const handleImgFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgBase64(reader.result);
            setImgFile(file);
        }

    }

    return (
        <div className={classes.content}>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={2} className={classes.components}>
                    <List
                        quizList={quizList}
                        currentShow={currentShow}
                        currentQuiz={currentQuiz}
                        setCurrentShow={setCurrentShow}
                        setCurrentQuiz={setCurrentQuiz}
                        quizinfo={quizinfo}
                        setQuizList={setQuizList}
                    />
                </Grid>
                <Grid item xs={7} className={classes.components}>
                    <Preview
                        quizList={quizList}
                        currentShow={currentShow}
                        currentQuiz={currentQuiz}
                    />
                </Grid>
                <Grid item xs={3} className={classes.components}>
                    <Form
                        quizList={quizList}
                        setQuizList={setQuizList}
                        currentShow={currentShow}
                        currentQuiz={currentQuiz}
                    />
                </Grid>
                <Grid item xs={12} className={classes.components}>
                    <Controlbar
                        quizList={quizList}
                        setQuizList={setQuizList}
                        setCurrentShow={setCurrentShow}
                    />
                </Grid>
            </Grid>
        </div>
    );



}

