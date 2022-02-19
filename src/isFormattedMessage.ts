export function isFormattedMessage(message: string) {
    return message.indexOf("{") > -1 || message.indexOf("}") > -1;
}
