import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Quiz_form from "./Quiz_form";
import Quiz_view from "./Quiz_view";
import {Button} from "@mui/material";
import {useEffect} from "react";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Quiz_panel() {
    const [quizinfo, setQuizInfo] = React.useState([
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

    const [quizList, setQuizList] = React.useState([

        {
            "num": 1,
            "type": "선택형",
            "question": "질문",
            "media": {
                "type": "image",
                "url": "주소",
                "startTime": "",
                "endTime": "",
            },
            "choiceList": {
                "1": "1번 선지",
                "2": "2번 선지",
                "3": "3번 선지",
                "4": "4번 선지"
            },
            "answer": ["1", "2"],
            "time": 50,
            "useScore": true,
            "rate": 3
        },
        // {
        //     "num": 2,
        //     "type": "OX",
        //     "question": "질문",
        //     "media": {
        //         "type": "image",
        //         "url": "주소",
        //         "startTime": "",
        //         "endTime": "",
        //     },
        //     "choiceList": {
        //         "1": "O",
        //         "2": "X",
        //         "3": "NULL",       //mongoDB에서  NULL값이 어떻게 저장되는지 확인해보기
        //         "4": "NULL"
        //     },
        //     "answer": ["1"],         // 정답이 O 이면 1,  X 이면 2
        //     "time": 10,             // 시간초
        //     "useScore": true,
        //     "rate": 3.5             // double형
        // },
        // {
        //     "num": 3,
        //     "type": "단답형",
        //     "question": "질문",
        //     "media": {
        //         "type": "image",
        //         "url": "주소",
        //         "startTime": "",
        //         "endTime": "",
        //     },
        //     "choiceList": {
        //         "1": "단답형 정답",
        //         "2": "NULL",
        //         "3": "NULL",       //mongoDB에서  NULL값이 어떻게 저장되는지 확인해보기
        //         "4": "NULL"
        //     },
        //     "answer": ["단답형 답"],         // 정답이 O 이면 1,  X 이면 2
        //     "time": 10,             // 시간초
        //     "useScore": true,
        //     "rate": 3.5             // double형
        // }
    ]);

    //현재 슬라이드 번호
    const [currentShow, setCurrentShow] = React.useState(1);
    const [currentQuiz, setCurrentQuiz] = React.useState(quizList[0]);

    useEffect(() => {
        setCurrentQuiz(quizList[currentShow - 1]);
    }, [quizList]);

    return <Box sx={{flexGrow: 1}}>
        <Grid container spacing={3}>
            <Grid item xs={2}>
                {quizList.map((quiz) => (
                    "num:"+quiz.num+" \n type:"+quiz.type+" \n question:"+quiz.question+" \n answer:"+quiz.answer+" \n time:"+quiz.time+" \n useScore:"+quiz.useScore+" \n rate:"+quiz.rate+" \n"+
                    "mediaType:"+quiz.media.type+" \n mediaUrl:"+quiz.media.url+" \n mediaStartTime:"+quiz.media.startTime+" \n mediaEndTime:"+quiz.media.endTime+" \n"+
                    "choiceList1:"+quiz.choiceList[1]+" \n choiceList2:"+quiz.choiceList[2]+" \n choiceList3:"+quiz.choiceList[3]+" \n choiceList4:"+quiz.choiceList[4]+" \n"
                ))}
            </Grid>
            <Grid item xs={7}>
                <Item>
                    {/*   {quiz.map((item) => (
                        item.id === 1 && item.mediaType
                    ))}*/}
                    <Quiz_view
                        quiz={quizList}
                        currentShow={currentShow}
                    />
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    <Quiz_form
                        quizList={quizList}
                        setQuizList={setQuizList}
                        currentShow={currentShow}
                    />
                </Item>
            </Grid>
        </Grid>
    </Box>;

}

