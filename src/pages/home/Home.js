import React, {useEffect} from "react";
import {Card, Content, Img, Item, Page} from "../../layouts/LayOuts";
import {checkConnected, redirectPage} from "../../function/common";
import {useDispatch, useSelector} from "react-redux";
import {flushRedux, setCommand} from "../../function/reduxFunction";


export default function Home() {
    const {quizPlay} = useSelector(state => state.quizPlay);

    const handleHost = () => {
        redirectPage("QHOSTAUTH");
    }
    const handleClient = () => {
        setCommand('PIN');
        redirectPage("QCLIENT");
    }

    useEffect(() => {
        checkConnected(quizPlay.command);
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
