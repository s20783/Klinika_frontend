export function checkNumberRange(value, min, max){
    if(!value){
        return false;
    }
    if(isNaN(value)){
        return false;
    }
    value=parseFloat(value);
    if(value<min){
        return false;
    }
    if(value>max){
        return false;
    }
    return true;
}