export default (text: string) => {
    const arr = text.split(' ')
    const nickname = arr.find(item => item.charAt(0) === '@')
    const restText = arr.filter(item => item.charAt(0) !== '@').join('')
    const textData = {
        nickname: nickname?.substring(1),
        text: restText
    }
    return textData
}