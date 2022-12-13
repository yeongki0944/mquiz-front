import {useHistory} from "react-router-dom";
import React from "react";
import {Content, Item, New_Card, Page} from "../../LayOuts/LayOuts";


export default function Home() {
    const history = useHistory();

    const handleHost = () => {
        history.push("/Qhost");
    }
    const handleClient = () => {
        history.push("/Qclient");
    }

    return (
        <Page sx={{bg:'img',img: 'img/background_1.jpg'}}>
            <Content>
                <Item
                    sx={{width:'100vw', height:'50vh',color:'white',place:"center"}}
                    sm={{width:'100vw', height:'50vh',color:'white',place:"center"}}
                >
                    Logo
                </Item>
                <Item sx={{place:'center'}}>
                    <Item sx={{place:'center',width:'100%',height:'50vh'}}>
                        <New_Card
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
                        </New_Card>
                    </Item>
                    <Item sx={{place:'center',width:'100%',height:'50vh'}}>
                        <New_Card
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
                        </New_Card>
                    </Item>
                </Item>
            </Content>
        </Page>
    );
}
