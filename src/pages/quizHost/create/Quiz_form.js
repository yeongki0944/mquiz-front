import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent, Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup, Rating, Switch,
    TextField, ToggleButtonGroup
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Quiz_panel from "./Quiz_panel";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '80%',
    maxHeight: '80%',
});


export default function Component(props) {
    const [types, setTypes] = React.useState(['선택형', 'OX형', '단답형']);
    const [times, setTimes] = React.useState([{value: 0, label: '0초'},{value: 10, label: '10초'}, {value: 20, label: '20초'}, {value: 30, label: '30초'}, {value: 40, label: '40초'}, {value: 50, label: '50초'}, {value: 60, label: '60초'}]);

    return (
        <>
            <TypeButton types={types} props={props}/>
            <hr/>
            <Question/>
            <hr/>
            <MediaBox props={props}/>
            <hr/>
            <FormType props={props}/>
            <hr/>
            <Options times={times} time={props.time} setTime={props.setTime} props={props}/>

        </>
    );

    function modyfiQuiz(id,key, value) {
        props.setQuiz(props.form.map((q) => {
            if (q.id === props.currentshow) {
                console.log(key, value);
                return {
                    ...q,
                    [key]: value
                }
            }
            return q;
        }, []));
    }

    function TypeButton(props) {
        return (
            <Box>
                <Grid container spacing={1}>
                    {props.types.map((type) => (
                        <Button
                            onClick={() => {
                                modyfiQuiz(props.currentshow, 'type', type);
                            }}
                        >
                            <Card>
                                <CardContent>
                                    <Typography>
                                        <Img alt="complex"
                                             src="https://www.quizn.show/webdata/images/type-icon/ico_type2_on.png"/>
                                    </Typography>
                                    <Typography>
                                        {type}

                                    </Typography>
                                </CardContent>
                            </Card>
                        </Button>
                    ))}
                </Grid>
            </Box>
        );
    }
    function Options(props){
        return(
            <Box>
                <h3>Options</h3>
                시간제한
                <TextField
                    select
                    value={props.time}
                    onChange={(event) => {
                        modyfiQuiz(props.currentshow,"time",event.target.value);}
                    }
                    SelectProps={{
                        native: true,
                    }}
                >
                    {props.times.map((time) => (
                        <option
                            key={time.value}
                            value={time.value}
                        >
                            {time.label}
                        </option>
                    ))}
                </TextField>[초]
                점수 사용 <Switch/>

                <Rating
                    name="simple-controlled"
                    max={3}
                    value={props.props.rate}
                    onChange={(event, newValue) => {
                        modyfiQuiz(props.currentshow,"rate",newValue);

                    }}
                />
            </Box>
        );
    }

    function MediaBox(props) {
        return (
            <Box>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Media</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="Image" control={<Radio/>} onClick={() => {
                            modyfiQuiz(props.currentshow,"mediaType",'Image');
                        }} label="Image"/>
                        <FormControlLabel value="Youtube" control={<Radio/>} onClick={() => {
                            modyfiQuiz(props.currentshow,"mediaType",'Youtube');
                        }} label="Youtube"/>
                        <FormControlLabel value="Audio" control={<Radio/>} onClick={() => {
                            modyfiQuiz(props.currentshow,"mediaType",'Audio');
                        }} label="Audio"/>
                    </RadioGroup>
                </FormControl>
                {props.props.Mediatype === 'Image' ?
                    <ImageBox/> :
                    (props.props.Mediatype === 'Youtube' ?
                        <YoutubeBox/> :
                        <AudioBox/>)
                }
            </Box>
        );

        function ImageBox() {
            return (
                <Box>
                    <TextField
                        placeholder={"이미지를 입력해주세요."}
                    />
                </Box>
            );
        }

        function YoutubeBox() {
            return (
                <Box>
                    <TextField
                        placeholder={"유튜브 링크를 입력해주세요."}
                    />
                    <TextField/>~<TextField/>
                </Box>
            );
        }

        function AudioBox() {
            return (
                <Box>
                    <TextField
                        placeholder={"오디오 링크를 입력해주세요."}
                    />
                </Box>
            );
        }
    }
}






function Question(props) {
    return (
        <Box>
            <h3>Question</h3>
            <TextField
                id="qfield"
                multiline
                rows={4}
                placeholder={"질문을 입력해주세요."}
            />
        </Box>
    );
}

function FormType(props) {
    switch (props.props.type) {
        case '선택형':
            return <QSelect/>;
        case 'OX형':
            return <QOX/>;
        case '단답형':
            return <QRep/>;
    }

    function QSelect() {
        return (
            <Box>
                <h3>정답</h3>
                <Grid>
                    <Typography>
                        <Checkbox/><TextField
                        id="qfield"
                        placeholder={"답을 입력해주세요."}
                    />
                    </Typography>
                    <Typography>
                        <Checkbox/><TextField
                        id="qfield"
                        placeholder={"답을 입력해주세요."}
                    />
                    </Typography>
                    <Typography>
                        <Checkbox/><TextField
                        id="qfield"
                        placeholder={"답을 입력해주세요."}
                    />
                    </Typography>
                    <Typography>
                        <Checkbox/><TextField
                        id="qfield"
                        placeholder={"답을 입력해주세요."}
                    />
                    </Typography>
                </Grid>

            </Box>
        );
    }

    function QOX() {
        return (
            <Box>
                <h3>정답</h3>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Answer</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="O" control={<Radio/>} label="O"/>
                        <FormControlLabel value="X" control={<Radio/>} label="X"/>
                    </RadioGroup>
                </FormControl>
            </Box>
        );
    }

    function QRep() {
        return (
            <Box>
                <h3>정답</h3>
                <TextField
                    id="qfield"
                    multiline
                    rows={4}
                    placeholder={"답을 입력해주세요."}
                />
            </Box>
        );
    }

}



