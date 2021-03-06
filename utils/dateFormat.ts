export const dateFormat = (value: number) => {
    const date = new Date(value)
    return (date.getHours()<10? '0' : '') + date.getHours() + ':'
        + (date.getMinutes()<10? '0' : '') + date.getMinutes() + ' '
        + date.toLocaleDateString()
}