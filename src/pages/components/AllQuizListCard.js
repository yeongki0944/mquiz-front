import * as React from "react";
import {Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useState} from "react";
import  {styled} from '@mui/system';
import Grid from "@mui/material/Grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faUser} from "@fortawesome/free-solid-svg-icons";



/**
 * props:
 *  - id : Box에 key값 설정
 *  - numcount : 총 문제수
 *  - email : 유저 이메일
 *  - titleImg : 썸네일 이미지
 *  - title : Quiz 이름
 */



const MyCard = styled(Card)`
    &&{
        position: relative;
        width: 340px;
        margin: 10px;
        color: #41D3BD;
    }
`


const MyCardActionArea = styled(CardActionArea)`
    &&{
        background-color: #FFFFF2;
       
    }
`
const MyCardMedia = styled(CardMedia)`
    &&{
        height: 300px;
    }
`

//왼쪽 상단 퀴즈 개수를 나타내는 부분
const QuizCountTypography = styled(Typography)`
    &&{
      position: absolute;
      z-index: 99;
      background-color: #DE6449;
      padding: 10px;
      opacity: 0.9;
       color: white;
    }
`





const InfoCardContent = styled(CardContent)`
    &&{
       color: #8E8E8E;
       align-content: center;
    }
`

const TitleTypography = styled(Typography)`
    &&{
        font-size: 1.2rem;
        color: #791E94;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        font-weight: bold;
    }
`

const UserIcon = styled(FontAwesomeIcon)`
   
`
const UserIdTypography = styled(Typography)`
   &&{
        padding-top: 0px;
        font-size: 0.7rem;
        padding-top: 5px;
   }
`



export const AllQuizListCard = (props) => {
    console.log(props.id);

    return (
        <Box key={props.id}>
            <MyCard>
                <QuizCountTypography>Q.{props.numcount}문제</QuizCountTypography>
                <MyCardActionArea onClick={
                    ()=>{
                        console.log(props.id+" 클릭");
                    }
                }>
                    <MyCardMedia
                        image={props.titleImg} />
                    <InfoCardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TitleTypography>
                                    {props.title}
                                </TitleTypography>
                            </Grid>
                            <Grid item xs={1}>
                                <UserIcon icon={faUser} />
                            </Grid>
                            <Grid item xs={5}>
                                <UserIdTypography>{props.email}</UserIdTypography>
                            </Grid>
                        </Grid>

                    </InfoCardContent>
                </MyCardActionArea>
            </MyCard>
        </Box>
    )
}


AllQuizListCard.defaultProps = {
    id: "637440e817bb6d42edbf3927",
    numcount: "25",
    email: "dudrl0944@gmail.com",
    title: "긴123456789123456789123456789123456789123456789123456789123456789123456789제목",
    titleImg: "https://i.imgur.com/3GQ2eEI.jpg"

}
