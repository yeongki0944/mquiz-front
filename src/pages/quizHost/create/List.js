import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Button} from "@mui/material";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {copyQuiz, deleteQuiz, setCurrentShow} from "../../redux/reducers/quizInfoReducer";


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

export default function List() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {quiz} = useSelector(state => state.quiz);

    useEffect(() => {
        setSelected(quiz.currentShow);
    }, [quiz.currentShow]);

    return (
        <>
            <List/>
        </>
    )

    function setSelected(currentShow) {
        // const allItems = document.getElementsByClassName(classes.item_card);
        // console.log(quiz.currentShow);
        // for (let i = 0; i < allItems.length; i++) {
        //     if(allItems[i].id == quiz.currentShow){
        //         allItems[i].classList.add(classes.selected);
        //     }else {
        //         allItems[i].classList.remove(classes.selected);
        //     }
        // }
        const allItems = document.getElementsByClassName(classes.item_card);
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove(classes.selected);
        }
        document.getElementById(currentShow).classList.add(classes.selected);

    }

    function List() {
        return (
            <div className={classes.content}>
                {quiz.quizData.map((item) =>
                    <Grid container className={classes.items} key={item.num}>
                        <Grid item xs={2}>
                            {item.num}P
                        </Grid>
                        <Paper elevation={2} className={classes.item_card} key={item.num} id={item.num} onClick={()=>dispatch(setCurrentShow(item.num))}>
                            <Grid item xs={10} >
                                <Grid>
                                    Status
                                </Grid>
                                <Grid>
                                    [{item.type}]
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Button
                                        onClick={
                                            () => {
                                                dispatch(copyQuiz(item.num));
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
                                                dispatch(deleteQuiz(item.num));
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
