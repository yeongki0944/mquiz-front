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
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {R_makeQuizShow, R_modifyQuiz, R_setId} from "../../redux/reducers/quizInfoReducer";
import CustomAxios from "../../function/CustomAxios";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(() => ({
        imageStyle: {
            marginTop: 15,
            width: 323,
            height: 200
        },
        textFieldStyle: {
            width: 790,
            height: 50
        },
        tagTextFieldStyle: {
            width: 790,
            height: 50
        }
    }
));

// useStyles에 넣으면 이상해짐 ㅎㄷㄷ
const boxstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
}

const imageItemData = [
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

export default function BasicModal(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {quiz} = useSelector(state => state.quiz);

    // Show 제목
    const [titleTextData, setTitleTextData] = useState('');
    // 카테고리
    const [currency, setCurrency] = useState('카테고리1');
    // chip
    const [chipData, setChipData] = useState([]);
    const [chipCount, setChipCount] = useState(0);
    // 공개 비공개
    const [isPublic, setIsPublic] = useState(true);
    const [label, setLabel] = useState("공개");
    // 이미지 변경
    const [imageUrl, setImageUrl] = useState(imageItemData[0].img);

    const [helperText, setHelperText] = useState('');

    const history = useHistory();

    const setQuizInfo = async () => {
        console.log(quiz.quizData);
        await CustomAxios.post("/v1/show", {
            quizInfo: quiz.quizInfo,
            quizData: quiz.quizData,
        }).then((res) => {
            console.log(res.data)
            props.setOpen(false);
            history.push({
                pathname:"/QHost/create",
                state:{ id : res.data.data}
            })
        }).catch((err) => {
            console.log(err)
            // props.setOpen(false)
        })
    }

    // 모달창 닫기
    const handleClose = () => {
        // setTitleTextData('');
        // setCurrency('');
        // setChipData([]);
        // setChipCount(0);
        // setIsPublic(true);
        // setLabel("공개");
        // setImageUrl(imageItemData[0].img);
        // setHelperText('');
        // setQuizInfo();

        props.setOpen(false)
    };

    useEffect(() => {
        // Date 포맷
        // let d = new Date();
        // let TIME_ZONE = 3240 * 10000;
        // let date = new Date(+d + TIME_ZONE).toISOString().split('T')[0];
        // let time = d.toTimeString().split(' ')[0];
        // let dateData = date + ' ' + time;
        // //Stringify dateData
        // let dateDataString = JSON.stringify(dateData);




        dispatch(R_makeQuizShow({key:'email', value: "test@gmail.com"}))
        dispatch(R_makeQuizShow({key:'state', value: "작성중"}))

        dispatch(R_makeQuizShow({key:'createDate', value: "2022-01-01"}))
        dispatch(R_makeQuizShow({key:'lastModifyDate', value: "2022-01-01"}))
        dispatch(R_makeQuizShow({key:'titleimg_origin', value: "https://images.unsplash.com/photo-1522770179533-24471fcdba45"}))
        dispatch(R_makeQuizShow({key:'titleimg_thumb', value: "https://images.unsplash.com/photo-1522770179533-24471fcdba45"}))
    }, [])

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxstyle}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} mb={4}>
                            <ModalTitle/>
                        </Grid>
                        <Grid item xs={5} mb={2}>
                            <ModalThumbnail/>
                        </Grid>
                        <Grid item xs={7} mb={2}>
                            <ModalBasicThumbnail/>
                        </Grid>
                        <Grid item xs={12}>
                            <ModalInputShowTitle/>
                        </Grid>
                        <Grid item xs={6}>
                            <ModalSelectCategory/>
                        </Grid>
                        <Grid item xs={6}>
                            <ModalShowIsPublic/>
                        </Grid>
                        <Grid item xs={12}>
                            <ModalInputTag/>
                        </Grid>
                        <Grid item xs={12}>
                            <ModalAddTagChip/>
                        </Grid>
                        <Grid item xs={12}>
                            <ModalDataSubmit/>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );

    function ModalTitle() {
        return (
            <Typography align={"center"} variant={"h3"}>
                <b>Show 기본 설정</b>
            </Typography>
        );
    }

    function ModalThumbnail() {
        return (
            <div>
                <Typography align={"left"} variant={"h6"}>
                    <b>대표 이미지</b>
                </Typography>
                <img src={imageUrl} className={classes.imageStyle} alt="대표 이미지"></img>
            </div>
        );
    }

    function ModalBasicThumbnail() {
        return (
            <div>
                <Typography align={"left"} variant={"h6"}>
                    <b>기본 이미지</b>
                </Typography>
                <ImageList
                    sx={{width: 450, height: 200}}
                    cols={3}
                    rowHeight={164}
                >
                    {imageItemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                id={item.title}
                                src={`${item.img}?w=150&h=150&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=150&h=150&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                                onClick={() => {
                                    setImageUrl(item.img)
                                    dispatch(R_makeQuizShow({key:'titleimg_origin', value: item.img}))
                                    dispatch(R_makeQuizShow({key:'titleimg_thumb', value: item.img}))
                                }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        )
    }

    function ModalInputShowTitle() {
        const [titleText, setTitleText] = useState(titleTextData);
        return (
            <div>
                <Typography align={"left"} variant="h5">
                    <b>Show 제목</b>
                </Typography>
                <TextField
                    id="standard-basic"
                    variant="standard"
                    className={classes.textFieldStyle}
                    // value={titleText}
                    helperText={helperText}
                    // onChange={
                    //     (event) => {
                    //         setTitleText(event.target.value);
                    //     }
                    // }
                    onBlur={
                        (event) => {
                            // setTitleTextData(titleText);
                            dispatch(R_makeQuizShow({key:'title', value: event.target.value}))
                        }
                    }
                />
            </div>
        );
    }

    function ModalSelectCategory() {
        return (
            <div>
                <Typography align={"left"} variant="h5">
                    <b>카테고리 선택</b>
                </Typography>
                <TextField
                    id="standard-select-currency"
                    select
                    label="카테고리 선택"
                    value={currency}
                    onChange={
                        (event) => {
                            setCurrency(event.target.value);
                            dispatch(R_makeQuizShow({key:'category', value: event.target.value}))
                        }
                    }
                    helperText="카테고리를 선택하세요!"
                    variant="standard"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        );
    }

    function ModalShowIsPublic() {
        return (
            <div>
                <Typography align={"left"} variant="h5">
                    <b>공개 / 비공개 설정</b>
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={isPublic}/>}
                        label={label}
                        onChange={
                            (event) => {
                                // setIsPublic(event.target.checked);
                                if (isPublic) {
                                    setLabel("비공개");
                                    dispatch(R_makeQuizShow({key:'public', value: event.target.checked}))
                                } else {
                                    setLabel("공개");
                                    dispatch(R_makeQuizShow({key:'public', value: event.target.checked}))
                                }
                            }
                        }
                    />
                </FormGroup>
                <Typography align={"left"} variant="p" sx={{fontSize: 12}}>
                    공개로 설정하는 경우 다른 사용자에게 Show가 공유됩니다.
                </Typography>
            </div>
        );
    }

    function ModalInputTag() {
        // 태그 입력
        const [chipText, setChipText] = useState('');
        const [chipErrorMsg, setChipErrorMsg] = useState('');
        const [chipTextField, setChipTextField] = useState('standard-basic');

        return (
            <div>
                <Typography align={"left"} variant="h5">
                    <b>태그</b>
                </Typography>
                <TextField
                    id={chipTextField}
                    variant="standard"
                    className={classes.tagTextFieldStyle}
                    helperText={chipErrorMsg}
                    value={chipText}
                    onChange={
                        (event) => {
                            setChipTextField("standard-basic");
                            setChipErrorMsg('');
                            setChipText(event.target.value);
                        }
                    }
                    onKeyUp={
                        (event) => {
                            if (event.keyCode === 13) {
                                if (chipText !== '') {
                                    let tagList = [];
                                    for (let i = 0; i < chipData.length; i++) {
                                        if (chipData[i].label !== chipText) {
                                            tagList.push({key: chipData[i].key, label: chipData[i].label})
                                        } else {
                                            setChipText('');
                                            setChipTextField("standard-error-helper-text");
                                            setChipErrorMsg("현재 동일한 태그가 존재합니다.");
                                            return;
                                        }
                                    }
                                    tagList.push({key: chipCount, label: chipText});
                                    //Tag값 정리

                                    let tagList2 = [];
                                    for (let i = 0; i < chipData.length; i++) {
                                        tagList2.push(chipData[i].label);
                                    }

                                    dispatch(R_makeQuizShow({key:'tags', value: tagList2}))
                                    //
                                    setChipData(tagList);
                                    setChipText('');
                                    setChipCount(chipCount + 1);
                                }
                            }
                        }
                    }
                >
                </TextField>
            </div>
        );
    }

    function ModalAddTagChip() {
        return (
            <div style={{height: 30}}>
                {
                    chipData.map((item) => {
                        return (
                            <div key={item.key} style={{display: "inline-block"}}>
                                <Chip
                                    label={item.label}
                                    sx={{marginLeft: 1, marginRight: 1}}
                                    onDelete={
                                        () => {
                                            setChipData((chips) => chips.filter((chip) => chip.key !== item.key));
                                        }
                                    }/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function ModalDataSubmit() {
        return (
            <div align={"center"}>
                <Button variant={"contained"} onClick={setQuizInfo}>생성</Button>
            </div>
        )
    }
}
