import {useDispatch} from "react-redux";
import {useEffect} from "react";
import Paper from "@mui/material/Paper";
import {R_copyQuiz, R_deleteQuiz, R_setCurrentShow} from "../../../redux/reducers/quizInfoReducer";
import {Button} from "@mui/material";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as React from "react";
import '../styles/ListPanel.css';
import {styled} from "@mui/system";

const Item_card = styled(Paper) ({
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "10px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
    '&:hover': {
        border: "1px solid lightblue",
    }
})

export const ListPanel = (props) => {
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
        <>
            {quiz.quizData.map((item) =>
                <div key={item.num}>
                    <div>{item.num}P</div>
                    <Item_card className={"item_card"} key={item.num} id={item.num}
                         onClick={() => dispatch(R_setCurrentShow(item.num))}>
                        Status [{item.type}]
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
                    </Item_card>
                </div>
            )}
        </>
    )
}
