import {Card_panel, Content, Item, Text} from "../../layouts/LayOuts";
import {PieChart} from "react-minimal-pie-chart";
import * as React from "react";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


export const ReportDetail = (props) => {
    const {reportInfo} = useSelector(state => state.reportInfo);

    const [pieChartData, setPieChartData] = useState(0);


    useEffect(()=>{
        let userCorrectCount = 0;
        let allQuizCount = 0;

        for (let i = 0; i < reportInfo.userdata.length; i++) {
            userCorrectCount += parseFloat(reportInfo.userdata[i].correctcount);
            allQuizCount += parseInt(reportInfo.quizcount);
        }

        setPieChartData(userCorrectCount/allQuizCount*100);
    },[reportInfo]);


    if (reportInfo.id === "") {
        return (<Item sx={{place:'center'}}><Content></Content></Item>)
    } else {
        let userdatalist = [...reportInfo.userdata].reverse();
        return (
            <Item sx={{place: 'center', display: 'block'}}>
                <Item sx={{place: 'center', height: '50%'}}>
                    <Item sx={{place: 'Top', width: '100%', display: 'block'}}>
                        <Item sx={{place: 'center', height: '80%'}}>
                            <PieChart
                                data={
                                    [
                                        {
                                            value: 20,
                                            color: "#f6cb44",
                                            name: "test"
                                        }
                                    ]
                                }
                                startAngle={90}
                                reveal={pieChartData}
                                lineWidth={40}
                                background={"#f3f3f3"}
                                lengthAngle={360}
                                rounded
                                animate
                            />
                        </Item>
                        <Item sx={{place: 'center', height: '20%'}}>
                            <Text sx={{fontSize: 25}}>참가자 전체 정답률 : {pieChartData}%</Text>
                        </Item>
                    </Item>
                </Item>
                <Item sx={{place: 'center', height: '50%'}}>
                    <Item sx={{place: 'top', width: '100%', display:'block'}}>
                        <Card_panel sx={{place: 'center', width:'100%', height:'10%', marginBottom:'10px'}}>
                            <Item sx={{place: 'center'}}>
                                <Item sx={{place: 'center', width: '10%'}}>등수</Item>
                                <Item sx={{place: 'center', width: '30%'}}>닉네임</Item>
                                <Item sx={{place: 'center', width: '20%'}}>랭킹점수</Item>
                                <Item sx={{place: 'center',width: '10%'}}>맞은 문제</Item>
                                <Item sx={{place: 'center', width: '30%'}}>유저별 정답률</Item>
                            </Item>
                        </Card_panel>
                        {
                            userdatalist.map(
                                (item, index) => {
                                    return (
                                        <Card_panel sx={{place: 'center', width:'100%', height:'20%', marginBottom:'10px'}} key={index}>
                                            <Item sx={{place: 'center'}}>
                                                <Item sx={{place: 'center', width: '10%'}}>{item.rank} 등</Item>
                                                <Item sx={{place: 'center', width: '30%'}}>{item.nickname}</Item>
                                                <Item sx={{place: 'center', width: '20%'}}>{parseInt(item.rankscore)} 점</Item>
                                                <Item sx={{place: 'center',width: '10%'}}>{parseInt(item.correctcount)}/{reportInfo.quizcount}</Item>
                                                <Item sx={{place: 'center', width: '30%'}}>{(item.correctcount/reportInfo.quizcount*100).toFixed(2)}%</Item>
                                            </Item>
                                        </Card_panel>
                                    )
                                }
                            )
                        }
                    </Item>
                </Item>
            </Item>
        )
    }
}