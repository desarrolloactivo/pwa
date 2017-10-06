import template from './template.pug'
import {spinner, notify} from '../utils'

export default () => {
  const appContainer = document.querySelector('.app-container')

  appContainer.innerHTML = template()

  appContainer.addEventListener('click', async event => {
    spinner('show')
    const FirstModule = await System.import('../firstmodule'/* webpackChunkName:"firstmodule" */)
      .then(module => module.default)
      .catch(error => notify(error, 800))
    FirstModule('.Layout')
    notify('hello world', 800)
    setTimeout(() => spinner('hide'), 800) // spinner('hide')
  })

  // const test = async () => {
  //   const FirstModule = await System.import('../firstmodule'/* webpackChunkName:"firstmodule" */).then(module => module.default)
  //   FirstModule('.Layout')
  // }

  // test()
  var content = document.querySelector('.Layout')
  content.addEventListener('change', function () {
    console.log('content / div / resize')
  })
}
