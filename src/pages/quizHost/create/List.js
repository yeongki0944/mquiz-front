import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Button} from "@mui/material";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    content: {
        height: "90vh",
        overflow: "scroll",
        overflowX: "hidden",
    },
    items: {
        // backgroundColor: "#ffffff",
        // color: "#000000",
    },
    item_card: {
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "10px",
        margin: "10px",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
    },
    selected: {
        border: "1px solid orange",
    }
}));

export default function List(props) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {currentShow} = useSelector(state => state.currentShow);
    const { quizInfo } = useSelector((state) => state.quizInfo);
    const { quizList } = useSelector((state) => state.quizList);
    const { currentQuiz } = useSelector((state) => state.currentQuiz);

    const setCurrentShow = (index) => {
        dispatch({type: "SET_CURRENT_SHOW", payload: index});
    };

    const setCurrentQuiz = (index) => {
        dispatch({type: "SET_CURRENT_QUIZ", payload: index});
    };

    const copyQuiz = (quizNum) => {
        dispatch({
            type: "COPY_QUIZ",
            payload: {
                quizNum: quizNum,
            }
        });
    };

    const deleteQuiz = (quizNum) => {
        dispatch({
            type: "DELETE_QUIZ",
            payload: {
                quizNum: quizNum,
            }
        });
        renumberQuiz();
    };

    const renumberQuiz = () => {
        dispatch({
            type: "RENUMBER_QUIZ",
        });
    };

    //주황색 표기 제작중
    // useEffect(() => {
    //     //add class to selected item
    //     const items = document.getElementsByClassName(classes.item_card);
    //     for (let i = 0; i < items.length; i++) {
    //         if (items[i].getAttribute("key") === currentShow) {
    //             items[i].classList.add(classes.selected);
    //         }else{
    //             items[i].classList.remove(classes.selected);
    //         }
    //
    //     }
    // }, [currentShow]);

    return (
        <>
            <List/>
        </>
    )

    function List() {
        return (
            <div className={classes.content}>
                {quizList.map((quiz) =>
                    <Grid container className={classes.items} key={quiz.num}>
                        <Grid item xs={2}>
                            {quiz.num}P
                        </Grid>
                        <Paper elevation={2} className={classes.item_card} key={quiz.num}>
                            <Grid item xs={10}
                                  onClick={
                                      () => {
                                          setCurrentShow(quiz.num);
                                          setCurrentQuiz(quizList[quiz.num - 1]);
                                      }
                                  }>
                                <Grid>
                                    Status
                                </Grid>
                                <Grid>
                                    [{quiz.type}]
                                </Grid>
                                <Grid>
                                    {quizInfo.showInfo.title}
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Button
                                        onClick={
                                            () => {
                                                copyQuiz(quiz.num);
                                            }
                                        }
                                    >
                                        <FileCopyIcon/>
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        onClick={
                                            () => {
                                                deleteQuiz(quiz.num)
                                            }
                                        }
                                    >
                                        <DeleteForeverIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
            </div>
        )
    }


}
