
module.exports = {
  path: '/users/recent',
  args: {
    messages: '/messages/recent',
    users: '/data/users'
  },
  fn: args => {
    if (!args.messages || !args.users) {
      return {}
    }

    let recent = {}
    args.messages.forEach(x => {
      recent[x.userUid] = true
    })

    return recent

  }
}
