export const Regex = {
    PASSWORD: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/,
    VALID_STRING: /^[a-zA-Z0-9_]+(\s[a-zA-Z0-9_]+)*$/
}