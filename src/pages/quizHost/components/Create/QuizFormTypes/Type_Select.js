import {useDispatch, useSelector} from "react-redux";
import {R_modifyQuiz, R_modifyQuizAnswer} from "../../../../redux/reducers/quizInfoReducer";
import {useEffect} from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material";
import * as React from "react";

export const Type_Select = () => {
    const dispatch = useDispatch();

    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    //answer is an array type
    const answer = currentQuiz.answer;

    const handleChangeChk = (event) => {
        const {name, checked} = event.target;
        if (checked) {
            dispatch(R_modifyQuizAnswer(answer.concat(name)));
            // console.log(answer);
        } else {
            dispatch(R_modifyQuizAnswer(answer.filter(item => item !== name)));
            // console.log(answer);
        }
    };

    const handleChangeText = (event) => {
        const {name, value} = event.target;
        dispatch(R_modifyQuiz({keytype: "choiceList", key: name, value: value}));
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">정답</FormLabel>
            <FormGroup>
                {/*    4checkbox*/}
                {Object.keys(currentQuiz.choiceList).map((item, index) => {
                    return (
                        <div key={index}>
                            <FormControlLabel
                                control={<Checkbox checked={answer.includes(item)} onChange={handleChangeChk}
                                                   name={item}/>}
                            />
                            <TextField
                                variant="outlined"
                                defaultValue={currentQuiz.choiceList[item]}
                                onBlur={handleChangeText}
                                name={item}
                            />
                        </div>
                    )
                })}
            </FormGroup>
        </FormControl>
    )

    // const modifyQuiz = (keytype, key, value) => {
    //     dispatch(R_modifyQuiz({keytype, key, value}))
    // }
    //
    // const chk = getAnswer();
    //
    // function getAnswer() {
    //     let answer = [];
    //
    //     if (currentQuiz.answer.includes(1)) {
    //         answer.push(true);
    //     } else {
    //         answer.push(false);
    //     }
    //     if (currentQuiz.answer.includes(2)) {
    //         answer.push(true);
    //     } else {
    //         answer.push(false);
    //     }
    //     if (currentQuiz.answer.includes(3)) {
    //         answer.push(true);
    //     } else {
    //         answer.push(false);
    //     }
    //     if (currentQuiz.answer.includes(4)) {
    //         answer.push(true);
    //     } else {
    //         answer.push(false);
    //     }
    //     return answer;
    // }
    //
    // useEffect(() => {
    //     // console.log(chk[0]);
    // }, [])
    //
    // function handleCheck(e) {
    //     let answer = [];
    //     for (let i = 1; i < 5; i++) {
    //         if (document.getElementById("chk" + i).checked) {
    //             answer.push(i);
    //         }
    //     }
    //     console.log(answer);
    //     R_modifyQuizAnswer(["1","2", "3", "4"]);
    // }
    //
    // return (
    //     <>
    //         {/*<Button onClick={()=>{*/}
    //         {/*    modifyQuizAnswerExecute(modifyQuizAnswer())*/}
    //         {/*}}>test</Button>*/}
    //         <FormControl component="fieldset">
    //             <FormLabel component="legend">정답</FormLabel>
    //             <FormGroup>
    //                 <FormControlLabel
    //                     control={<Checkbox
    //                         defaultValue={chk[0]}
    //                         onChange={()=>{
    //                             R_modifyQuizAnswer(["1","2", "3", "4"]);
    //                         }}
    //                         id={"chk1"}
    //                     />}
    //                     label={<TextField placeholder={"답을 입력해주세요."}
    //                                       defaultValue={currentQuiz.choiceList[1]}
    //                                       onBlur={(event) => {
    //                                           modifyQuiz("choiceList", "1", event.target.value);
    //                                       }}/>}
    //                 />
    //                 <FormControlLabel
    //                     control={<Checkbox
    //                         defaultValue={chk[1]}
    //                         onChange={handleCheck}
    //                         id={"chk2"}
    //                     />}
    //                     label={<TextField placeholder={"답을 입력해주세요."}
    //                                       defaultValue={currentQuiz.choiceList[2]}
    //                                       onBlur={(event) => {
    //                                           modifyQuiz("choiceList", "2", event.target.value);
    //                                       }}/>}
    //                 />
    //                 <FormControlLabel
    //                     control={<Checkbox
    //                         defaultValue={chk[2]}
    //                         onChange={handleCheck}
    //                         id={"chk3"}
    //                     />}
    //                     label={<TextField placeholder={"답을 입력해주세요."}
    //                                       defaultValue={currentQuiz.choiceList[3]}
    //                                       onBlur={(event) => {
    //                                           modifyQuiz("choiceList", "3", event.target.value);
    //                                       }}/>}
    //                 />
    //                 <FormControlLabel
    //                     control={<Checkbox
    //                         defaultValue={chk[3]}
    //                         onChange={handleCheck}
    //                         id={"chk4"}
    //                     />}
    //                     label={<TextField placeholder={"답을 입력해주세요."}
    //                                       defaultValue={currentQuiz.choiceList[4]}
    //                                       onBlur={(event) => {
    //                                           modifyQuiz("choiceList", "4", event.target.value);
    //                                       }}/>}
    //                 />
    //             </FormGroup>
    //             {/*<FormHelperText>Be careful</FormHelperText>*/}
    //         </FormControl>
    //     </>
    // );
}
