import * as React from 'react';
import { Card_panel, Item, Page, Text} from "../../layouts/LayOuts";
import {NavBar} from "../../components/quizHost/NavBar";
import {QReportCardList} from "../../components/quizHost/QReportCardList";
import {PieChart} from "react-minimal-pie-chart";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {getLogListAPI, setShowListAPI} from "../../function/API";

export const QHostReport = () => {
    const {userInfo} = useSelector(state => state.userInfo);
    const {reportList} = useSelector(state => state.reportList);
    const {reportInfo} = useSelector(state => state.reportInfo);

    // console.log(userInfo);
    // console.log(reportList);
    // console.log(reportInfo);

    const hostEmail = "test@gmail.com"; // userInfo.hostEmail 로 변경해야함.

    useEffect(() => {
        getLogListAPI(hostEmail);
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
                    <QReportCardList reportList={reportList}/>
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
                    {/*<ReportDetail reportInfo={reportInfo}/>*/}
                </Card_panel>
            </Item>
        </Page>
    );

    // function ReportDetail(props) {
    //     const reportInfo = props.reportInfo;
    //
    //     console.log(reportInfo.userdata);
    //
    //     return (
    //         <Item sx={{place: 'center', display: 'block'}}>
    //             <Item sx={{place: 'center', height: '50%'}}>
    //                 <Item sx={{place: 'Top', width: '100%', display: 'block'}}>
    //                     <Item sx={{place: 'center', height: '80%'}}>
    //                         <PieChart
    //                             data={
    //                                 [
    //                                     {
    //                                         value: 20,
    //                                         color: "#f6cb44",
    //                                         name: "test"
    //                                     }
    //                                 ]
    //                             }
    //                             startAngle={90}
    //                             reveal={78.343}
    //                             lineWidth={40}
    //                             background={"#f3f3f3"}
    //                             lengthAngle={360}
    //                             rounded
    //                             animate
    //                         />
    //                     </Item>
    //                     <Item sx={{place: 'center', height: '20%'}}>
    //                         <Text sx={{fontSize: 25}}>참가자 정답률 78.343%</Text>
    //                     </Item>
    //                 </Item>
    //             </Item>
    //             <Item sx={{place: 'center', height: '50%'}}>
    //                 <Item sx={{place: 'center', width: '100%'}}>
    //                     {/*랭킹 매핑 필요*/}
    //                     {
    //                         reportInfo.userData.map(
    //                             (item, index)=>(
    //                                 <Item sx={{place:'center'}} key={index}>
    //                                     <Item sx={{place: 'left', width:'40%', height:'20%'}}>
    //                                         <Item sx={{place: 'center', width:'15%'}}>{item.rank}</Item>
    //                                         <Item sx={{place: 'center', width:'50%'}}>{item.nickname}</Item>
    //                                         <Item sx={{place: 'center', width:'25%'}}>{item.rankscore}</Item>
    //                                         <Item sx={{place: 'center', width:'10%'}}>{item.correctcount}/{reportInfo.quizcount}</Item>
    //                                     </Item>
    //                                     <Item sx={{place:'top', width:'60%', height:'20%'}}>
    //                                         {/*정답여부 매핑 필요*/}
    //                                         <Item sx={{place: 'center', width:'100%'}}>
    //                                             정답 여부
    //                                         </Item>
    //                                     </Item>
    //                                 </Item>
    //                             )
    //                         )
    //                     }
    //
    //                 </Item>
    //             </Item>
    //         </Item>
    //     )
    // }
}
