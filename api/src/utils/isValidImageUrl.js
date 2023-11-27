/**
 * Regular expression for a phone number with at least 8 digits
 */
const isValidImageUrl = (url) => {
    // Regular expression to match common image file extensions
    // const imageFormatRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    // Regular expression to match a URL pattern
    const urlRegex = /^(http(s)?:\/\/)?[^\s\/$.?#].[^\s]*$/i;
    return urlRegex.test(url)
    return urlRegex.test(url) && imageFormatRegex.test(url);
}

module.exports = { isValidImageUrl }