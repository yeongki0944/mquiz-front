import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {PinNum} from "../../components/PinNum";
import {ClientTotalCount} from "../../components/quizClient/ClientTotalCount";
import {ClientJoinList} from "../../components/quizClient/ClientJoinList";
import {VolumeControlButton} from "../../components/VolumeControlButton";
import {useDispatch, useSelector} from "react-redux";
import {R_setData} from "../../redux/reducers/quizplayReducer";
import {stompSend} from "../../function/WebSocket";

// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

// export function ColorSlider() {
//   return (
//     <Box sx={{ width: 80 }}>
//       <Slider
//         aria-label="Temperature"
//         defaultValue={30}
//         color="secondary"
//       />
//     </Box>
//
//   );
// }

// 아이콘
// const HomeIcon = createSvgIcon(
//     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
//     'Home',
// );

// Grid Item 설정
const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export const QuizHostReady = (props) => {
    const dispatch = useDispatch();
    const {quiz} = useSelector(state => state.quiz);
    const {quizPlay} = useSelector(state => state.quizPlay);

    return (
        <div id={"content"}>
            <div className="sliderbar">
                {/*<ColorSlider></ColorSlider><HomeIcon />*/}
                <VolumeControlButton/>
            </div>

            <Typography align='center' id="modal-modal-title" variant="h6" component="h2" margin="70px">
                MegaQuiz.show/p 접속해 주세요
            </Typography>

            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={4}>

                    <Grid item xs={6} md={6}>
                        <Typography variant="h5" component="div" align='center' padding='20'>
                            <Button variant="contained">QR code</Button>
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={6}>
                        <Typography variant="h5" component="div" align='center' padding='20'>
                            <Button variant="contained">URL copy</Button>
                        </Typography>
                    </Grid>

                    <PinNum pinNum={quizPlay.pinNum}></PinNum>
                    <ClientTotalCount></ClientTotalCount>

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
                <ClientJoinList pinNum={quizPlay.pinNum}></ClientJoinList>
            </Box>

            <Link to="/QHost/play">
                <Typography variant="h5" component="div" align='center' padding='20'>
                    <Button variant="contained" onClick={
                        ()=>{
                            dispatch(R_setData({key:"command", value:"START"}))
                            stompSend("start", {
                                pinNum: quizPlay.pinNum,
                                command: "START",
                                quizId:quizPlay.quizId,
                                quizNum:quizPlay.quizNum,
                                nickName:"tester",
                                content:{}
                            })
                        }
                    }>
                        시작
                    </Button>
                </Typography>
            </Link>

        </div>
    );
}

