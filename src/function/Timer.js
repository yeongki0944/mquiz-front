import {getQuizTime} from "./localStorage";

export const getTime = () => {
    return new Date().getTime("utc", {timeZone: 'Asia/Seoul'});
}

export const getSolvedTime = () => {
    return getTime() - getQuizTime();
}

export const getGaugeTimer = (quizTime) => {
    return quizTime * 10 - getRemainingTimebySec();
}

export const getRemainingTimebySec = () => {
    const remainingTime = getTime() - getQuizTime();
    const remainingSec = Math.floor(remainingTime / 100);
    return remainingSec;
}
