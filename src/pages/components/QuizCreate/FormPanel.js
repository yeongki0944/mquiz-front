import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    R_addQuiz,
    R_copyQuiz,
    R_deleteQuiz,
    R_modifyQuiz,
    R_modifyQuizAnswer,
    R_setCurrentShow
} from "../../redux/reducers/quizInfoReducer";
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
import ImageBox from "../Inputs/ImageBox";
import YoutubeBox from "../Inputs/YoutubeBox";
import AudioBox from "../Inputs/AudioBox";
import {styled} from "@mui/material/styles";
import {Type_Reply} from "./QuizFormTypes/Type_Reply";
import {Type_OX} from "./QuizFormTypes/Type_OX";
import {Type_Select} from "./QuizFormTypes/Type_Select";



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


export const FormPanel = (props) => {
    const dispatch = useDispatch();
    const classes = FormPanelStyles();
    const currentQuiz = props.currentQuiz;

    const setQuiz = (keytype, key, value) => {
        dispatch(R_modifyQuiz({keytype: keytype, key: key, value: value}));
    }

    const TypeButton = () => {
        const types = ['선택형', 'OX', '단답형'];

        return (
            <Box>
                <Grid container spacing={1}>
                    {types.map((type) => (
                        <Button key={type}
                                onClick={() => {
                                    setQuiz('base', 'type', type);
                                    setQuiz('base', 'answer', []);
                                    switch(type){
                                        case '선택형':
                                            setQuiz('base', 'choiceList', {1: '', 2: '', 3: '', 4: ''});
                                            break;
                                        case 'OX':
                                            setQuiz('base', 'choiceList', {1: 'O', 2: '', 3: '', 4: ''});
                                            break;
                                        case '단답형':
                                            setQuiz('base', '', {1: '', 2: '', 3: '', 4: ''});
                                            break;
                                    }
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

    const handleChangeText = (event) => {
        const {name, value} = event.target;
        setQuiz("base", "question", value);
    };

    const Question = () => {
        return (
            <Box>
                <h3>Question</h3>
                <TextField
                    multiline
                    rows={4}
                    placeholder={"질문을 입력해주세요."}
                    variant="outlined"
                    defaultValue={currentQuiz.question}
                    onBlur={handleChangeText}
                    name={"Question"}
                />
            </Box>
        )
    }
    const Options = () => {
        const times = [{value: 0, label: '0초'}, {value: 10, label: '10초'}, {value: 20, label: '20초'}, {value: 30, label: '30초'}, {value: 40, label: '40초'}, {value: 50, label: '50초'}, {value: 60, label: '60초'}];
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


    const FormType = () => {
        switch (currentQuiz.type) {
            case '선택형':
                return <Type_Select/>;
            case 'OX':
                return <Type_OX/>;
            case '단답형':
                return <Type_Reply/>;
        }
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

