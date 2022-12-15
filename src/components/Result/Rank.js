import {Card_panel, Img, Item, Text} from "../../LayOuts/LayOuts";

export const Rank = (props) => {
    return (
        <Card_panel sx={props.sx}>
            <Item sx={{place: "center"}}>
                <Item sx={{place: "center", width: '100%'}}>
                    <Img
                        src={"/img/medal_" + props.rank + ".png"}
                        alt={"rank"}
                        sx={{width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%'}}
                    />
                </Item>
                <Item sx={{place: 'center'}}>
                    <Text sx={{fontSize:'2vw'}} sm={{fontSize:'6vw'}}>{props.nickName}</Text>
                </Item>
                <Item sx={{place: 'center'}}>
                    <Text sx={{fontSize:'2vw'}} sm={{fontSize:'6vw'}}>{props.score}점</Text>
                </Item>
            </Item>
        </Card_panel>
    )
}


