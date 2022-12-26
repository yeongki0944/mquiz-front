import * as React from 'react';
import { Card_panel, Item, Page} from "../../layouts/LayOuts";
import {NavBar} from "../../components/quizHost/NavBar";
import {QReportCardList} from "../../components/quizHost/QReportCardList";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {getLogListAPI} from "../../function/API";
import {ReportDetail} from "../../components/quizHost/QReportDetail";
import store from "../../redux/store";
import {R_setReportList} from "../../redux/reducers/reportInfoReducer";

export const QHostReport = () => {
    const {userInfo} = useSelector(state => state.userInfo);
    const {reportList} = useSelector(state => state.reportList);

    useEffect(() => {
        if(userInfo.hostEmail != null){
            getLogListAPI(userInfo.hostEmail).then((res) => {
                if (res.status === 200) {
                    store.dispatch(R_setReportList(res.data.Items))
                } else {
                }
            }).catch((err) => {
                console.log(err);
            });
            console.log(userInfo.hostEmail)
        }
    }, []);

    return (
        <Page sx={{bg: 'img', img: '/img/background_1.jpg'}}>
            <NavBar/>
            <Item sx={{place: 'center', height: '85vh', width: '100%', marginTop: '30px'}} sm={{display: 'block'}}>
                <Card_panel
                    sx={{
                        place: 'center',
                        width: '40%',
                        height: '100%',
                        marginLeft: '1vw',
                        marginRight: '1vw',
                        overflowY: 'auto'
                    }}
                    sm={{
                        place: 'center',
                        width: '95%',
                        height: '40%',
                        marginRight: '2.5vw',
                        marginLeft: '2.5vw'
                    }}>
                    {reportList.id !== "" && <QReportCardList reportList={reportList}/>}
                </Card_panel>
                <Card_panel
                    sx={{
                        place: 'center',
                        width: '60%',
                        height: '100%',
                        marginLeft: '1vw',
                        marginRight: '1vw',
                        overflowY: 'auto'
                    }}
                    sm={{
                        place: 'center',
                        width: '95%',
                        height: '60%',
                        marginTop: '2.5vw',
                        marginRight: '2.5vw',
                        marginLeft: '2.5vw'
                    }}>
                    <ReportDetail/>
                </Card_panel>
            </Item>
        </Page>
    );
}
