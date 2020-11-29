export const shouldRespond = (message: string): boolean => {
    if (message.toLowerCase().match(/!whoami|!whois/)) {
        return true
    }

    return false
}
