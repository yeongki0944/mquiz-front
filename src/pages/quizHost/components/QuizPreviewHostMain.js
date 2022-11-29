import * as React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Box, Button} from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import PlayArrow from "@material-ui/icons/PlayArrow";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDispatch, useSelector} from "react-redux";
import Add from "@material-ui/icons/Add";
import {Link, useHistory} from "react-router-dom";
import CustomAxios from "../../function/CustomAxios";
import {R_setCurrentShow, R_setId, R_setQuiz} from "../../redux/reducers/quizInfoReducer";
import styled from "styled-components";
import {R_setData} from "../../redux/reducers/quizplayReducer";

/**
 * props:
 *  - quizList: 퀴즈 목록
 *  - setModalOpen: 모달 오픈 상태 변경 함수
 */

const Content = styled.div`
        height: 100%;
        width: 90%;
        border: 2px solid orange;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        margin-bottom: 10px;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        background-color: white;
`;

const Item = styled.div`
    border-bottom: 1px solid #e0e0e0;
`;
export const QuizPreviewHostMain = () => {
    const {quiz} = useSelector(state => state.quiz)
    if (quiz.id === "") {
        return (<Content></Content>)
    } else {
        return (
            <Content>
                <Item>
                    퀴즈: {quiz.quizData.length}문제
                </Item>
                {quiz.quizData.map(
                    (item, index) => {
                        return (
                            <Item key={index}>
                                [퀴즈{item.num}]
                                문제: {item.question}
                            </Item>
                        )
                    }
                )}
            </Content>
        );
    }

}
