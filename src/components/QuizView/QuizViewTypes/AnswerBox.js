import {Item} from "../../LayOuts/LayOuts";

export const AnswerBox = (props) => {
    return (
        <Item sx={{place: 'center', float: 'left', width: '50%'}} sm={{height: '45%'}}>
            <Item
                sx={{
                    background: '#fff',
                    borderRadius: '10px',
                    width: '90%',
                    height: '90%',
                    place: 'center',
                    minHeight: '100px',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
                }}
                sm={{minHeight: '120px'}}
            >
                {console.log(props)}
                {props.answer}
            </Item>
        </Item>
    )
}
