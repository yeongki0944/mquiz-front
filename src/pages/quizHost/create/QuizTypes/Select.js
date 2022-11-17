import {
    Box, Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ImageBox from "../../../components/ImageBox";
import * as React from "react";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

export default function QSelect() {
    const dispatch = useDispatch();
    const modifyQuiz = (keytype, key, value) => {
        dispatch({type: 'MODIFY_QUIZ', payload: {keytype, key, value}})
    }
    const modifyQuizAnswer = (value) => {
        dispatch({type: 'MODIFY_QUIZ_ANSWER', payload: {value}})
    }

    const[chk1, setChk1] = React.useState(false);
    const[chk2, setChk2] = React.useState(false);
    const[chk3, setChk3] = React.useState(false);
    const[chk4, setChk4] = React.useState(false);

        return (
            <>
                <Button onClick={()=>{
                    console.log(chk1, chk2, chk3, chk4);
                }}>test</Button>
            <FormControl component="fieldset">
                <FormLabel component="legend">정답</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={chk1} onChange={(e) => setChk1(e.target.checked)} name="chk1" />}
                        label={<TextField placeholder={"답을 입력해주세요."}
                                          // value={currentQuiz.choiceList[1]}
                                          onBlur={(event) => {
                                              modifyQuiz("choiceList", "1", event.target.value);
                                          }}/>}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={chk2} onChange={(e) => setChk2(e.target.checked)} name="chk2" />}
                        label={<TextField placeholder={"답을 입력해주세요."}
                                          // value={currentQuiz.choiceList[2]}
                                          onBlur={(event) => {
                                              modifyQuiz("choiceList", "2", event.target.value);
                                          }}/>}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={chk3} onChange={(e) => setChk3(e.target.checked)} name="chk3" />}
                        label={<TextField placeholder={"답을 입력해주세요."}
                                          // value={currentQuiz.choiceList[3]}
                                          onBlur={(event) => {
                                              modifyQuiz("choiceList", "3", event.target.value);
                                          }}/>}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={chk4} onChange={(e) => setChk4(e.target.checked)} name="chk4" />}
                        label={<TextField placeholder={"답을 입력해주세요."}
                                          // value={currentQuiz.choiceList[4]}
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
