
import jsonmvc, { loadModule, reloadHMR } from 'jsonmvc'

require('framework7.ios.css')
require('framework7.ios.colors.css')
Dom7('body').addClass('ios')

require('css/styles.css')

/**
 * Setup system
 */
let context = require.context('./', true, /\.js|yml/)
let appModule = loadModule(context)

let instance = jsonmvc(appModule, {
  firebase: true,
  ui: true,
  time: true,
  forms: true,
  fields: true,
  ajax: true,
  framework7: true
})

document.querySelector(db.get('/config/ui/mount/el')).setAttribute('class', 'framework7-root')

if (module.hot) {
  module.hot.accept(context.id, () => {
    let context = require.context('./', true, /\.js|yml/)
    reloadHMR(instance, context)
  })
}

db.on('/err', x => console.log('DB error', x))
