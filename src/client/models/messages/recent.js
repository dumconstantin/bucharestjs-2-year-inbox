
module.exports = {
  path: '/messages/recent',
  args: {
    recentPeriod: '/config/app/recentPeriod',
    data: '/data/messages',
    time: '/time/ms'
  },
  fn: args => {
    if (!args.data) {
      return []
    }

    let messages = Object.keys(args.data).reduce((acc, x) => {
      let message = args.data[x]

      if (args.time < message.createdAt + args.recentPeriod) {
        acc.push(message)
      }

      return acc
    }, [])

    return messages

  }
}
