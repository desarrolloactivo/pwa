import template from './template.pug'

const FirstModule = selector => {
  document.querySelector(selector).innerHTML = template()
}

export default FirstModule
