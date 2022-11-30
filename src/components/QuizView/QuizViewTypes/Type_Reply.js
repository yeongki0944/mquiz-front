import {useDispatch, useSelector} from "react-redux";
import {Box, TextField} from "@mui/material";
import {R_modifyQuizAnswer} from "../../../redux/reducers/quizInfoReducer";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {R_setContent, R_setData} from "../../../redux/reducers/quizplayReducer";

export const Type_Reply = () => {
    const dispatch = useDispatch();
    const quizPlay = useSelector(state => state.quizPlay);
    const [quizAnswer, setquizAnswer] = useState('');
    const [error, setError] = useState('');

    const handleInput = (e) => {
        setquizAnswer(e.target.value);
    }

    const handleSubmit = () => {
        //const quizAnswerRegex = /^[0-9]{6,6}$/g;
        // if (!quizAnswerRegex.test(quizAnswer)) {
        //     setError('정답을 입력해주세요!');
        // } else {
        //     setError('');
             handleEnter();
        // }
    };

    const handleEnter = () => {
        dispatch(R_setContent({key: "answer", value: quizAnswer}));
    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <div>
            <TextField id="quizAnswer" name="quizAnswer" type="quizAnswer" label="정답을 입력해 주세요"
                       variant="outlined"
                       //helperText={error}
                       //error={error !== '' || false} required autoFocus
                       onBlur={handleInput}
                       onKeyPress={handleEnterKey}
            />
            <Typography variant="h5" component="div" align='center'>
                <Button variant="contained" onClick={handleSubmit}>정답제출</Button>
            </Typography>
        </div>
    );
}

