import * as React from 'react';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import {useState} from "react";
import {Item_c, Page_Default} from "../LayOuts/LayOuts";
import styled from "styled-components";
import {useSelector} from "react-redux";
import store from "../../redux/store";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {stompSend} from "../../function/WebSocket";

const Item_c_paper = styled(Item_c)`
    background: #fff;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin: auto;
    width: 400px;
    height: 250px;
    display: block;
`

export const UserList = (props) => {
    // 나중에 레디스로 참여 유저 현황 가져오기
    // const [client, setClient] = useState([
    //     {key: '123123', nickName: '갑시다'},
    //     {key: '123456', nickName: 'gogo'},
    // ])
    const {quizPlay} = useSelector(state => state.quizPlay)

    console.log(quizPlay)

    return (
        <div>
            {quizPlay.userList.map((item) => {
                return (
                    <div key={item} style={{display: "inline-block"}}>
                        <Chip
                            label={item}
                            id={item}
                            sx={{margin: 1, backgroundColor: '#61DAFB', color: '#202123'}}
                            onDelete={() => {
                                props.setOpen(true)
                                console.log("nickname : " + item)
                                store.dispatch(R_setData({key: "bannedNickName", value: item}))
                            }}
                        />
                    </div>
                )
            })}
        </div>
    )
}


export const HostCountOutModal = (props) => {
    const handleClose = () => props.setOpen(false);
    const {quizPlay} = useSelector(state => state.quizPlay)
    console.log("Modal : " + quizPlay.bannedNickName)
    return (
        <Modal
            open={props.open}
            onClose={() => {
                props.setOpen(false)
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Item_c_paper>
                <CardMedia
                    component="img"
                    height="150"
                    width="50"
                    image="/img/logo192.png"
                    alt="green iguana"
                />
                <Item_c> {quizPlay.bannedNickName} 선택한 참여자를 내보냅니다.</Item_c>
                <Item_c>
                    <Button variant="contained" onClick={() => {
                            stompSend("ban", {
                                pinNum: quizPlay.pinNum,
                                nickName: quizPlay.bannedNickName
                            });
                            props.setOpen(false);
                    }}>확인</Button>
                    <Button variant="contained" color="primary" onClick={handleClose}>취소</Button>
                </Item_c>
            </Item_c_paper>
        </Modal>
    );
}

