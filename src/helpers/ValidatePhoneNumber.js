export function ValidatePhoneNumber(value) {
    if (!value) {
        return false;
    }
    value = value.toString();
    var regex = /^(\+?[0-9]{9,11})$/;
    return regex.test(value);
}