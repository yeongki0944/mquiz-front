import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Box,
    Button,
    FormControl, MenuItem,
    Select, TextField,
} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";
import SearchIcon from "@material-ui/icons/Search";


const makeStyle = makeStyles({
    root: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    searchBoxStyle:{
        width: 700,
        marginRight: 1
    }
});

/**
 * props:
 *  - id : Box에 key값 설정
 *  - titleImg : 썸네일 이미지
 *  - title : Quiz 이름
 *  - page : 어떤 페이지인지 체크 (Find면 전체, 호스트 메인이면 자기꺼만)
 */
export const QuizSearchBox = (props) => {
    const classes = makeStyle();

    // 나중에 리덕스로!
    const [searchType, setSearchType] = useState("A");
    const [searchText, setSearchText] = useState('');

    return (
        <Box sx={{textAlign:"center", marginTop:5}}>
            <FormControl sx={{width: 150, marginRight: 1}}>
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
                className={classes.searchBoxStyle}
                value={searchText}
                onChange={
                    (event) => {
                        setSearchText(event.target.value);
                    }
                }
            />
            <Button
                variant="contained"
                sx={{height: 55.9}}
                onClick={
                    () => {
                        console.log(props.page);
                        if(props.page === "Find"){
                            console.log("Find Page");
                        }
                        else if(props.page === "hostMain"){
                            console.log("Main Page");
                        }
                    }
                }
            >
                <SearchIcon/>
            </Button>
        </Box>
    )
}
