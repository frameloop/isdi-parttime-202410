function parseCookies(cookieString) {
    if (!cookieString) return {}

    const keyValues = cookieString.split('; ')

    const cookies = keyValues.reduce((accum, keyValue) => {
        const keyAndValue = keyValue.split('=')

        const key = keyAndValue[0]
        const value = keyAndValue[1]

        accum[key] = value

        return accum
    }, {})

    return cookies
}

module.exports = parseCookies