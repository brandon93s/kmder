/**
 * Formats a tokenized string with the provided values
 *
 * "Hello, my name is {0} {1}" => "Hello, my name is Bob Smith"
 *
 * @param {str} str tokenized string
 * @param {any} values values to populate tokens with
 * @returns {str} formatted string
 */
module.exports = (str, values) => {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof values[number] !== 'undefined' ? values[number] : match
  })
}
