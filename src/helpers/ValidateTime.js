export function ValidateTime(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const regex = /^(09|10|11|12|13|14|15|16|17|18|19|20|21):(00|30)/;

    return regex.test(value);
}