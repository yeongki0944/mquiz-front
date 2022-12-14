import * as React from 'react';
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import {Btn, Img, Item, Text} from "../../LayOuts/LayOuts";
import {useSelector} from "react-redux";
import store from "../../redux/store";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {stompSend} from "../../function/WebSocket";

export const UserList = (props) => {
    const {quizPlay} = useSelector(state => state.quizPlay)

    return (
        <Item sx={props.sx} sm={props.sm}>
            <Item sx={{place:'center',display:'block'}}>
            {quizPlay.userList.map((item,index) => {
                return (
                        <Chip
                            key={index}
                            label={item}
                            id={item}
                            sx={{margin: 1, backgroundColor: '#61DAFB', color: '#202123'}}
                            onDelete={() => {
                                props.setOpen(true)
                                console.log("nickname : " + item)
                                store.dispatch(R_setData({key: "bannedNickName", value: item}))
                            }}
                        />
                )
            })}
            </Item>
        </Item>
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
            <Item sx={{
                place:'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#fff',
                borderRadius: '10px',
                border: '1px solid #ccc',
                padding: '20px',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                margin: 'auto',
                width: '400px',
                height: '300px',
                display: 'block'
            }}>
                <Item sx={{place:'center', height:'70%'}}>
                    <Img alt={"유저 강퇴"} src={"/img/logo192.png"} />
                </Item>
                <Text>
                    {quizPlay.bannedNickName} 선택한 참여자를 내보냅니다.
                </Text>
                <Item sx={{place:'center',height:'20%'}}>
                    <Btn onClick={() => {
                        stompSend("ban", {
                            pinNum: quizPlay.pinNum,
                            nickName: quizPlay.bannedNickName
                        });
                        props.setOpen(false);
                    }}>
                        확인
                    </Btn>
                    <Btn onClick={handleClose}>
                        취소
                    </Btn>
                </Item>
            </Item>
        </Modal>
    );
}

