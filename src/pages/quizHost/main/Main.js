import * as React from 'react';
import QuizModal from '../create/Quiz_Make_modal';
import Panel from '../create/Panel';
import {useState} from "react";


export default function QuizHostMain(props) {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState("main");
    const [quizInfo, setQuizInfo] = useState([
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
                "isPublic": true,
                "state": "작성중, 완성"
            }
        }
    ])
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

    return (
        <>
            <HandlePage/>
        </>
    );

    function HandlePage(){
        switch(page){
            case "main":
                return(
                    <QuizModal
                        open={open}
                        setOpen={setOpen}
                        setPage={setPage}
                        Data={quizInfo}
                        setData ={setQuizInfo}/>
                );
                break;
            case "quizcreate":
                return(
                    <Panel
                        quizList={quizList}
                        setQuizList={setQuizList}
                        quizInfo={quizInfo}
                        setQuizInfo={setQuizInfo}
                    />
                );
                break;
        }
    }
}
