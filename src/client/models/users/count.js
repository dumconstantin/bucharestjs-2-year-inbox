
module.exports = {
  path: '/users/count',
  args: {
    data: '/data/users'
  },
  fn: args => {
    if (!args.data) {
      return 0
    } else {
      return Object.keys(args.data).length
    }
  }
}
