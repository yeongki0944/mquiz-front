import {R_flushQuizPlay, R_setData} from "../redux/reducers/quizplayReducer";
import store from "../redux/store";
import {R_flushQuizInfo} from "../redux/reducers/quizInfoReducer";
import {R_flushQuizList} from "../redux/reducers/quizListReducer";
import {R_flushReport} from "../redux/reducers/reportInfoReducer";
import {R_flushUserInfo} from "../redux/reducers/userInfoReducer";

export const setCommand = (cmd) => {
    store.dispatch(R_setData({key: "command", value: cmd}));
};


export const flushRedux = () => {
    store.dispatch(R_flushQuizInfo());
    store.dispatch(R_flushQuizList());
    store.dispatch(R_flushQuizPlay());
    store.dispatch(R_flushReport());
    store.dispatch(R_flushUserInfo());
};
