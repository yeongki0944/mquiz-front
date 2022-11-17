import * as React from 'react';
import Grid from "@mui/material/Grid";
import {
    Button,
    Card,
    CardActionArea, CardActions, CardContent,
    CardMedia,
    FormControl,
    MenuItem,
    Select, TablePagination,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import {useState, useEffect} from "react";
import Typography from "@mui/material/Typography";

export default function Find(props) {
    // 페이징
    const [pageCount, setPageCount] = useState(0);
    const [pageLimit, setPageLimit] = useState(25);

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
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Nav/>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10} container spacing={2}>
                        <Grid item xs={12}>
                            <QuizSearchBox />
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
        </>
    );

    function Nav() {
        return (
            <div style={{height:80}}>
                <h1>네비게이션</h1><Button onClick={testDataSetting}>테스트데이터세팅</Button>
            </div>
        );
    }

    function QuizSearchBox() {
        // 나중에 리덕스로!
        const [searchType, setSearchType] = useState("A");
        const [searchText, setSearchText] = useState('');

        return (
            <Box sx={{textAlign:"center", marginTop:5}}>
                <FormControl sx={{width:150, marginRight:1}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchType}
                        onChange={(event) => {
                            setSearchType(event.target.value);
                        }}
                    >
                        <MenuItem value={"A"}>전체</MenuItem>
                        <MenuItem value={"T"}>제목</MenuItem>
                        <MenuItem value={"TG"}>태그</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-search"
                    type="search"
                    sx={{width:700, marginRight:1}}
                    value={searchText}
                    onChange={
                    (event) => {
                            setSearchText(event.target.value);
                        }
                    }
                />
                <Button
                    variant="contained"
                    sx={{height:55.9}}
                    onClick={
                        () => {console.log(searchText);}
                    }
                >
                    <SearchIcon/>
                </Button>
            </Box>
        );
    }

    function QuizSearchResultBox() {

        const ResultBox = Data.map(
            (item) => (
                <Box key={item._id} sx={{margin:1,display:"inline-block"}}>
                    <Card sx={{ maxWidth: 345}} >
                        <CardActionArea onClick={
                            ()=>{
                                console.log("클릭");
                            }
                        }>
                            <CardMedia
                                component="img"
                                height="220"
                                image={item.showInfo.titleImg_thumb}
                                alt={item.showInfo.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.showInfo.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
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
                            setPageLimit(parseInt(event.target.value, 20));
                            setPageCount(0);
                        }
                    }
                />
            </Box>
        );
    }
}
