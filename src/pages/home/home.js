import {useHistory} from "react-router-dom";
import React, {useEffect} from "react";
import {Btn, Card, Content, Img, Item, Page} from "../../LayOuts/LayOuts";
import {checkConnected} from "../../function/Reconnect";
import {getQuizTime, setQuizTime} from "../../function/localStorage";
import {getSolvedTime} from "../../function/Timer";
import {disableBackPage, disableRefresh} from "../../function/common";
import {VolumeControlButton} from "../../components/VolumeControlButton";


export default function Home() {
    const history = useHistory();

    const handleHost = () => {
        history.push("/Auth");
    }
    const handleClient = () => {
        history.push("/Qclient");
    }

    useEffect(()=>{
        checkConnected();
    },[])
    useEffect(() => {
        disableBackPage();
        disableRefresh();
    }, []);
    return (
        <Page sx={{bg:'img',img: '/img/background_1.jpg'}}>
            <Content>
                <Item
                    sx={{width:'100%', height:'50vh',color:'white',place:"center"}}
                    sm={{width:'100%', height:'50vh',color:'white',place:"center"}}
                >
                    <Img sx={{width:'auto', height:'auto',maxWidth:'90%',maxHeight:'90%'}} src="/img/Spaceman_Planet.png"/>
                </Item>
                <Item sx={{place:'center'}}>
                    <Item sx={{place:'right',width:'100%',height:'50vh',marginRight:'5px'}}>
                        <Card
                            sx={{width:'50%',height:'50%'}}
                            sm={{width:'90%',height:'50%'}}
                            onClick={handleHost}
                        >
                            <Item
                                sx={{place:'center',color:'#fff',fontSize:'4vw'}}
                                sm={{place:'center',color:'#fff',fontSize:'6vw'}}
                            >
                                퀴즈 만들기
                            </Item>
                        </Card>
                    </Item>
                    <Item sx={{place:'left',width:'100%',height:'50vh',marginLeft:'5px'}}>
                        <Card
                            sx={{width:'50%',height:'50%'}}
                            sm={{width:'90%',height:'50%'}}
                            onClick={handleClient}
                        >
                            <Item
                                sx={{place:'center',color:'#fff',fontSize:'4vw'}}
                                sm={{place:'center',color:'#fff',fontSize:'6vw'}}
                            >
                                퀴즈 풀기
                            </Item>
                        </Card>
                    </Item>
                </Item>
            </Content>
        </Page>
    );
}
