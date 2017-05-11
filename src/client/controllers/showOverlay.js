
import { stream, observer } from 'jsonmvc'

module.exports = {
  args: {
    current: '/users/count',
    minimum: '/config/app/minimumUsers'
  },
  fn: stream
    .filter(args => args.current >= args.minimum)
    .chain((args, lib) => observer(o => {
      firebase.database().ref('showGreeting').set({
        timestamp: lib.get('/time/ms'),
        value: false
      })
    }))
}
