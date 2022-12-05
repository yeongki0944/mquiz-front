import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { useHistory } from 'react-router-dom';

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
            <Box sx={style}>
                <AlterImg></AlterImg>
                <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
                    진행자에 의해 강퇴 되었습니다.
                </Typography>

                {/*<Link to="/QClient">*/}
                    {/*확인 누르면 새로고침해서 리덕스가 가지고 있는 데이터 날리기 */}
                    <Typography variant="h5" component="div" align='center'>
                        <Button onClick={() =>{
                            console.log("forceRefresh");
                            history.push('/');
                            history.go(0)
                        }} variant="contained">확인</Button>
                    </Typography>
                {/*</Link>*/}
            </Box>
        </Modal>
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