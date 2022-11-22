import * as React from 'react';
import Grid from "@mui/material/Grid";
import {
    Button,
    TablePagination,
} from "@mui/material";
import Box from "@mui/material/Box";
import {useState, useEffect} from "react";
import {AllQuizListCard} from "../components/AllQuizListCard"
import {QuizSearchBox} from "../components/QuizSearchBox"

export const QuizHostFind = () => {
    // 페이징
    const [pageCount, setPageCount] = useState(0);
    const [pageLimit, setPageLimit] = useState(25);
    const offset = pageCount * pageLimit;

    // 테스트
    const [Data, setData] = useState([]);

    // 테스트
    let list = [];
    function testDataSetting(){
        for(let i = 0; i<100;i++){
            list.push(
                {
                    "_id": "테스트ID" + i,
                    "showInfo": {
                        "email": "테스트이메일" + i,
                        "title": "쇼 제목"+i,
                        "category": "일단",
                        "tags": [
                            "1번",
                            "2번",
                            "3번"
                        ],
                        "titleImg_origin": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
                        "titleImg_thumb": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
                        "createDate": "2022-11-11T00:00:00.000+00:00",
                        "lastModifyDate": "2022-11-11T00:00:00.000+00:00",
                        "state": "완성",
                        "public": false
                    }
                }
            )
        }
        setData(list);
    }

    return (
        <div id={"content"}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Nav/>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10} container spacing={2}>
                        <Grid item xs={12}>
                            <QuizSearchBox page={"QuizHostFind"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <QuizSearchResultBox/>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
                <Grid item xs={12}>
                    footer
                </Grid>
            </Grid>
        </div>
    );

    function Nav() {
        return (
            <div style={{height:80}}>
                <h1>네비게이션</h1><Button onClick={testDataSetting}>테스트데이터세팅</Button>
            </div>
        );
    }

    function QuizSearchResultBox() {
        const ResultBox = Data.slice(offset, offset + pageLimit).map(
            (item) => (
                <AllQuizListCard
                    id={item._id}
                    titleImg={item.showInfo.titleImg_thumb}
                    title={item.showInfo.title}
                />
            )
        );

        return (
            <Box sx={{textAlign:"center", marginTop:5}}>
                {ResultBox}
                <TablePagination
                    component="div"
                    sx={{marginRight:5}}
                    count={Data.length}
                    page={pageCount}
                    onPageChange={
                        (event,page) => {
                            setPageCount(page);
                        }
                    }
                    rowsPerPage={pageLimit}
                    onRowsPerPageChange={
                        (event) => {
                            setPageLimit(parseInt(event.target.value, 10));
                            setPageCount(0);
                        }
                    }
                />
            </Box>
        );
    }
}
