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
import {Content, Item, Item_c, Item_t} from "../LayOuts/LayOuts";
import {QuizView} from "../QuizView/QuizView";
import {QuizPreView} from "../QuizView/QuizPreView";

/**
 * props:
 *  - quizList: 퀴즈 목록
 *  - setModalOpen: 모달 오픈 상태 변경 함수
 */

const Item_t_Info = styled(Item_t)`
    height: 100%;
    width: 100%;
    display: block;
`;

const Item_c_Data = styled(Item_c)`
    border: 1px solid black;
    max-width:1000px;
    max-height:600px;
`;

export const QuizPreview = (props) => {
    const {quiz} = useSelector(state => state.quiz)
    if (quiz.id === "") {
        return (<Content sx={props.sx} sm={props.sm}></Content>)
    } else {
        return (
            <Content sx={props.sx} sm={props.sm}>
                <Content
                    sx={{
                        width: '100%', border: '2px solid orange',
                        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                        borderRadius: '10px',
                        padding: '10px',
                        display: 'block'
                    }}>
                    <Item sx={{width: '100%'}}>퀴즈: {quiz.quizData.length}문제</Item>
                    <Item sx={{width: '100%'}}>
                        {quiz.quizData.map(
                            (item, index) => {
                                return (
                                    <Item sx={{width: '100%'}} key={index}>
                                        <QuizPreView currentQuiz={item}/>
                                    </Item>
                                )
                            }
                        )}
                    </Item>
                </Content>
            </Content>
        )
            ;
    }

}
