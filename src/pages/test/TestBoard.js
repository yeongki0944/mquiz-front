import {Gauge} from "../components/QuizView/Gauge";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import * as React from "react";
import QuizListHostMain from "../quizHost/components/QuizListHostMain";
import CustomAxios from "../function/CustomAxios";
import {R_setQuizList} from "../redux/reducers/quizListReducer";
import {useEffect, useState} from "react";
import QuizModal from "../quizHost/components/Create/Quiz_Make_modal";
import HostProfile from "../quizHost/components/HostProfile";
import SockJsClient from "react-stomp";
import {ListPanel} from "../quizHost/components/Create/ListPanel";
import {QuizView} from "../components/QuizView/QuizView";
import {FormPanel} from "../quizHost/components/Create/FormPanel";
import {ControlPanel} from "../quizHost/components/Create/ControlPanel";
import {PinNumCheck} from "../quizClient/components/ClientPinNumInput";

const useStyles = makeStyles((theme) => ({
    content: {
        height: '100vh',
        overflowX: 'hidden',
        overflowY: 'hidden',
        backgroundColor: '#f5f5f5',
    },
    container: {
        // height: '100vh',
        // padding: theme.spacing(3),dd-
    },
    components: {
        // padding: theme.spacing(2),
        border: '1px solid #e0e0e0',
    },
}));

export default function TestBoard() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);
    const [modalOpen, setModalOpen] = useState(false);
    const {mongodbUrl} = useSelector(state => state.mongodbUrl);
    const {quizList} = useSelector(state => state.quizList);
    //
    // const setQuizList = async () => {
    //     await CustomAxios.post(mongodbUrl.getShowList, {
    //         email: "dudrl0944@gmail.com",
    //         id: "637440e817bb6d42edbf3927"
    //     }).then((res) => {
    //         console.log(res.data)
    //         dispatch(R_setQuizList(res.data))
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }
    // useEffect(() => {
    //     setQuizList();
    // }, []);
    return(
        // <div className={classes.content}>
        //     <QuizView currentQuiz={currentQuiz}/>
        //
        //     <Grid container spacing={3} className={classes.container}>
        //         <Grid item xs={2} className={classes.components}>
        //             <ListPanel quiz={quiz}/>
        //         </Grid>
        //         <Grid item xs={7} className={classes.components}>
        // <QuizView currentQuiz={currentQuiz}/>
        //         </Grid>
        //         <Grid item xs={3} className={classes.components}>
        //             <FormPanel currentQuiz={currentQuiz}/>
        //         </Grid>
        //         <Grid item xs={12} className={classes.components}>
        //             <ControlPanel quiz={quiz}/>
        //         </Grid>
        //     </Grid>
        // </div>
    <>
        <QuizView currentQuiz={currentQuiz}/>
    </>
    )
}

/**
 * 문제 제작 페이지
 */
// <div className={classes.content}>
//     <Grid container spacing={3} className={classes.container}>
//         <Grid item xs={2} className={classes.components}>
//             <ListPanel quiz={quiz}/>
//         </Grid>
//         <Grid item xs={7} className={classes.components}>
//             <QuizView currentQuiz={currentQuiz} quiz={quiz}/>
//         </Grid>
//         <Grid item xs={3} className={classes.components}>
//             <FormPanel currentQuiz={currentQuiz}/>
//         </Grid>
//         <Grid item xs={12} className={classes.components}>
//             <ControlPanel quiz={quiz}/>
//         </Grid>
//     </Grid>
// </div>

/**
 * 퀴즈 목록 컴포넌트
 */
// <div className={classes.content}>
//     <Grid container spacing={3} className={classes.container}>
//         <Grid item xs={12} md={6} className={classes.components}>
//             <HostProfile/>
//             <QuizListHostMain
//                 setModalOpen={setModalOpen}
//                 quizList={quizList}
//             />
//         </Grid>
//     </Grid>
// </div>
