const FORMATTER = new Intl.DateTimeFormat('en-UK', { dateStyle: 'medium', timeStyle: 'short' })

const formatDate = dateString => {
    const date = new Date(dateString)

    return FORMATTER.format(date)
}

export default formatDate