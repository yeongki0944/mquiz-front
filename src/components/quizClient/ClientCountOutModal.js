import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom';
import {Btn, Img, Item, Text} from "../../LayOuts/LayOuts";

export function ClientCountOutModal(props) {
    const open = props.open;
    const setOpen = props.setOpen;
    const handleClose = () => {
        setOpen(false);
        history.push('/');
        history.go(0)
    }
    const history = useHistory();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Item sx={{
                place:'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40%',
                height: '30%',
                background: '#fff',
                borderRadius: '10px',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display:'block'
            }}
            sm={{
                width: '80%',
                height: '40%',
            }}>
                <Item sx={{place:'center', height:'70%'}} sm={{height: '60%'}}>
                    <Img alt={"강퇴 당함"} src={"/img/logo192.png"} sm={{height:'70%'}}/>
                </Item>
                <Text sx={{height: '10%'}}>진행자에 의해 강퇴 되었습니다.</Text>
                <Item sx={{place:'center', width: '100%', height:'20%'}} sm={{height: '30%'}}>
                    <Btn onClick={() =>{
                        console.log("forceRefresh");
                        history.push('/');
                        history.go(0)
                    }}>
                        확인
                    </Btn>
                </Item>
            </Item>
        </Modal>
    );
}