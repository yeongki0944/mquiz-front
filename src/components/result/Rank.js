import {Card_panel, Img, Item, Text} from "../../layouts/LayOuts";
import {useEffect, useState} from "react";
import {getCorrectCnt, getDiffScore, getNickname, getScore, setCorrectCnt, setScore} from "../../function/localStorage";

export const Rank = (props) => {

    return (
        <Card_panel sx={props.sx}>
            <Item sx={{place: "center"}}>
                <Item sx={{place: "center", width: '100%'}}>
                    {props.rank === 1 || props.rank === 2 || props.rank === 3 ?
                        <Img
                            src={"/img/medal_" + props.rank + ".png"}
                            sx={{width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%'}}
                        />
                        :
                        <Img
                            src={"/img/medal_4.png"}
                            sx={{width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%'}}
                        />
                    }

                </Item>
                <Item sx={{place: 'center'}}>
                    <Text sx={{fontSize:'2vw'}} sm={{fontSize:'6vw'}}>{props.nickName}</Text>
                </Item>
                <Item sx={{place: 'center'}}>
                    {props.type === "personal" ?
                        <Text sx={{fontSize:'2vw'}} sm={{fontSize:'6vw'}}>{props.score}점
                            {getDiffScore() > 0 ?
                                <Text sx={{fontSize: '2vw', color: 'green'}} sm={{fontSize: '6vw'}}>(+{getDiffScore()})</Text>
                                :
                                <Text sx={{fontSize: '2vw', color: 'red'}} sm={{fontSize: '6vw'}}>(+{getDiffScore()})</Text>
                            }
                        </Text>
                        :
                        <Text sx={{fontSize:'2vw'}} sm={{fontSize:'6vw'}}>{props.score}점</Text>
                    }
                </Item>
            </Item>
        </Card_panel>
    )
}


