
module.exports = {
  name: 'inbox',
  args: {
    minimumUsers: '/config/app/minimumUsers',
    userCount: '/users/count',
    users: '/data/users',
    messages: '/data/messages',
    messagesCount: '/messages/count',
    recentMessages: '/messages/recent',
    recentUsers: '/users/recent',
    showGreeting: '/app/showGreeting',
    usersScale: '/app/usersScale'
  },
  template: pug `
.inbox

  .greeting(v-if="showGreeting")
    h1
      | Pssst,
      br
      | intra aici!

    h1.link
      span bitly.com
    p.userRemaining {{ userCount }} / {{ minimumUsers }} participanti

  h1 Happy Birthday BucharestJS!
  .logo-bg(src="images/logo.jpg")

  .totalMessages
    i.fa.fa-user
    |  {{ userCount }}
    |  / 
    |  {{ messagesCount }} 
    i.fa.fa-heart

  .users(:data-scale="usersScale")
    .user(v-for="(user, uid) in users", :class="recentUsers[uid] ? 'active' : ''")
      img.pic(:src="'images/avatar-' + user.avatar + '.png'")

  .messages
    .message(v-for="message in recentMessages")
      img.icon(:src="'images/icon-' + message.message + '.png'")

  `
}
