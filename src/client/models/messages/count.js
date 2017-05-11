
module.exports = {
  path: '/messages/count',
  args: {
    data: '/data/messages'
  },
  fn: args => args.data ? Object.keys(args.data).length : 0
}
