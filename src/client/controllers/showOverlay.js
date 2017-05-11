
import { stream } from 'jsonmvc'

module.exports = {
  args: {
    current: '/users/count',
    minimum: '/config/app/minimumUsers'
  },
  fn: stream
    .filter(args => args.current >= args.minimum)
    .map(args => ({
      op: 'add',
      path: '/app/showGreeting',
      value: false
    }))

}
