export function CheckTextRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (length > max) {
        return false;
    }
    return length >= min;

}