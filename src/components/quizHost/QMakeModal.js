import * as React from 'react';
import {useEffect, useState} from "react";
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {R_makeQuizShow} from "../../redux/reducers/quizInfoReducer";
import {useHistory} from "react-router-dom";
import {Btn, Img, Item, Text} from "../../layouts/LayOuts";
import {createShowAPI} from "../../function/API";
import {redirectPage} from "../../function/common";

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
    const {quiz} = useSelector(state => state.quiz);

    // chip
    const [chipData, setChipData] = useState([]);
    const [chipCount, setChipCount] = useState(0);
    // 공개 비공개
    const [label, setLabel] = useState("공개");
    // 이미지 변경
    const [imageUrl, setImageUrl] = useState(imageItemData[0].img);

    const history = useHistory();

    const handleCreate = () => {
        createShowAPI({
            quizInfo: quiz.quizInfo,
            quizData: quiz.quizData,}
        ).then(res => {
            console.log(res);
            redirectPage("QHOST");
        }).catch(
            alert("오류가 발생했습니다.")
        )
    }

    const handleInputTitle = (e) => {
        dispatch(R_makeQuizShow({key: 'title', value: e.target.value}))
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


        dispatch(R_makeQuizShow({key: 'email', value: "test@gmail.com"}))
        dispatch(R_makeQuizShow({key: 'state', value: "작성중"}))
        dispatch(R_makeQuizShow({key: 'public', value: true}))

        dispatch(R_makeQuizShow({key: 'createDate', value: "2022-01-01"}))
        dispatch(R_makeQuizShow({key: 'lastModifyDate', value: "2022-01-01"}))
        dispatch(R_makeQuizShow({
            key: 'titleimg_origin',
            value: "https://images.unsplash.com/photo-1522770179533-24471fcdba45"
        }))
        dispatch(R_makeQuizShow({
            key: 'titleimg_thumb',
            value: "https://images.unsplash.com/photo-1522770179533-24471fcdba45"
        }))
    }, [])

    /**
     * chipData에 변화가 있을 때 리덕스에 저장
     */
    useEffect(() => {
        // 리덕스에 저장할 태그명 리스트 세팅
        let inputTagData = [];
        for (let i = 0; i < chipData.length; i++) {
            inputTagData.push(chipData[i].label);
        }

        // 리덕스에 저장
        dispatch(R_makeQuizShow({key: 'tags', value: inputTagData}))
    }, [chipData])

    // useEffect(()=>{
    //     console.log(quiz.quizInfo);
    // })
    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Item sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                height: 800,
                background: '#fff',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display: 'block'
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ModalTitle/>
                    </Grid>
                    <Grid item xs={5}>
                        <ModalThumbnail/>
                    </Grid>
                    <Grid item xs={7}>
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
            </Item>
        </Modal>
    );

    function ModalTitle() {
        return (
            <Text sx={{fontSize: 30, width: '100%', height: '5%', fontWeight: 900, marginTop: '10px'}}>
                Show 생성
            </Text>
        );
    }

    /**
     * 클라이언트가 기본 이미지에서 선택한 대표 이미지
     */
    function ModalThumbnail() {
        return (
            <Item sx={{place: 'center', width: '100%', height: '100%', display: 'block'}}>
                <Text sx={{fontSize: 20, fontWeight: 900, width: '100%', height: '10%', marginLeft: '20px'}}>대표
                    이미지</Text>
                <Item sx={{place: 'center', width: '100%', height: '90%'}}>
                    <Img sx={{
                        width: '100%',
                        height: '100%',
                        maxWidth: 280,
                        maxHeight: 200,
                    }} src={imageUrl} alt={"대표 이미지"}>
                    </Img>
                </Item>
            </Item>
        );
    }

    /**
     * 기본 이미지 리스트
     */
    function ModalBasicThumbnail() {
        return (
            <Item sx={{place: 'center', width: '100%', height: '100%', display: 'block'}}>
                <Text sx={{
                    fontSize: 20,
                    fontWeight: 900,
                    width: '100%',
                    height: '10%',
                    marginLeft: '10px',
                    marginBottom: '5px'
                }}>기본 이미지</Text>
                <Item sx={{place: 'center', width: '100%', height: '90%'}}>
                    <ImageList
                        sx={{width: 430, height: 200}}
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
                                        dispatch(R_makeQuizShow({key: 'titleimg_origin', value: item.img}))
                                        dispatch(R_makeQuizShow({key: 'titleimg_thumb', value: item.img}))
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Item>
            </Item>
        )
    }

    /**
     * Quiz 제목 작성
     * - 포커스 나가면 작성한 내용 사라지는거 수정해야함.
     */
    function ModalInputShowTitle() {
        return (
            <Item sx={{place: 'center', width: '100%', height: '100%', display: 'block'}}>
                <Text sx={{
                    fontSize: 20,
                    fontWeight: 900,
                    width: '15%',
                    height: '30%',
                    marginLeft: '10px',
                    textAlign: 'left'
                }}>
                    Show 제목
                </Text>
                <Item sx={{place: 'center', width: '100%', height: '70%'}}>
                    <TextField sx={{
                        marginTop: '5px',
                        width: '95%',
                        height: '100%',
                        //marginLeft: '5px',
                    }}
                               placeholder={"제목을 입력해주세요."}
                               variant="outlined"
                               defaultValue={quiz.quizInfo.title}
                               onBlur={handleInputTitle}
                    />
                </Item>
            </Item>
        );
    }

    /**
     * 카테고리 선택
     * - 처음에 카테고리 선택이 안되있어서
     *   You have provided an out-of-range value `undefined` for the select component.
     *   Consider providing a value that matches one of the available options or ''.
     *   The available values are `카테고리1`, `카테고리2`, `카테고리3`, `카테고리4`.
     *   이 오류가 발생, 클라이언트가 선택하면 발생안함.
     */
    function ModalSelectCategory() {
        return (
            <Item sx={{place: 'left', width: '100%', height: '100%', display: 'block'}}>
                <Text sx={{
                    fontSize: 20,
                    fontWeight: 900,
                    width: '40%',
                    height: '25%',
                    marginLeft: '5px'
                }}>
                    카테고리 선택
                </Text>
                <Item sx={{place: 'left', width: '100%', height: '75%'}}>
                    <TextField
                        sx={{marginLeft: '20px', marginTop: '10px', width: '100%', height: '100%'}}
                        id="standard-select-currency"
                        select
                        value={"카테고리1"}
                        onChange={
                            (event) => {
                                dispatch(R_makeQuizShow({key: 'category', value: event.target.value}))
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
                </Item>
            </Item>
        );
    }

    /**
     * 공개/비공개 설정
     */
    function ModalShowIsPublic() {
        return (
            <Item sx={{place: 'center', width: '100%', height: '100%', display: 'block'}}>
                <Text sx={{
                    fontSize: 20,
                    fontWeight: 900,
                    width: '50%',
                    height: '25%',
                    marginLeft: '5px'
                }}>
                    공개 / 비공개 설정
                </Text>
                <Item sx={{place: 'left', width: '100%', height: '30%', margin: '5px'}}>
                    <FormGroup sx={{marginLeft: '15px', width: '100%', height: '100%'}}>
                        <FormControlLabel
                            sx={{fontWeight: 900}}
                            control={<Switch checked={quiz.quizInfo.public}/>}
                            label={label}
                            onChange={
                                (event) => {
                                    if (quiz.quizInfo.public) {
                                        setLabel("비공개");
                                        dispatch(R_makeQuizShow({key: 'public', value: event.target.checked}))
                                    } else {
                                        setLabel("공개");
                                        dispatch(R_makeQuizShow({key: 'public', value: event.target.checked}))
                                    }
                                }
                            }
                        />
                    </FormGroup>
                </Item>
                <Text sx={{
                    fontSize: 13,
                    fontWeight: 500,
                    width: '100%',
                    height: '25%',
                    marginTop: '10px'
                }}>
                    공개로 설정하는 경우 다른 사용자에게 Show가 공유됩니다.
                </Text>
            </Item>
        );
    }

    function ModalInputTag() {
        // 태그 입력
        const [chipText, setChipText] = useState('');
        const [chipErrorMsg, setChipErrorMsg] = useState('');

        return (
            <Item sx={{place: 'center', width: '100%', height: '100%', display: 'block'}}>
                <Text sx={{
                    fontSize: 20,
                    fontWeight: 900,
                    width: '9%',
                    height: '30%',
                    marginLeft: '5px'
                }}>
                    태그
                </Text>
                <Item sx={{place: 'center', width: '100%', height: '70%'}}>
                    <TextField
                        sx={{
                            marginTop: '5px',
                            width: '95%',
                            height: '100%',
                        }}
                        variant="outlined"
                        placeholder={"태그를 입력한 후 엔터를 누르세요."}
                        helperText={chipErrorMsg}
                        value={chipText}
                        onChange={
                            (event) => {
                                setChipErrorMsg('');
                                setChipText(event.target.value);
                            }
                        }
                        onKeyUp={
                            (event) => {
                                if (event.keyCode === 13) {
                                    if (chipText !== '') {
                                        // 중복 태그 체크
                                        let tagList = [];
                                        for (let i = 0; i < chipData.length; i++) {
                                            if (chipData[i].label !== chipText) {
                                                tagList.push({key: chipData[i].key, label: chipData[i].label})
                                            } else {
                                                setChipText('');
                                                setChipErrorMsg("현재 동일한 태그가 존재합니다.");
                                                return;
                                            }
                                        }
                                        // 새로 등록한 태그 추가
                                        tagList.push({key: chipCount, label: chipText});

                                        // chipData 설정
                                        setChipData(tagList);
                                        setChipText('');
                                        setChipCount(chipCount + 1);
                                    }
                                }
                            }
                        }
                    >
                    </TextField>
                </Item>
            </Item>
        );
    }

    function ModalAddTagChip() {
        return (
            <Item sx={{place: 'center', width: '100%', height: '100%'}}>
                <Item sx={{place: 'left', height: 30, width: '95%'}}>
                    {
                        chipData.map((item) => {
                            return (
                                <Item key={item.key} sx={{place: 'left', display: 'inline'}}>
                                    <Chip
                                        label={item.label}
                                        sx={{marginLeft: 1, marginRight: 1}}
                                        onDelete={
                                            () => {
                                                setChipData((chips) => chips.filter((chip) => chip.key !== item.key));
                                            }
                                        }/>
                                </Item>
                            )
                        })
                    }
                </Item>
            </Item>
        )
    }

    function ModalDataSubmit() {
        return (
            <Item sx={{place: 'center'}}>
                <Btn onClick={handleCreate}>
                    생성
                </Btn>
            </Item>
        )
    }
}
