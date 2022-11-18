import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    R_addQuiz,
    R_copyQuiz,
    R_deleteQuiz,
    R_modifyQuiz,
    R_modifyQuizAnswer,
    R_setCurrentShow
} from "../redux/reducers/quizInfoReducer";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    Card,
    CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Rating,
    Switch,
    TextField
} from "@mui/material";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ImageBox from "./ImageBox";
import YoutubeBox from "./YoutubeBox";
import AudioBox from "./AudioBox";
import {styled} from "@mui/material/styles";

const ListPanelStyles = makeStyles((theme) => ({
    content: {
        height: "90vh",
        overflow: "scroll",
        overflowX: "hidden",
    },
    items: {
        // backgroundColor: "#ffffff",
        // color: "#000000",
    },
    item_card: {
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "10px",
        margin: "10px",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
    },
    selected: {
        border: "1px solid orange",
    }
}));
const ControlPanelStyles = makeStyles((theme) => ({
    content: {
        height: "10vh",
        overflow: "scroll",
        overflowX: "hidden",
    },
}));
const FormPanelStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '90vh',
        backgroundColor: '#f5f5f5',
        overflow: 'scroll',
        overflowX: 'hidden',
    },
}));

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '80%',
    maxHeight: '80%',
});

export const ListPanel = (props) => {
    const classes = ListPanelStyles();
    const dispatch = useDispatch();
    const quiz = props.quiz;

    useEffect(() => {
        setSelected(quiz.currentShow);
    }, [quiz.currentShow]);

    const setSelected = (currentShow) => {
        const allItems = document.getElementsByClassName(classes.item_card);
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove(classes.selected);
        }
        document.getElementById(currentShow).classList.add(classes.selected);
    }

    return (
        <div className={classes.content}>
            {quiz.quizData.map((item) =>
                <Grid container className={classes.items} key={item.num}>
                    <Grid item xs={2}>
                        {item.num}P
                    </Grid>
                    <Paper elevation={2} className={classes.item_card} key={item.num} id={item.num}
                           onClick={() => dispatch(R_setCurrentShow(item.num))}>
                        <Grid item xs={10}>
                            <Grid>Status</Grid>
                            <Grid>[{item.type}]</Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <Button onClick={() => {
                                    dispatch(R_copyQuiz(item.num));
                                }}>
                                    <FileCopyIcon/>
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={() => {
                                    dispatch(R_deleteQuiz(item.num));
                                }}>
                                    <DeleteForeverIcon/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            )}
        </div>
    )
}
export const ControlPanel = (props) => {
    const classes = ControlPanelStyles();
    const dispatch = useDispatch();
    const quiz = props.quiz;

    const save = () => {
        const data = JSON.stringify(quiz.quizData);
        // console.log(data);
        // axios.post("http://localhost:8080/quiz", data)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }
    const addPage = () => {
        dispatch(R_addQuiz());
        dispatch(R_setCurrentShow(quiz.quizData.length));
    }

    return (
        <BottomNavigation showLabels>
            <BottomNavigationAction label="+ Page" onClick={addPage}/>
            <BottomNavigationAction label="+ Show"/>
            <BottomNavigationAction label="Save" onClick={save}/>
        </BottomNavigation>
    )
}
export const FormPanel = (props) => {
    const dispatch = useDispatch();
    const classes = FormPanelStyles();
    const currentQuiz = props.currentQuiz;

    const [answerList, setAnswerList] = useState([]);
    const [times, setTimes] = useState([{value: 0, label: '0초'}, {value: 10, label: '10초'}, {
        value: 20,
        label: '20초'
    }, {value: 30, label: '30초'}, {value: 40, label: '40초'}, {value: 50, label: '50초'}, {value: 60, label: '60초'}]);

    const setQuiz = (keytype, key, value) => {
        dispatch(R_modifyQuiz({keytype: keytype, key: key, value: value}));
    }

    const TypeButton = () => {
        const [types, setTypes] = useState(['선택형', 'OX', '단답형']);

        return (
            <Box>
                <Grid container spacing={1}>
                    {types.map((type) => (
                        <Button key={type}
                                onClick={() => {
                                    setQuiz('base', 'type', type);
                                    setQuiz('base', 'answer', '');
                                }}
                        >
                            <Card>
                                <CardContent>
                                    <Img alt="complex"
                                         src="https://www.quizn.show/webdata/images/type-icon/ico_type2_on.png"/>
                                    {type}
                                </CardContent>
                            </Card>
                        </Button>
                    ))}
                </Grid>
            </Box>
        )
    }
    const Question = () => {
        return (
            <Box>
                <h3>Question</h3>
                <TextField
                    id="textfield_test"
                    multiline
                    rows={4}
                    placeholder={"질문을 입력해주세요."}
                    onBlur={(event) => {
                        setQuiz("base", "question", event.target.value);
                    }}
                />
            </Box>
        )
    }
    const Options = () => {
        return (
            <Box>
                <h3>Options</h3>
                시간제한
                <TextField
                    select
                    value={currentQuiz.time}
                    onChange={(event) => {
                        setQuiz("base", "time", event.target.value);
                    }}
                    SelectProps={{
                        native: true,
                    }}
                >
                    {times.map((time) => (
                        <option
                            key={time.value}
                            value={time.value}
                        >
                            {time.label}
                        </option>
                    ))}
                </TextField>[초]
                점수 사용
                <Switch
                    checked={currentQuiz.useScore}
                    onChange={(event) => {
                        setQuiz("base", "useScore", event.target.checked);
                    }}
                />

                <Rating
                    name="simple-controlled"
                    max={3}
                    value={currentQuiz.rate}
                    onChange={(event, newValue) => {
                        setQuiz("base", "rate", newValue);
                    }}
                />
            </Box>
        );
    }
    const FormType = () => {
        switch (currentQuiz.type) {
            case '선택형':
                return <QSelect/>;
            case 'OX':
                return <QOX/>;
            case '단답형':
                return <QRep/>;
        }
    }
    const MediaBox = () => {
        return (
            <Box>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Media</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="Image" control={<Radio/>} onClick={() => {
                            setQuiz("media", "type", 'Image');
                        }} label="Image"/>
                        <FormControlLabel value="Youtube" control={<Radio/>} onClick={() => {
                            setQuiz("media", "type", 'Youtube');
                        }} label="Youtube"/>
                        <FormControlLabel value="Audio" control={<Radio/>} onClick={() => {
                            setQuiz("media", "type", 'Audio');
                        }} label="Audio"/>
                    </RadioGroup>
                </FormControl>
                {currentQuiz.media.type === 'Image' && <ImageBox/>}
                {currentQuiz.media.type === 'Youtube' && <YoutubeBox/>}
                {currentQuiz.media.type === 'Audio' && <AudioBox/>}
            </Box>
        );

    }
    return (
        <div className={classes.content}>
            <TypeButton/>
            <hr/>
            <Question/>
            <hr/>
            <MediaBox/>
            <hr/>
            <FormType/>
            <hr/>
            <Options/>
        </div>
    );
}

const QSelect = () =>{
    const dispatch = useDispatch();

    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    const modifyQuiz = (keytype, key, value) => {
        dispatch(R_modifyQuiz({keytype, key, value}))
    }

    const chk = getAnswer();

    function getAnswer() {
        let answer = [];

        if (currentQuiz.answer.includes(1)) {
            answer.push(true);
        } else {
            answer.push(false);
        }
        if (currentQuiz.answer.includes(2)) {
            answer.push(true);
        } else {
            answer.push(false);
        }
        if (currentQuiz.answer.includes(3)) {
            answer.push(true);
        } else {
            answer.push(false);
        }
        if (currentQuiz.answer.includes(4)) {
            answer.push(true);
        } else {
            answer.push(false);
        }
        return answer;
    }

    useEffect(() => {
        // console.log(chk[0]);
    }, [])

    function handleCheck(e) {
        let answer = [];
        for (let i = 1; i < 5; i++) {
            if (document.getElementById("chk" + i).checked) {
                answer.push(i);
            }
        }
        console.log(answer);
        R_modifyQuizAnswer(["1","2", "3", "4"]);
    }

    return (
        <>
            {/*<Button onClick={()=>{*/}
            {/*    modifyQuizAnswerExecute(modifyQuizAnswer())*/}
            {/*}}>test</Button>*/}
            <FormControl component="fieldset">
                <FormLabel component="legend">정답</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                            defaultValue={chk[0]}
                            onChange={()=>{
                                R_modifyQuizAnswer(["1","2", "3", "4"]);
                            }}
                            id={"chk1"}
                        />}
                        label={<TextField placeholder={"답을 입력해주세요."}
                                          defaultValue={currentQuiz.choiceList[1]}
                                          onBlur={(event) => {
                                              modifyQuiz("choiceList", "1", event.target.value);
                                          }}/>}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            defaultValue={chk[1]}
                            onChange={handleCheck}
                            id={"chk2"}
                        />}
                        label={<TextField placeholder={"답을 입력해주세요."}
                                          defaultValue={currentQuiz.choiceList[2]}
                                          onBlur={(event) => {
                                              modifyQuiz("choiceList", "2", event.target.value);
                                          }}/>}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            defaultValue={chk[2]}
                            onChange={handleCheck}
                            id={"chk3"}
                        />}
                        label={<TextField placeholder={"답을 입력해주세요."}
                                          defaultValue={currentQuiz.choiceList[3]}
                                          onBlur={(event) => {
                                              modifyQuiz("choiceList", "3", event.target.value);
                                          }}/>}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            defaultValue={chk[3]}
                            onChange={handleCheck}
                            id={"chk4"}
                        />}
                        label={<TextField placeholder={"답을 입력해주세요."}
                                          defaultValue={currentQuiz.choiceList[4]}
                                          onBlur={(event) => {
                                              modifyQuiz("choiceList", "4", event.target.value);
                                          }}/>}
                    />
                </FormGroup>
                {/*<FormHelperText>Be careful</FormHelperText>*/}
            </FormControl>
        </>
    );
}
const QOX = () =>{
    const dispatch = useDispatch();
    return (
        <Box>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">정답</FormLabel>
                <RadioGroup
                    row
                    aria-label="quiz"
                    name="quiz"
                    defaultValue="O"
                    onChange={(e) => {
                        dispatch(R_modifyQuizAnswer(e.target.value));
                    }}
                >
                    <FormControlLabel value="O" control={<Radio/>} label="O"/>
                    <FormControlLabel value="X" control={<Radio/>} label="X"/>
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
const QRep = () =>{
    const dispatch = useDispatch();
    return (
        <Box>
            <h3>정답</h3>
            <TextField
                id="qfield"
                multiline
                rows={4}
                defaultValue={""}
                onBlur={(e) => {
                    dispatch(R_modifyQuizAnswer([e.target.value]));
                }}
            />
        </Box>
    );
}

