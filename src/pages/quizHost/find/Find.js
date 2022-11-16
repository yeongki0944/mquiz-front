import * as React from 'react';
import Grid from "@mui/material/Grid";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import {useState, useEffect} from "react";

export default function Find(props) {
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
            <div style={{height:80}}><h1>네비게이션</h1></div>
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
        return (
            <Box sx={{textAlign:"center", marginTop:5}}>

            </Box>
        );
    }
}
