import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {R_addQuiz, R_makeQuizShow, R_setCurrentShow} from "../../redux/reducers/quizInfoReducer";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import * as React from "react";
import axios from "axios";
import CustomAxios from "../../function/CustomAxios";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

const Styled_BottomNavigation = styled(BottomNavigation)`
    width: 100%;
    height: 5vh;
`;

export const ControlPanel = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const quiz = props.quiz;

    const verifyQuiz = () => {
        let result = [];
        console.log(quiz.quizData);
        quiz.quizData.forEach((item, index) => {
            //공통 검증
            console.log("question"+item.answer);
            if (item["question"] === "") {
                result.push(index + 1 + "번 문제의 문제를 입력해주세요.");
            }
            if (item["answer"].length === 0) {
                result.push(index + 1 + "번 문제의 정답을 입력해주세요.");
            }
            if(item.time === 0){
                result.push(index + 1 + "번 문제의 제한시간을 입력해주세요.");
            }

            //유형 별 검증
            switch (item.type) {
                case "선택형":
                    let ChoiceList = [];
                    for(let i = 1; i <= 4; i++){
                        if(item.choiceList["num"+i]!=""){
                            ChoiceList.push(item.choiceList["num"+i]);
                        }
                    }
                    if(ChoiceList.length < 2){
                        result.push(index + 1 + "번 문제의 선택지를 2개 이상 입력해주세요.");
                    }
                    break;
                case "OX":
                    break;
                case "단답형":
                    break;
            }
        })
        return result;
    }


    const save = async () => {
        let result = verifyQuiz();
        if(result.length > 0){
            dispatch(R_makeQuizShow({key:"state", value:"작성중"}));
            alert(result.join("\n"));
            return;
        }else{
            dispatch(R_makeQuizShow({key:"state", value:"완성"}));
            await CustomAxios.post('/v1/show', quiz)
                .then(res => {
                    console.log(res.data)
                    history.push("/QHost");
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }
    const addPage = () => {
        dispatch(R_addQuiz());
        dispatch(R_setCurrentShow(quiz.quizData.length));
    }

    return (
        <Styled_BottomNavigation showLabels>
            <BottomNavigationAction label="+ Page" onClick={addPage}/>
            <BottomNavigationAction label="+ Show"/>
            <BottomNavigationAction label="Save" onClick={save}/>
        </Styled_BottomNavigation>
    )
}
