/**
 * Promisify a callback-style function
 *
 * @param {fn} fn tokenized string
 * @returns {fn}
 */
module.exports = fn => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, ...res) {
        if (err) return reject(err)

        if (res.length === 1) return resolve(res[0])

        resolve(res)
      })
    })
  }
}
