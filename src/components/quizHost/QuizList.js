import * as React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import PlayArrow from "@material-ui/icons/PlayArrow";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Add from "@material-ui/icons/Add";
import styled from "styled-components";
import {useState} from "react";
import {Card_panel, Item} from "../../layouts/LayOuts";
import {createPlayAPI, deleteShowAPI, getShowInfoAPI, setShowListAPI} from "../../function/API";
import {redirectPage} from "../../function/common";
import {setPinNum} from "../../function/localStorage";
import {setCommand} from "../../function/reduxFunction";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

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
    const quizList = props.quizList;
    const userInfo = props.userInfo;
    const MySwal = withReactContent(Swal)

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
                             src="/img/quizlist.png"
                                style={{width: '150px', height: '150px'}}
                        />
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
                                        MySwal.fire({
                                            title: <strong>삭제되었습니다.</strong>,
                                            icon: 'success'
                                        });
                                        setShowListAPI(userInfo.hostEmail);
                                        setButtonDisabled(false);
                                    }).catch((err) => {
                                        MySwal.fire({
                                            title: <strong>삭제에 실패했습니다.</strong>,
                                            icon: 'error'
                                        });
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
