import {Link} from "react-router-dom";
import React from "react";
import {Item,Page} from "../../components/LayOuts/LayOuts";

export default function Home() {
    return (
        <Page sx={{bg:'grad-right',grad1:'rebeccapurple',grad2:'salmon'}}>
            <Item sx={{place:'bottom',width:'100%',height:'30vh',margin:'auto'}} sm={{height:'20vh'}}>
                <img alt="complex" src="/img/logo.png"></img>
            </Item>
            <Item sx={{place:'top',width:'100%',height:'50vh'}} sm={{height:'70vh',display:'block'}}>
                <Link to="/QHost">
                    <Item
                        sx={{
                            place:'center',
                            background : 'linear-gradient(50deg, #FF8B6A, #A5AEFF)',
                            border : '1px solid #FFD2BB',
                            borderRadius: '5px',
                            boxShadow: '10 10 10px #D6F8B8',
                            fontSize: '2.5rem',
                            fontWeight: '600',
                            display: 'flex',
                            color: '#fff',
                            minWidth:'350px',
                            minHeight:'250px',
                            margin:'auto',
                        }}
                    >퀴즈 만들기</Item>
                </Link>
                <Link to="/QClient">
                    <Item
                        sx={{
                            place:'center',
                            background : 'linear-gradient(50deg, #FF8B6A, #A5AEFF)',
                            border : '1px solid #FFD2BB',
                            borderRadius: '5px',
                            boxShadow: '10 10 10px #D6F8B8',
                            fontSize: '2.5rem',
                            fontWeight: '600',
                            display: 'flex',
                            color: '#fff',
                            minWidth:'350px',
                            minHeight:'250px',
                            margin:'auto',
                        }}
                    >퀴즈 풀기</Item>
                </Link>
            </Item>
        </Page>
    );
}
