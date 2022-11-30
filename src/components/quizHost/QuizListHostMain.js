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

const Item = styled.div`
    @media (min-width: 767px) {
        width: 70%;
        border: 3px solid orange;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        margin-bottom: 10px;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        background-color: white;
    }

    @media (min-width: 300px) and (max-width: 767px) {
        width: 70%;
        border: 3px solid orange;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        margin-bottom: 10px;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        background-color: white;
    }
`

const EditIcon_Styled = styled(EditIcon)`
    @media (min-width: 300px) and (max-width: 767px) {
        display: none;
    }
`

const AddBtn = styled.div`
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    border: 2px solid darkgrey;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    @media (min-width: 300px) and (max-width: 767px) {
        display: none;
    }
`

export const QuizListHostMain = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const quizList = props.quizList;

    const list = quizList.map(
        (item) => (
            <Item key={item.id}
                  onClick={() => {
                      CustomAxios.get('/v1/show?showId=' + item.id)
                          .then(res => {
                              console.log(res.data);
                              dispatch(R_setId(item.id));
                              dispatch(R_setQuiz(res.data.data));
                              dispatch(R_setCurrentShow(1));
                          })
                          .catch(err => {
                              console.log(err);
                          })
                  }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <img alt="complex"
                             src="data:image/png;base64,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"/>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="subtitle1" gutterBottom>
                                    {item.quizInfo.state === "작성중" ?
                                        <span style={{color: "white", backgroundColor: "orange"}}>작성중</span> : <span
                                            style={{color: "white", backgroundColor: "green"}}>사용가능</span>} {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Q.{item.quizInfo.qcnt}문제 카운터 추가 필요
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.quizInfo.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    생성일자: {item.quizInfo.createDate}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" component="div">
                                {item.quizInfo.state === "작성중" ?
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(item.id)
                                    }}><EditIcon_Styled/></Button>
                                    : null
                                }
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlay(item.id)
                                }}><PlayArrow/></Button>
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    handledelete(item.id)
                                }}><DeleteForeverIcon/></Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Item>
        )
    );

    function handledelete(id) {
        CustomAxios.delete(`/v1/show?showId=${id}`)
            .then(res => {
                console.log(res);
                history.go(0);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEdit = (id) => {
        CustomAxios.get('/v1/show?showId=' + id)
            .then(res => {
                console.log(res.data);
                dispatch(R_setId(id));
                dispatch(R_setQuiz(res.data.data));
                dispatch(R_setCurrentShow(1));
            })
            .catch(err => {
                console.log(err);
            })
        history.push({
            pathname: '/QHost/create',
        })
    }

    const handlePlay = (id) => {
        CustomAxios.get('/v1/show?showId=' + id)
            .then(res => {
                console.log(res.data);
                dispatch(R_setId(id));
                dispatch(R_setQuiz(res.data.data));
                dispatch(R_setCurrentShow(1));
            })
            .catch(err => {
                console.log(err);
            });

        CustomAxios.post('/v1/host/createPlay', {'quizId':id})
            .then(res =>{
                dispatch(R_setData({key:"command", value:"READY"})); // 최초 세팅
                dispatch(R_setData({key:"pinNum", value:res.data.data}))
                history.push({
                    //pathname: '/QHost/ready',
                    pathname: '/QHost/play',
                })
            })
            .catch(()=>{
                console.log("오류 발생");
            });
    }

    function handleCreate() {
        props.setModalOpen(true);
    }

    return (
        <div>
            <AddBtn>
                <Button fullWidth={true} onClick={handleCreate}><Add/></Button>
            </AddBtn>
            {list}
        </div>
    );


}
