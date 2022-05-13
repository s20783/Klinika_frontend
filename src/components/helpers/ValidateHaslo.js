export function ValidateHaslo(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    if(value.length < 3){
        return false;
    }
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    return lowerCaseLetters.test(value) && upperCaseLetters.test(value) && numbers.test(value);
}