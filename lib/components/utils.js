const notify = (message, time = 1800) => {
  const sidebarTop = document.querySelector('.Sidebar-top')
  const mainContainer = document.querySelector('.main-container')
  const appContainer = document.querySelector('.app-container')
  sidebarTop.innerText = message

  return new Promise(resolve => {
    mainContainer.classList.add('opacity')
    appContainer.classList.add('show-nav-top')
    setTimeout(() => {
      appContainer.classList.remove('show-nav-top')
      mainContainer.classList.remove('opacity')
      resolve()
    }, time)
  })
}

const spinner = mode => {
  const spnr = document.querySelector('.spinner')
  if (mode === 'show') {
    spnr.classList.remove('fadeout')
  } else if (mode === 'hide') {
    spnr.classList.add('fadeout')
  }
}

export { spinner, notify }
