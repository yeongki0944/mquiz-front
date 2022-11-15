import * as React from 'react';
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const imageStyle = {
    marginTop: 15,
    width: 323,
    height: 200,
}
const textFieldStyle = {
    width: 790,
    height: 50
}
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];
const currencies = [
    {
        value: '카테고리1',
        label: '카테고리1',
    },
    {
        value: '카테고리2',
        label: '카테고리2',
    },
    {
        value: '카테고리3',
        label: '카테고리3',
    },
    {
        value: '카테고리4',
        label: '카테고리4',
    },
];

function init(){
    // 1. DB에서 이미지 데이터 가져오기

    // 2. DB에서 사용자가 생성한 카테고리 가져오기
}

export default function BasicModal(props) {

    useEffect(() => {
        console.log("test==     "+props.page);
    }, []);

    // DB에서 가져와야할 데이터 가져오기?
    init();

    // Data에 key=value에 맞게 설정
    function setQuizInfo(key, value){
        console.log(key+" : "+value);
        setData(Data.map(item =>{
            item.showInfo[key] = value;
            return item;
        }));
    }

    const Data = props.Data;
    const setData = props.setData;

    // DB에 들어갈 데이터
    // const [Data, setData] = useState([
    //     {
    //         "_id": "quizId01",
    //         "showInfo": {
    //             "owner": "User Email",
    //             "title": "쇼 제목",
    //             "category": "일단",
    //             "tags": ["1번", "2번", "3번"],
    //             "titleImg-origin": "url",
    //             "titleImg-thumb": "url",
    //             "createDate": "생성시간",
    //             "lastModifyDate": "최근수정시간",
    //             "isPublic": true,
    //             "state": "작성중, 완성"
    //         }
    //     }
    // ])

    // Show 제목
    const [titleText, setTitletext] = useState('');
    // 카테고리
    const [currency, setCurrency] = useState('카테고리');
    // chip
    const [chipData, setChipData] = useState([]);
    const [chipText, setChipText] = useState('');
    const [chipCount, setChipCount] = useState(0);
    const [chipErrorMsg, setChipErrorMsg] = useState('');
    const [chipTextField, setChipTextField] = useState('standard-basic');
    // 공개 비공개
    const [isPublic, setIsPublic] = useState(true);
    const [label, setLabel] = useState("공개");
    // 이미지 변경
    const [imageUrl, setImageUrl] = useState(itemData[0].img);

    // 모달 오픈/클로즈
    const handleOpen = () => {
        props.setOpen(true)
    };
    const handleClose = () => {
        setTitletext('');
        setCurrency('');
        setChipData([]);
        setChipText('');
        setChipCount(0);
        setChipTextField('');
        setChipTextField('standard-basic');
        setIsPublic(true);
        setLabel("공개");
        setImageUrl(itemData[0].img);

        props.setOpen(false)
    };

    // 카테고리 변경
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    // 태그 입력
    const handleKey = (event) => {
        setChipTextField("standard-basic");
        setChipErrorMsg('');
        setChipText(event.target.value);
    }
    // 태그 입력 후 엔터를 눌럿을 때
    const handleEnterkey = (event) => {
        if(event.keyCode === 13){
            let tagList=[];
            for(let i = 0; i<chipData.length;i++){
                if(chipData[i].label !== chipText){
                    tagList.push({ key:chipData[i].key, label:chipData[i].label })
                }
                else{
                    setChipText('');
                    setChipTextField("standard-error-helper-text");
                    setChipErrorMsg("현재 동일한 태그가 존재합니다.");
                    return;
                }
            }
            tagList.push({ key:chipCount, label:chipText });

            setChipData(tagList);
            setChipText('');
            setChipCount(chipCount+1);
        }
    }
    // 태그 삭제
    const handleChipDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    // 공개/비공개 변경
    const handleSwitchChange = (event) => {
        setIsPublic(event.target.checked);
        if(isPublic) {
            setLabel("비공개");
        }else{
            setLabel("공개");
        }
    };

    // 생성 버튼 클릭 이벤트
    const handleMakeShowButton = () => {
        // 태그 데이터 key값 정리
        let checkTags = chipData;
        for(let i = 0; i<checkTags.length;i++){
            checkTags[i].key = i;
        }

        // data 세팅
        setQuizInfo("owner", "유저아이디");
        setQuizInfo("title", titleText);
        setQuizInfo("category", currency);
        setQuizInfo("tags", checkTags);
        setQuizInfo("titleImg-origin", "URL 입력");
        setQuizInfo("titleImg-thumb", "URL 입력");
        setQuizInfo("createDate", new Date());
        setQuizInfo("lastModifyDate", new Date());
        setQuizInfo("isPublic", isPublic);
        setQuizInfo("state", "작성중");

        handleClose();
        props.setPage("quizcreate");
    }

    useEffect(()=>{
        console.log(Data);
    },[Data]);

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} mb={4}>
                            <Typography align={"center"} variant={"h3"} >
                                <b>Show 기본 설정</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={5} mb={2}>
                            <Typography align={"left"} variant={"h6"}>
                                <b>대표 이미지</b>
                            </Typography>
                            <img src={imageUrl} style={imageStyle} alt="대표 이미지"></img>
                        </Grid>
                        <Grid item xs={7} mb={2}>
                            <Typography align={"left"} variant={"h6"}>
                                <b>기본 이미지</b>
                            </Typography>
                            <ImageList sx={{ width: 450, height: 200 }} cols={3} rowHeight={164}>
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img}>
                                        <img
                                            id={item.title}
                                            src={`${item.img}?w=150&h=150&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=150&h=150&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                            onClick={()=>{setImageUrl(item.img)}}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={"left"} variant="h5">
                                <b>Show 제목</b>
                            </Typography>
                            <TextField id="standard-basic" variant="standard" sx={textFieldStyle} value={titleText} onChange={(event)=>{setTitletext(event.target.value)}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align={"left"} variant="h5" >
                                <b>카테고리 선택</b>
                            </Typography>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="카테고리 선택"
                                value={currency}
                                onChange={handleChange}
                                helperText="카테고리를 선택하세요!"
                                variant="standard"
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align={"left"} variant="h5" >
                                <b>공개 / 비공개 설정</b>
                            </Typography>
                            <FormGroup>
                                <FormControlLabel control={<Switch checked={isPublic} />} label={label} onChange={handleSwitchChange}/>
                            </FormGroup>
                            <Typography align={"left"} variant="p" sx={{fontSize:12}}>
                                공개로 설정하는 경우 다른 사용자에게 Show가 공유됩니다.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={"left"} variant="h5" >
                                <b>태그</b>
                            </Typography>
                            <TextField id={chipTextField} variant="standard" sx={textFieldStyle} helperText={chipErrorMsg} value={chipText} onChange={handleKey} onKeyUp={handleEnterkey}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                {
                                    chipData.map((item)=>{
                                        return (
                                            <div key={item.key} style={{display:"inline-block"}}>
                                                <Chip label={item.label} sx={{marginLeft:1, marginRight:1}} onDelete={handleChipDelete(item)}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div align={"center"}>
                                <Button variant="contained" onClick={handleMakeShowButton}>생성</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
    function test(){
        props.setPage("quizcreate");
        handleClose();
    }
}
