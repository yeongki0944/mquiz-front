import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Showcard from "../components/Showcard";
import {Avatar, Box, Button, Modal, Switch, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import Add from "@material-ui/icons/Add";
import axios from "axios";
import QuizModal from '../create/Quiz_Make_modal';
import {useDispatch, useSelector} from "react-redux";
import CustomAxios from "../../function/CustomAxios";
import {setQuizList} from "../../redux/reducers/quizListReducer";

export default function QuizHostMain(props) {
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);

    const {mongodbUrl} = useSelector(state => state.mongodbUrl)

    const setQuizList_ = async () => {

        await CustomAxios.post(mongodbUrl.getShowList, {
            email: "dudrl0944@gmail.com",
            id: "637440e817bb6d42edbf3927"
        }).then((res) => {
            console.log(res.data)
            dispatch(setQuizList(res.data))
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        setQuizList_();;
    }, []);

    return (
        <>
            <Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12}/> {/* 빈칸 띄우기용 */}
                    {/*프로필*/}
                    <Grid item xs={2}/>
                    <Grid item xs={0.6}>
                        <Avatar sx={{width: 56, height: 56}}>H</Avatar>
                    </Grid>
                    <Grid item xs={7.4}>
                        <Grid item xs={7.4}> 닉네임</Grid>
                        <Grid item xs={7.4}> 정보 | 정보 | 정보</Grid>
                    </Grid>
                    <Grid item xs={2}/>
                    {/*검색 툴바*/}
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                        <TextField
                            id="standard-full-width"
                            style={{margin: 8}}
                            placeholder="Show 제목 또는 태그를 검색해 주세요"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}/>

                    {/*퀴즈 리스트*/}
                    <Grid item xs={6}>
                        <Grid item xs={12} sm={12}>
                            <Grid item xs={3}>
                                {/*<TextField select={true} label="카테고리" variant="outlined" fullWidth={true}>*/}
                                {/*    <option value="1">카테고리1</option>*/}
                                {/*    <option value="2">카테고리2</option>*/}
                                {/*    /!*{categories.map((option) => (*!/*/}
                                {/*    /!*    <option key={option.value} value={option.value}>*!/*/}
                                {/*    /!*        {option.label}*!/*/}
                                {/*    /!*    </option>*!/*/}
                                {/*    /!*))}*!/*/}
                                {/*</TextField>*/}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button fullWidth={true} onClick={() => {
                                setModalOpen(true);
                            }}>
                                <Box
                                    sx={{
                                        p: 2,
                                        margin: 'auto',
                                        maxWidth: 500,
                                        flexGrow: 1,
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: 2,
                                        boxShadow: 1,
                                        marginBottom: 3,
                                        marginTop: 3,

                                    }}
                                >
                                    <Add/>
                                </Box>
                            </Button>
                        </Grid>
                        <Showcard/>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid item xs={12} sm={12}>
                            정답 표시
                            <Switch
                                // checked={state.checkedB}
                                // onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        </Grid>
                        <Paper>미리보기~~~</Paper>
                    </Grid>
                </Grid>
            </Grid>
            {/*<QuizModal*/}
            {/*open={modalOpen}*/}
            {/*setOpen={setModalOpen}*/}
            {/*/>*/}
        </>
    );
}

