
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

export const flushLocalStorage = ()=>{
    localStorage.removeItem('pinNum');
    localStorage.removeItem('nickName');
    localStorage.removeItem('quiztime');
}
