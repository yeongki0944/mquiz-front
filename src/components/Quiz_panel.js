import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Quiz_form from "./Quiz_form";
import Quiz_view from "./Quiz_view";
import {Button} from "@mui/material";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Quiz_panel() {


    const [quiz, setQuiz] = React.useState([
        {
            "_id": "몽고DB에서 자동생성",

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
            },

            "quizList": [
                {
                    "num": "1",
                    "type": "선택형",
                    "question": "질문",
                    "media-info": {
                        "type": "미디어 종료",
                        "url": "주소",
                        "startTime": "",
                        "endTime": ""
                    },
                    "choiceList": {
                        "1": "1번 선지",
                        "2": "2번 선지",
                        "3": "3번 선지",
                        "4": "4번 선지"
                    },
                    "answer": ["1", "2"],
                    "time": 10,
                    "useScore": true,
                    "rate": 3
                },

                {
                    "num": "2",
                    "type": "OX",
                    "question": "질문",
                    "media-info": {
                        "type": "미디어 종료",
                        "url": "주소",
                        "startTime": "",   // double형
                        "endTime": ""      // double형
                    },
                    "choiceList": {
                        "1": "O",
                        "2": "X",
                        "3": "NULL",       //mongoDB에서  NULL값이 어떻게 저장되는지 확인해보기
                        "4": "NULL"
                    },
                    "answer": ["1"],         // 정답이 O 이면 1,  X 이면 2
                    "time": 10,             // 시간초
                    "useScore": true,
                    "rate": 3.5             // double형
                },

                {
                    "num": "3",
                    "type": "단답형",
                    "question": "질문",
                    "media-info": {
                        "type": "미디어 종료",
                        "url": "주소",
                        "startTime": "",   // double형
                        "endTime": ""      // double형
                    },
                    "choiceList": {
                        "1": "단답형 정답",
                        "2": "NULL",
                        "3": "NULL",       //mongoDB에서  NULL값이 어떻게 저장되는지 확인해보기
                        "4": "NULL"
                    },
                    "answer": ["단답형 답"],         // 정답이 O 이면 1,  X 이면 2
                    "time": 10,             // 시간초
                    "useScore": true,
                    "rate": 3.5             // double형
                }
            ]
        }
    ])

    const [currentShow, setCurrentShow] = React.useState(1);

    return (
        <Box sx={{flexGrow: 1}}>

            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                        {/*   {quiz.map((item) => (
                            item.id === 1 && item.mediaType
                        ))}*/}
                        <Quiz_view
                            quiz={quiz}
                            currentShow={currentShow}
                        />
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        <Quiz_form
                            form={quiz}
                            currentshow={currentShow}
                            setQuiz={setQuiz}
                        />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );

}

