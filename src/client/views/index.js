
module.exports = {
  name: 'inbox',
  args: {
    users: '/data/users',
    messages: '/data/messages',
    messagesCount: '/messages/count',
    recentMessages: '/messages/recent'
  },
  template: pug `
.inbox

  h1 Happy Birthday BucharestJS!
  .logo-bg(src="images/logo.jpg")

  .users

    .user(v-for="user in users")
      img.pic(:src="'images/avatar-' + user.avatar + '.png'")

  .messages
    .message(v-for="message in recentMessages")
      img.icon(:src="'images/icon-' + message.message + '.png'")

  .join-in
    p There are {{ messagesCount }} congrats so far!
    | Show your 
    i.fa.fa-heart
    span  at bitly.com

  `
}
