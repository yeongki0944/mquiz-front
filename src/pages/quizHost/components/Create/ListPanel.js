import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {R_copyQuiz, R_deleteQuiz, R_setCurrentShow} from "../../../redux/reducers/quizInfoReducer";
import {Button} from "@mui/material";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as React from "react";
import '../styles/ListPanel.css';

// const ListPanelStyles = makeStyles((theme) => ({
//     content: {
//         height: "100vh",
//         overflow: "scroll",
//         overflowX: "hidden",
//     },
//     items: {
//         // backgroundColor: "#ffffff",
//         // color: "#000000",
//     },
//     item_card: {
//         backgroundColor: "#ffffff",
//         color: "#000000",
//         padding: "10px",
//         margin: "10px",
//         borderRadius: "10px",
//         boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
//     },
//     selected: {
//         border: "1px solid orange",
//     }
// }));
export const ListPanel = (props) => {
    // const classes = ListPanelStyles();
    const dispatch = useDispatch();
    const quiz = props.quiz;

    useEffect(() => {
        setSelected(quiz.currentShow);
    }, [quiz.currentShow]);

    const setSelected = (currentShow) => {
        const allItems = document.getElementsByClassName("item_card");
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove("selected");
        }
        document.getElementById(currentShow).classList.add("selected");
    }

    return (
        <div className={"content"}>
            {quiz.quizData.map((item) =>
                // <Grid container className={classes.items} key={item.num}>
                //     <Grid item xs={2}>
                //         {item.num}P
                //     </Grid>
                //     <Paper elevation={2} className={classes.item_card} key={item.num} id={item.num}
                //            onClick={() => dispatch(R_setCurrentShow(item.num))}>
                //         <Grid item xs={10}>
                //             <Grid>Status</Grid>
                //             <Grid>[{item.type}]</Grid>
                //         </Grid>
                //         <Grid container spacing={4}>
                //             <Grid item xs={6}>
                //                 <Button onClick={() => {
                //                     dispatch(R_copyQuiz(item.num));
                //                 }}>
                //                     <FileCopyIcon/>
                //                 </Button>
                //             </Grid>
                //             <Grid item xs={6}>
                //                 <Button onClick={() => {
                //                     dispatch(R_deleteQuiz(item.num));
                //                 }}>
                //                     <DeleteForeverIcon/>
                //                 </Button>
                //             </Grid>
                //         </Grid>
                //     </Paper>
                // </Grid>
                <div className={"items"} key={item.num}>
                    <div className={"item_card"} key={item.num} id={item.num}
                         onClick={() => dispatch(R_setCurrentShow(item.num))}>
                        <div>{item.num}P</div>
                        <div>Status</div>
                        <div>[{item.type}]</div>
                        <div>
                            <Button onClick={() => {
                                dispatch(R_copyQuiz(item.num));
                            }}>
                                <FileCopyIcon/>
                            </Button>
                            <Button onClick={() => {
                                dispatch(R_deleteQuiz(item.num));
                            }}>
                                <DeleteForeverIcon/>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
