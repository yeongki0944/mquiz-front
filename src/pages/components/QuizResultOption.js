import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";



const makeStyle = makeStyles({
    root: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    optionStyle:{
        width:500,
        height:800
    }
});

/**
 * props:
 *  -
 */
export const QuizResultOption = (props) => {
    const classes = makeStyle();

    const [choicePlayer,setChoicePlayer] = useState(0);

    return (
        <Box className={classes.root} variant={"outlined"}>
            <Button
                variant="contained"
                sx={classes.optionStyle}
                onClick={
                    ()=>{

                    }
                }
            >
                <Typography variant={"p"} component={"p"}>
                    {props.ONum}
                </Typography>
                {props.OContent}
            </Button>
        </Box>
    )
}
