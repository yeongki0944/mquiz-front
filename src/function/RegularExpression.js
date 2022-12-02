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

