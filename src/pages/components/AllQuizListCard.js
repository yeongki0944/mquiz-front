import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";



const makeStyle = makeStyles({
    root: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});

/**
 * props:
 *  - id : Box에 key값 설정
 *  - titleImg : 썸네일 이미지
 *  - title : Quiz 이름
 */
export const AllQuizListCard = (props) => {
    const classes = makeStyle();

    console.log(props.id);

    return (
        <Box key={props.id} sx={{margin:1,display:"inline-block"}}>
            <Card sx={{ maxWidth: 345}} >
                <CardActionArea onClick={
                    ()=>{
                        console.log(props.id+" 클릭");
                    }
                }>
                    <CardMedia
                        component="img"
                        height="220"
                        image={props.titleImg}
                        alt={props.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}
