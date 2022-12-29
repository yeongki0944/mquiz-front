import * as React from 'react';
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import {Btn, Card, Img, Item, Text} from "../../layouts/LayOuts";
import {useSelector} from "react-redux";
import store from "../../redux/store";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {stompDisconnect, stompIsConnected, stompSend} from "../../function/WebSocket";
import {flushLocalStorage, getCurrentClient, getPinNum, getRole, setCurrentClient} from "../../function/localStorage";
import Swal from "sweetalert2";

export const UserList = (props) => {
    const {quizPlay} = useSelector(state => state.quizPlay)

    return (
        <Item sx={props.sx} sm={props.sm}>
            <Item sx={{place:'top-left',display:'block'}}>

            {quizPlay.userList.map((item,index) => {
                return (
                        <Card
                            key={index}
                            id={item}
                            sx={{margin:'10px',width:'15%',float:'left',backgroundColor:'rgba(130, 195, 236,0.7)',borderRadius:'20%'}}
                            sm={{width:'40%'}}
                            onClick={() => {
                                Swal.fire({
                                    title:item+"님을 추방하시겠습니까?",
                                    //text: contentMsg,
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: '강퇴하기',
                                    cancelButtonText: '취소',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // props.setOpen(true)
                                        store.dispatch(R_setData({key: "bannedNickName", value: item}))
                                        stompSend("ban", {
                                            pinNum: getPinNum(),
                                            nickName: item
                                        });
                                        setCurrentClient(parseInt(getCurrentClient())-1);
                                    }
                                })
                            }}
                        >
                            <Text sx={{color:'#000',fontWeight:'bold',fontSize:'1.5vw'}} sm={{fontSize:'5.5vw'}}>{item}</Text>
                        </Card>
                )
            })}
            </Item>
        </Item>
    )
}


export const HostCountOutModal = (props) => {
    const handleClose = () => props.setOpen(false);
    const {quizPlay} = useSelector(state => state.quizPlay)
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
                width: '40%',
                height: '30%',
                display: 'block'
            }} sm={{
                width: '80%',
                height: '40%',
            }}>
                <Item sx={{place:'center', height:'70%'}} sm={{height: '50%'}}>
                    <Img alt={"유저 강퇴"} src={"/img/Spaceman_ban.png"}
                    sx={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                    }}/>
                </Item>
                <Text sm={{height:'20%'}}>
                    {quizPlay.bannedNickName}님을 강퇴하실건가요?
                </Text>
                <Item sx={{place:'center',height:'20%'}} sm={{height: '30%'}}>
                    <Btn onClick={() => {
                        stompSend("ban", {
                            pinNum: getPinNum(),
                            nickName: quizPlay.bannedNickName
                        });
                        setCurrentClient(parseInt(getCurrentClient())-1);
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

