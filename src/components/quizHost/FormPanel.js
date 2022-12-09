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
import ImageBox from "./Inputs/ImageBox";
import YoutubeBox from "./Inputs/YoutubeBox";
import AudioBox from "./Inputs/AudioBox";
import {styled} from "@mui/material/styles";
import {Type_Reply} from "./QuizFormTypes/Type_Reply";
import {Type_OX} from "./QuizFormTypes/Type_OX";
import {Type_Select} from "./QuizFormTypes/Type_Select";
import {Item_c} from "../../LayOuts/LayOuts";


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '80%',
    maxHeight: '80%',
});


export const FormPanel = (props) => {
    const dispatch = useDispatch();
    const currentQuiz = props.currentQuiz;


    const setQuiz = (keytype, key, value) => {
        dispatch(R_modifyQuiz({keytype: keytype, key: key, value: value}));
    }

    const TypeButton = () => {
        const types = ['선택형', 'OX', '단답형'];

        return (
            <div>
                <Item_c>
                    {types.map((type) => (
                        <Button key={type}
                                onClick={() => {
                                    setQuiz('base', 'type', type);
                                    setQuiz('base', 'answer', []);
                                    switch (type) {
                                        case '선택형':
                                            setQuiz('base', 'choiceList', {
                                                "num1": '',
                                                "num2": '',
                                                "num3": '',
                                                "num4": ''
                                            });
                                            break;
                                        case 'OX':
                                            setQuiz('base', 'choiceList', {
                                                "num1": '',
                                                "num2": '',
                                                "num3": '',
                                                "num4": ''
                                            });
                                            setQuiz('base', 'answer', ['O']);
                                            break;
                                        case '단답형':
                                            setQuiz('base', '', {"num1": '', "num2": '', "num3": '', "nu4": ''});
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
                </Item_c>
            </div>
        )
    }

    const handleChangeText = (event) => {
        const {name, value} = event.target;
        setQuiz("base", "question", value);
    };

    const Question = () => {
        return (
            <div>
                <TextField
                    multiline
                    rows={4}
                    placeholder={"질문을 입력해주세요."}
                    variant="outlined"
                    defaultValue={currentQuiz.question}
                    onBlur={handleChangeText}
                    name={"Question"}
                />
            </div>
        )
    }
    const Options = () => {
        const times = [{value: 0, label: '0초'}, {value: 10, label: '10초'}, {value: 20, label: '20초'}, {
            value: 30,
            label: '30초'
        }, {value: 40, label: '40초'}, {value: 50, label: '50초'}, {value: 60, label: '60초'}];
        return (
            <div>
                <Item_c>
                    점수 사용
                    <Switch
                        checked={currentQuiz.useScore}
                        onChange={(event) => {
                            setQuiz("base", "useScore", event.target.checked);
                            if (!event.target.checked) {
                                setQuiz("base", "rate", 0);
                            } else {
                                setQuiz("base", "rate", 1);
                            }
                        }}
                    />
                </Item_c>
                <Item_c>
                    <Rating
                        id="rate"
                        name="simple-controlled"
                        max={3}
                        value={currentQuiz.rate}
                        onChange={(event, newValue) => {
                            setQuiz("base", "rate", newValue);
                            if (event.target.value > 0) {
                                setQuiz("base", "useScore", true);
                            }
                        }}
                    />
                </Item_c>
                <Item_c>시간제한
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
                </Item_c>
            </div>
        );
    }

    const MediaBox = () => {
        return (
            <div>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={currentQuiz.media.type}
                        name="radio-buttons-group"
                    >
                        <Item_c>
                            <FormControlLabel value="Image" control={<Radio/>} label="Image"
                                              onClick={() => {
                                                  setQuiz("media", "type", 'Image');
                                                  setQuiz("media", "url", '');
                                              }}/>
                            <FormControlLabel value="Youtube" control={<Radio/>} label="Youtube"
                                              onClick={() => {
                                                  setQuiz("media", "type", 'Youtube');
                                                  setQuiz("media", "url", '');
                                              }}/>
                            <FormControlLabel value="Audio" control={<Radio/>} label="Audio"
                                              onClick={() => {
                                                  setQuiz("media", "type", 'Audio');
                                                  setQuiz("media", "url", '');
                                              }}/>
                        </Item_c>
                    </RadioGroup>
                </FormControl>
                {currentQuiz.media.type === 'Image' && <ImageBox/>}
                {currentQuiz.media.type === 'Youtube' && <YoutubeBox/>}
                {currentQuiz.media.type === 'Audio' && <AudioBox/>}
            </div>
            // <Box>
            //     <FormControl>
            //         <RadioGroup
            //             row
            //             aria-labelledby="demo-row-radio-buttons-group-label"
            //             name="row-radio-buttons-group"
            //         >
            //             <FormControlLabel value="Image" control={<Radio/>} onClick={() => {
            //                 setQuiz("media", "type", 'Image');
            //                 setQuiz("media", "url", '');
            //             }} label="Image"/>
            //             <FormControlLabel value="Youtube" control={<Radio/>} onClick={() => {
            //                 setQuiz("media", "type", 'Youtube');
            //                 setQuiz("media", "url", '');
            //             }} label="Youtube"/>
            //             <FormControlLabel value="Audio" control={<Radio/>} onClick={() => {
            //                 setQuiz("media", "type", 'Audio');
            //                 setQuiz("media", "url", '');
            //             }} label="Audio"/>
            //         </RadioGroup>
            //     </FormControl>
            //     {currentQuiz.media.type === 'Image' && <ImageBox/>}
            //     {currentQuiz.media.type === 'Youtube' && <YoutubeBox/>}
            //     {currentQuiz.media.type === 'Audio' && <AudioBox/>}
            // </Box>
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
        <div>
            <hr/>
            <FormLabel component="legend">유형</FormLabel>
            <Item_c><TypeButton/></Item_c>
            <hr/>
            <FormLabel component="legend">질문</FormLabel>
            <Item_c><Question/></Item_c>
            <hr/>
            <FormLabel component="legend">미디어</FormLabel>
            <Item_c><MediaBox/></Item_c>
            <hr/>
            <FormLabel component="legend">정답</FormLabel>
            <Item_c><FormType/></Item_c>
            <hr/>
            <FormLabel component="legend">옵션</FormLabel>
            <Item_c><Options/></Item_c>
        </div>
    );
}

