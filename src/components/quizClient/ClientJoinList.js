import * as React from 'react';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import {useState} from "react";
import {stompSend} from "../../function/WebSocket";

const UserList = (props) => {
    // 나중에 레디스로 참여 유저 현황 가져오기
    const [client,setClient] = useState([
        {key : '123123', nickName : '갑시다'},
        {key : '123456', nickName : 'gogo'},
    ])

    return (
        <div>
            {client.map((item)=>{
                return (
                    <div key={item.key} style={{display: "inline-block"}}>
                        <Chip
                            label={item.nickName}
                            sx={{marginLeft: 1, marginRight: 1}}
                            onDelete={
                                () => {
                                    //stompSend("/quiz/message",{
                                        stompSend("/quiz/message",{
                                        pinNum:props.pinNum,
                                            command:"ban"
                                        //command:"BAN"
                                    });
                                    setClient((users) => users.filter((user) => user.key !== item.key));
                                }
                            }/>
                    </div>
                )
            })}
        </div>
    )
}

export const ClientJoinList = (props) => {
    return (
        <>
            <Paper><UserList pinNum={props.pinNum}></UserList></Paper>
            <HostCountOutModal></HostCountOutModal>
        </>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function HostCountOutModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AlterImg></AlterImg>
                    <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
                        선택한 참여자를 내보냅니다.
                    </Typography>

                    {/*<Link to="/QClient">*/}
                    <Typography variant="h5" component="div" align='center'>
                        <Button variant="contained" color="primary">취소</Button>
                        <Button variant="contained">확인</Button>
                    </Typography>
                    {/*</Link>*/}
                </Box>
            </Modal>
        </div>
    );
}

export function AlterImg() {
    return (
        <CardMedia
            component="img"
            height="150"
            image="/img/logo192.png"
            alt="green iguana"
        />
    );
}
