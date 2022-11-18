import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { createSvgIcon } from '@mui/material/utils';
import Slider from '@mui/material/Slider';
import styles from './layoutstyle.css';
import Modal from "@mui/material/Modal";
import CardMedia from "@mui/material/CardMedia";

// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export function ColorSlider() {
  return (
    <Box sx={{ width: 80 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        color="secondary"
      />
    </Box>

  );
}

// 아이콘
const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

// Grid Item 설정
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const User = ({userData}) => {
  return (
      <tr>
          {/* <td>핀번호 : {userData.pinNum}</td> */}
          <td>닉네임 : {userData.nicName}</td>
      </tr>

  )
}

const UserList = (props) => {
  const users = [
    {pinNum : '123123', nicName : '갑시다'},
    {pinNum : '123123', nicName : '갑시다2'},
    {pinNum : '123123', nicName : '갑시다3'},
    {pinNum : '123123', nicName : '갑시다4'},
    {pinNum : '123123', nicName : '갑시다5'}
  ]

  return (
    <table>
        <thead>
            <tr>
            </tr>
        </thead>
        <tbody>
            {users.map(user => <User key={user.nicName} userData={user}/>)}
        </tbody>
    </table>
  )
}

export default function HostReady(props) {
    return (
        <>
        <div className="clientLayout">
        <div className="sliderbar">
        <ColorSlider></ColorSlider><HomeIcon />
        </div>

        <Typography align='center' id="modal-modal-title" variant="h6" component="h2" margin = "70px">
           MegaQuiz.show/p 접속해 주세요
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Item><Button variant="contained">QR code</Button></Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item><Button variant="contained">URL copy</Button></Item>
        </Grid>
        <Grid item xs={3} md={12}>
          <Item><Typography align='center' id="modal-modal-title" variant="h6" component="h2">
          <b>PIN : </b>
        </Typography></Item>
        </Grid>

        <Grid item xs={12} md={12}>
          <Item>
          <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
          <HomeIcon /> <b>총 참여자 수 X 명</b>
        </Typography>
        </Item>
        </Grid>
      </Grid>
      </Box>

      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: 300,
        },
      }}
    >

      <Paper>
        <BasicModal></BasicModal>
      </Paper>
    </Box>

        {/* <Link to="/QClient/play"> */}
        <Typography variant="h5" component="div" align='center' padding='20'>
        <Button variant="contained">시작</Button>
        </Typography>
        {/* </Link> */}

</div>
        </>
    );
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

export function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}><UserList></UserList></Button>
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
            image="src/pages/quizClient/image/logo192.png"
            alt="green iguana"
        />
    );
}
