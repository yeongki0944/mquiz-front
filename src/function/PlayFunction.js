import store from "../redux/store";
import {R_setData} from "../redux/reducers/quizplayReducer";

/**
 * 게임 진행을 위한 데이터를 가져오고, action에 따라 처리
 */
export const playFunction = (data) => {
    switch (data.action){
        case "COMMAND":
            command(data);
            store.dispatch(R_setData({key: "command", value: data.command}));
            break;
        default:
            break;
    }
}

/**
 * command에 따라 처리
 */
const command = (props) => {
    let data = props;
    switch (props.command){
        case "START":
            store.dispatch(R_setData({key: "quiz", value: props.quiz}));
            break;
        case "STOP":
            break;
        default:
            break;
    }
}
