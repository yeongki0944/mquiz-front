
export const getPinNum = ()=>{
    return localStorage.getItem('pinNum');
}

export const getNickname = ()=>{
    return localStorage.getItem('nickName');
}

export const getRole = ()=>{
    return localStorage.getItem('role');
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

export const flushLocalStorage = ()=>{
    localStorage.removeItem('pinNum');
    localStorage.removeItem('nickName');
}
