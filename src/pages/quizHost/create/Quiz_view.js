import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {Button, Card, CardActions, CardContent} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicGrid(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <Typography variant="h4" component="div" gutterBottom>
                            Quiz View
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <Typography variant="h4" component="div" gutterBottom>
                            게이지/ 타이머
                        </Typography>
                    </Item>
                </Grid>

                <Grid item xs={6}>
                    <Item><Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                화면 우측 Question란에 내용을 입력해 주세요
                            </Typography>
                            <Typography variant="h5" component="div">
                            </Typography>
                        </CardContent>
                    </Card></Item>
                </Grid>
                <Grid item xs={6}>
                    <Item><Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                화면 우측 Question란에 내용을 입력해 주세요
                            </Typography>
                            <Typography variant="h5" component="div">
                            </Typography>
                        </CardContent>
                    </Card></Item>
                </Grid>
            </Grid>
            {props.quiz.map((item) => (
                item.id === props.currentShow ?
                    (item.type==="OX" ? (item.type=="선택형" ? <선택형/>:<단답형/> ) : null)
                    : null
                ))}
        </Box>
    );
    function OX(){
        return(
            <>
                test
            </>
        )
    }
    function 단답형(){
        return(
            <>
                test
            </>
        )
    }
    function 선택형(){
        return(
            <>
                test
            </>
        )
    }
}
