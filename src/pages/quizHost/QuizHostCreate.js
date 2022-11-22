import * as React from "react";
import Grid from "@mui/material/Grid";
import {ListPanel} from "./components/Create/ListPanel";
import {FormPanel} from "./components/Create/FormPanel";
import {ControlPanel} from "./components/Create/ControlPanel";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {QuizView} from "../components/QuizView/QuizView";

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

export const QuizHostCreate = () => {
    const classes = useStyles();
    const {quiz} = useSelector(state => state.quiz);
    const currentQuiz = quiz.quizData.find(item => item.num === quiz.currentShow);

    return(
        <div id={"content"}>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={2} className={classes.components}>
                    <ListPanel quiz={quiz}/>
                </Grid>
                <Grid item xs={7} className={classes.components}>
                    <QuizView currentQuiz={currentQuiz}/>
                </Grid>
                <Grid item xs={3} className={classes.components}>
                    <FormPanel currentQuiz={currentQuiz}/>
                </Grid>
                <Grid item xs={12} className={classes.components}>
                    <ControlPanel quiz={quiz}/>
                </Grid>
            </Grid>
        </div>
    )
}
