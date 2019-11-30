module.exports = {
  plugins: {
    autoprefixer: {},
    'px2rem-exclude': {
      'remUnit': 75,
      'exclude': /node_modules|pc/i
    }
  }
}
