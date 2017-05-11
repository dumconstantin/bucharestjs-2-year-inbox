
module.exports = {
  path: '/app/usersScale',
  args: {
    count: '/users/count'
  },
  fn: args => {
    if (!args.count) {
      return 1
    } else {
      return Math.ceil(args.count / 10)
    }
  }
}

