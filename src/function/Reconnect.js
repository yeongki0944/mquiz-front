export const checkConnected = () => {
    if(localStorage.getItem('pinNum') != null){
            return true;
    }
}
