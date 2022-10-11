export function ValidateHaslo(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
    return regex.test(value);
}