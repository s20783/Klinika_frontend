export function ValidateHaslo(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{5,}$/
    return regex.test(value);
}