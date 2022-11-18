import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent, Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup, Rating, Switch,
    TextField, ToggleButtonGroup
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ImageBox from "../../components/ImageBox";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import QSelect from "./QuizTypes/Select";
import QOX from "./QuizTypes/OX";
import QRep from "./QuizTypes/Write";
import {modifyQuiz} from "../../redux/reducers/quizInfoReducer";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '80%',
    maxHeight: '80%',
});

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '90vh',
        backgroundColor: '#f5f5f5',
        overflow: 'scroll',
        overflowX: 'hidden',
    },
}));


export default function Component() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);


    //state
    const [answerList, setAnswerList] = useState([]);
    const [types, setTypes] = React.useState(['선택형', 'OX형', '단답형']);
    const [times, setTimes] = React.useState([{value: 0, label: '0초'}, {value: 10, label: '10초'}, {
        value: 20,
        label: '20초'
    }, {value: 30, label: '30초'}, {value: 40, label: '40초'}, {value: 50, label: '50초'}, {value: 60, label: '60초'}]);

    const setQuiz= (keytype,key,value)=>{
        dispatch(modifyQuiz({keytype:keytype,key:key,value:value}));
    }

    return (
        <div className={classes.content}>
            <TypeButton/>
            {answerList}
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

    function TypeButton() {
        return (
            <Box>
                <Grid container spacing={1}>
                    {types.map((type) => (
                        <Button key={type}
                            onClick={() => {
                                setQuiz('base','type',type);
                                setQuiz('base','answer','');
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
        );
    }

    function Options() {
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
                        modifyQuiz({keytype:"base", key:"rate", value:newValue});
                    }}
                />
            </Box>
        );
    }

    function MediaBox() {
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
                <MediaTypeBox/>
            </Box>
        );

    }

    function MediaTypeBox() {
        // console.log(currentQuiz);
        // switch(currentQuiz.media.type) {
        //     case 'Image':
        //         return <ImageBox/>;
        //     case 'Youtube':
        //         return <YoutubeBox/>;
        //     case 'Audio':
        //         return <AudioBox/>;
        //     default:
        //         return <ImageBox/>;
        // }
    }

    function YoutubeBox() {
        return (
            <Box>
                <TextField
                    placeholder={"유튜브 링크를 입력해주세요."}
                    value={currentQuiz[0].media.url}
                    onChange={(event) => {
                        setQuiz("media", "url", event.target.value);
                    }}
                />
                <TextField/>~<TextField/>
            </Box>
        );
    }

    function AudioBox() {
        return (
            <Box>
                <TextField
                    placeholder={"오디오 링크를 입력해주세요."}
                    value={currentQuiz[0].media.url}
                    onChange={(event) => {
                        setQuiz("media", "url", event.target.value);
                    }}
                />
            </Box>
        );
    }


    function Question() {
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
        );
    }


    function FormType() {
        switch (currentQuiz.type) {
            case '선택형':
                return <QSelect/>;
            case 'OX형':
                return <QOX/>;
            case '단답형':
                return <QRep/>;
        }


    }
}

