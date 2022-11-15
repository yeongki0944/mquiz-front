import * as React from 'react';
import QuizModal from '../create/Quiz_Make_modal';
import LandingPage from './LandingPage';
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
                    <LandingPage
                        open={open}
                        setOpen={setOpen}
                    />
                    // <QuizModal
                    //     open={open}
                    //     setOpen={setOpen}
                    //     setPage={setPage}
                    //     Data={quizInfo}
                    //     setData ={setQuizInfo}/>
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



// import * as React from 'react';
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Showcard from "../components/Showcard";
// import {Avatar, Box, Button, Modal, Switch, TextField} from "@mui/material";
// import {useEffect, useState} from "react";
// import axios from "axios";
//
// export default function QuizHostMain(props) {
//     const [createmodal, setCreateModal] = useState(false);
//     const [data, setData] = useState([]);
//
//     const onClick = async()=>{
//         const res = await axios.get("http://localhost:8080/api/quiz");
//         setData(res.data);
//         //
//         // setData([
//         //     {
//         //         key: 1,
//         //         title: "test1",
//         //         status: "작성중",
//         //         qcnt: 10,
//         //         author: "김재훈",
//         //         date: "2021-08-01"
//         //     },
//         //     {
//         //         key: 2,
//         //         title: "test2",
//         //         status: "사용가능",
//         //         qcnt: 10,
//         //         author: "김재이",
//         //         date: "2021-08-01"
//         //     },
//         // ]);
//         //
//
//     }
//
//     useEffect(() => {
//         onClick();
//     }, []);
//
//     return (
//         <>
//             <Grid>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12}/> {/* 빈칸 띄우기용 */}
//                     {/*프로필*/}
//                     <Grid item xs={2}/>
//                     <Grid item xs={0.6}>
//                         <Avatar sx={{width: 56, height: 56}}>H</Avatar>
//                     </Grid>
//                     <Grid item xs={7.4}>
//                         <Grid item xs={7.4}> 닉네임</Grid>
//                         <Grid item xs={7.4}> 정보 | 정보 | 정보</Grid>
//                     </Grid>
//                     <Grid item xs={2}/>
//                     {/*검색 툴바*/}
//                     <Grid item xs={2}/>
//                     <Grid item xs={8}>
//                         <TextField
//                             id="standard-full-width"
//                             style={{margin: 8}}
//                             placeholder="Show 제목 또는 태그를 검색해 주세요"
//                             fullWidth
//                             margin="normal"
//                             InputLabelProps={{
//                                 shrink: true,
//                             }}
//                         />
//                     </Grid>
//                     <Grid item xs={2}/>
//
//                     {/*퀴즈 리스트*/}
//                     <Grid item xs={6}>
//                         <Grid item xs={12} sm={12}>
//                             <Grid item xs={3}>
//                                 <TextField select={true} label="카테고리" variant="outlined" fullWidth={true}>
//                                     <option value="1">카테고리1</option>
//                                     <option value="2">카테고리2</option>
//                                     {/*{categories.map((option) => (*/}
//                                     {/*    <option key={option.value} value={option.value}>*/}
//                                     {/*        {option.label}*/}
//                                     {/*    </option>*/}
//                                     {/*))}*/}
//                                 </TextField>
//                             </Grid>
//                         </Grid>
//                         <Grid item xs={12} sm={12}>
//                             <Button fullWidth={true} onClick={() => {
//                                 setCreateModal(true);
//                             }}>
//                                 <Box
//                                     sx={{
//                                         p: 2,
//                                         margin: 'auto',
//                                         maxWidth: 500,
//                                         flexGrow: 1,
//                                         backgroundColor: '#f5f5f5',
//                                         borderRadius: 2,
//                                         boxShadow: 1,
//                                         marginBottom: 3,
//                                         marginTop: 3,
//
//                                     }}
//                                 >
//                                     추가
//                                 </Box>
//                             </Button>
//                         </Grid>
//                         <Showcard
//                             data={data}
//                         />
//                     </Grid>
//
//                     <Grid item xs={6}>
//                         <Grid item xs={12} sm={12}>
//                             정답 표시
//                             <Switch
//                                 // checked={state.checkedB}
//                                 // onChange={handleChange}
//                                 name="checkedB"
//                                 color="primary"
//                             />
//                         </Grid>
//                         <Paper>미리보기~~~</Paper>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             <Modal open={createmodal}>
//                 <Modal_a/>
//             </Modal>
//         </>
//     );
// }
//
// function Modal_a() {
//     return (
//         <div>
//             <h1>Modal</h1>
//         </div>
//     );
// }
