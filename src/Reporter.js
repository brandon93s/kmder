class Reporter {
  static log (value) {
    if (Array.isArray(value) && value.length === 1) {
      Reporter.value(value[0])
      return
    }

    Reporter.value(value)
  }

  static value (value) {
    console.log(value)
  }

  static table (value) {
    console.dir(value)
  }
}

module.exports = Reporter
