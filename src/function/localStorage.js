
export const getPinNum = ()=>{
    return localStorage.getItem('pinNum');
}

export const getNickname = ()=>{
    return localStorage.getItem('nickName');
}

export const getRole = ()=>{
    return localStorage.getItem('role');
}

export const getQuizTime = () => {
    return localStorage.getItem('quizTime');
}

export const getScore = () => {
    return localStorage.getItem('score');
}

export const getDiffScore = () => {
    return localStorage.getItem('diffScore');
}

export const getCorrectCnt = () => {
    return localStorage.getItem('correctCnt');
}

export const setPinNum = (pinNum)=>{
    return localStorage.setItem('pinNum',pinNum);
}

export const setNickname = (nickName)=>{
    return localStorage.setItem('nickName',nickName);
}

export const setRole = (role)=>{
    return localStorage.setItem('role',role);
}

export const setQuizTime = ()=>{
    return localStorage.setItem('quizTime',new Date().getTime("utc", {timeZone: "asia/Seoul"}));
}

export const setScore = (score)=>{
    return localStorage.setItem('score',score);
}

export const setCorrectCnt = (correctCnt)=>{
    return localStorage.setItem('correctCnt',correctCnt);
}

export const setDiffScore = (diffScore)=>{
    return localStorage.setItem('diffScore',diffScore);
}

export const flushLocalStorage = ()=>{
    localStorage.removeItem('pinNum');
    localStorage.removeItem('nickName');
    localStorage.removeItem('quiztime');
    localStorage.removeItem('score');
    setCorrectCnt(0);
    setDiffScore(0);
}

export const flushDupliNickname = ()=>{
    localStorage.removeItem('nickName');
    localStorage.removeItem('role');
}
