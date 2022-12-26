import * as React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import PlayArrow from "@material-ui/icons/PlayArrow";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDispatch} from "react-redux";
import Add from "@material-ui/icons/Add";
import { useHistory} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";
import {Card_panel, Item} from "../../layouts/LayOuts";
import {createPlayAPI, deleteShowAPI, getShowInfoAPI, setShowListAPI} from "../../function/API";
import {redirectPage} from "../../function/common";
import store from "../../redux/store";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {setPinNum} from "../../function/localStorage";
import {R_addQuiz, R_setQuiz} from "../../redux/reducers/quizInfoReducer";
import {setCommand} from "../../function/reduxFunction";

/**
 * props:
 *  - quizList: 퀴즈 목록
 *  - setModalOpen: 모달 오픈 상태 변경 함수
 */


const EditIcon_Styled = styled(EditIcon)`
    @media (min-width: 300px) and (max-width: 767px) {
        display: none;
    }
`

const AddBtn = styled.div`
    width: 100%;
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

export const QuizList = (props) => {
    const history = useHistory();
    const quizList = props.quizList;
    const userInfo = props.userInfo;

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const list = quizList.map(
        (item,index) => (
            <Card_panel
                sx={{margin: '10px 0'}}
                key={index}
                onClick={()=>{getShowInfoAPI(item.id);}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <img alt="complex"
                             src="data:image/png;base64,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"/>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="subtitle1" gutterBottom>
                                    {item.quizInfo.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {item.quizInfo.state === "작성중" ?
                                        <span style={{color: "white", backgroundColor: "orange"}}>작성중</span> : <span
                                            style={{color: "white", backgroundColor: "green"}}>사용가능</span>}
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
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    setButtonDisabled(true);
                                    getShowInfoAPI(item.id);
                                    redirectPage("QHOSTCREATE");
                                }} disabled={buttonDisabled}><EditIcon_Styled/></Button>

                                {item.quizInfo.state === "완성" &&
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        setButtonDisabled(true);
                                        createPlayAPI(item.id).then((res) => {
                                            console.log(res);
                                            setCommand("READY")
                                            setPinNum(res.data.data);
                                            redirectPage("QHOSTPLAY");
                                        }).catch((err) => {
                                            console.log(err);
                                        });
                                        setButtonDisabled(false);
                                    }} disabled={buttonDisabled}><PlayArrow/></Button>
                                }
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    setButtonDisabled(true);
                                    deleteShowAPI(item.id).then((res) => {
                                        alert("삭제되었습니다.");
                                        setShowListAPI(userInfo.hostEmail);

                                        setButtonDisabled(false);
                                    }).catch((err) => {
                                        alert("삭제에 실패했습니다.");
                                        setButtonDisabled(false);
                                    });

                                }} disabled={buttonDisabled}><DeleteForeverIcon/></Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Card_panel>
        )
    );

    function handleCreate() {
        props.setModalOpen(true);
    }

    return (
        <Item sx={{place:'center',display:'block'}} sm={{place:'center'}}>
            <AddBtn>
                <Button fullWidth={true} onClick={handleCreate}><Add/></Button>
            </AddBtn>
            {list}
        </Item>
    );


}
