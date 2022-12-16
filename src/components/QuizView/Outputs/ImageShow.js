import {Img, Item} from "../../../layouts/LayOuts";

export const ImageShow = (props) =>{
    const currentQuiz = props.currentQuiz;
    return(
        <Item sx={{place:'center',width:'100%',height:'100%'}}>
            {currentQuiz.media.url === "" || currentQuiz.media.url === null ?
            <Img
                src='/img/altquiz.jpg'
                sx={{
                    width:'auto',
                    height:'auto',
                    maxWidth:'100%',
                    maxHeight:'100%',
                    objectFit: 'cover',
                }}
                sm={{
                }}
            />
                :
            <Img
                src={currentQuiz.media.url}
                sx={{
                    width:'auto',
                    height:'auto',
                    maxWidth:'100%',
                    maxHeight:'100%',
                    objectFit: 'cover',
                }}
                sm={{
                }}
            />
            }
        </Item>
    )
}
