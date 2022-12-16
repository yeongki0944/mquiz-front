import {
    R_modifyQuiz,
} from "../../redux/reducers/quizInfoReducer";
import {
    Button,
    Card,
    CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Rating,
    Switch,
    TextField
} from "@mui/material";
import * as React from "react";
import {useDispatch} from "react-redux";
import ImageBox from "./Inputs/ImageBox";
import YoutubeBox from "./Inputs/YoutubeBox";
import AudioBox from "./Inputs/AudioBox";
import {styled} from "@mui/material/styles";
import {Type_Reply} from "./QuizFormTypes/Type_Reply";
import {Type_OX} from "./QuizFormTypes/Type_OX";
import {Type_Select} from "./QuizFormTypes/Type_Select";
import {Item, Text} from "../../layouts/LayOuts";


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
            <Item sx={{place: 'center'}}>
                <Item sx={{place: 'center'}}>
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
                </Item>
            </Item>
        )
    }

    const handleChangeText = (event) => {
        const {name, value} = event.target;
        setQuiz("base", "question", value);
    };

    const Question = () => {
        return (
            <Item sx={{place: 'center', display: 'block'}}>
                <Item sx={{place: 'center'}}>
                    <TextField
                        multiline
                        rows={4}
                        placeholder={"질문을 입력해주세요."}
                        variant="outlined"
                        defaultValue={currentQuiz.question}
                        onBlur={handleChangeText}
                        name={"Question"}
                    />
                </Item>
            </Item>
        )
    }
    const Options = () => {
        const times = [{value: 0, label: '0초'}, {value: 10, label: '10초'}, {value: 20, label: '20초'}, {
            value: 30,
            label: '30초'
        }, {value: 40, label: '40초'}, {value: 50, label: '50초'}, {value: 60, label: '60초'}];
        return (
            <Item sx={{place: 'center', display: 'block'}}>
                <Item sx={{place: 'center', height: '50%'}}>
                    <Item sx={{place: 'center'}}>
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
                    </Item>
                    <Item sx={{place: 'center'}}>
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
                    </Item>
                </Item>
                <Item sx={{place: 'center', height: '50%'}}>
                    <Item sx={{place: 'center'}}>시간제한
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
                    </Item>
                </Item>
            </Item>
        );
    }

    const MediaBox = () => {
        return (
            <Item sx={{place: 'center', display: 'block'}}>
                <Item sx={{place: 'center', height: '30%'}}>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={currentQuiz.media.type}
                            name="radio-buttons-group"
                        >
                            <Item sx={{place: 'center'}}>
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
                            </Item>
                        </RadioGroup>
                    </FormControl>
                </Item>
                <Item sx={{place: 'center', height: '70%'}}>

                    {currentQuiz.media.type === 'Image' && <ImageBox/>}
                    {currentQuiz.media.type === 'Youtube' && <YoutubeBox/>}
                    {currentQuiz.media.type === 'Audio' && <AudioBox/>}
                </Item>
            </Item>
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
        <Item sx={{place: 'top', display: 'block'}}>
            <hr/>
            <Item sx={{place: 'center', display: 'block', height: 'auto'}}>
                <Text>유형</Text>
                <TypeButton/>
            </Item>
            <hr/>
            <Item sx={{place: 'center', display: 'block', height: 'auto'}}>
                <Text>질문</Text>
                <Question/>
            </Item>
            <hr/>
            <Item sx={{place: 'center', display: 'block', height: 'auto'}}>
                <Text>미디어</Text>
                <MediaBox/>
            </Item>
            <hr/>
            <Item sx={{place: 'center', display: 'block', height: 'auto'}}>
                <Text>정답</Text>
                <Item sx={{place: 'center'}}><FormType/></Item>
            </Item>
            <hr/>
            <Item sx={{place: 'center', display: 'block', height: 'auto'}}>
                <Text>옵션</Text>
                <Options/>
            </Item>
        </Item>
    );
}

