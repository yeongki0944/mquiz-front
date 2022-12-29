export const chk_special = (str) => {
    var reg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    if (reg.test(str)) {
        return true;
    }
    return false;
}

export const chk_number = (str) => {
    var reg = /[0-9]/im;
    if (reg.test(str)) {
        return true;
    }
    return false;
}

export const chk_mail = (str) => {
    /*
     * 이메일 검증에 사용할 정규표현식 작성
     * 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능
     */
    var reg = /^[A-Za-z0-9_-]{5,20}$/im;
    if (reg.test(str)) {
        return true;
    }
    return false;
}

export const chk_passwd = (str) => {
    /*
     * 이메일 검증에 사용할 정규표현식 작성
     * 5~16자리 영문자,숫자,특수문자(!@#$%) 조합 패턴 검사
     */
    var reg = /^[A-Za-z0-9!@#$%]{5,16}$/im;
    if (reg.test(str)) {
        return true;
    }
    return false;
}

export const chk_nickname = (str) => {
    /*
     * 닉네임 검증에 사용할 정규표현식 작성
     *  한글, 영어 대소문자 3~15자리 사용 가능사용 가능
     */
    var reg = /^[가-힣A-Za-z0-9]{3,15}$/im;
    if (reg.test(str)) {
        return true;
    }
    return false;
}

export const chk_space = (str) => {
    /*
     * 공백 검증에 사용할 정규표현식 작성
     *  공백이 있으면 true, 없으면 false
     */
    var reg = /\s/g;
    if (reg.test(str)) {
        return true;
    }
    return false;
}























