import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Button} from "@mui/material";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect} from "react";

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
    const classes = useStyles();
    const quizList = props.quizList;
    const currentShow = props.currentShow;
    const currentQuiz = props.currentQuiz;
    const setCurrentQuiz = props.setCurrentQuiz;
    const setCurrentShow = props.setCurrentShow;
    const quizinfo = props.quizinfo;
    const setQuizList = props.setQuizList;

    useEffect(() => {
        //add class to selected item
        const items = document.getElementsByClassName(classes.item_card);
        for (let i = 0; i < items.length; i++) {
            if (items[i].getAttribute("key") === currentShow) {
                items[i].classList.add(classes.selected);
            }else{
                items[i].classList.remove(classes.selected);
            }

        }
    }, [currentShow]);
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
                                    {quizinfo[0].showInfo.title}
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
                                                removeQuiz(quiz.num)
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

    /**
     * [퀴즈 목록 조작 함수]
     *
     * copyQuiz : 퀴즈 복사, 해당 퀴즈를 복사하여 추가
     * removeQuiz : 퀴즈 삭제, 해당 퀴즈를 삭제
     * renumberQuiz : 퀴즈 번호 재정렬, 퀴즈 번호 전체 재정렬
     * @param quizNum
     */
    function copyQuiz(quizNum) {
        let newQuizList = [...quizList];
        let newQuiz = {...newQuizList[quizNum - 1]};
        newQuiz.num = newQuizList.length + 1;
        newQuizList.push(newQuiz);
        setQuizList(newQuizList);
    }

    function removeQuiz(quizNum) {
        if (quizList.length === 1) {
            alert("퀴즈는 최소 1개 이상이여야 합니다.")
            return
        } else {
            let index = quizList.findIndex((quiz) => quiz.num === quizNum);
            quizList.splice(index, 1);
            setQuizList([...quizList]);
            //1번 삭제할때 처리
            if (quizNum === 1) {
                setCurrentQuiz(quizList[0]);
                setCurrentShow(1);
            } else {
                setCurrentShow(quizNum - 1);
                setCurrentQuiz(quizList[quizNum - 2]);
            }
            renumberQuiz();
        }
    }

    function renumberQuiz() {
        let i = 1;
        setQuizList(quizList.map((item) => {
            item.num = i;
            i++;
            return item;
        }));
    }
}
