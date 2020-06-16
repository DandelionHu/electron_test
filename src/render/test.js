const btn = this.document.querySelector('#btn')
const mybtn = this.document.querySelector('#mybtn')
const aHref = this.document.querySelector('#aHref')
const textDiv = this.document.querySelector('#textDiv')
const BrowserWindow = require('electron').remote.BrowserWindow //获取主进程BrowserWindow
const { remote,shell } = require('electron')
let newWin = null
window.onload = function () {
  // 打开新窗口
  btn.onclick = ()=>{
    newWin = new BrowserWindow({
      width: 500,
      height: 500,
    })
    newWin.loadFile('src/yellow.html')
    newWin.on('closed',()=>{
      newWin = null
    })
  }
  // a标签绑定点击事件
  aHref.onclick = function (e) {
    // 使用箭头函数 注意this的指向
    e.preventDefault()
    const href = this.getAttribute('href')
    shell.openExternal(href)
  }
  // 打开子窗口
  mybtn.onclick = ()=>{
    // window.open('https://jspang.com')
    window.open('popupPage.html')
  }
}
window.addEventListener('message',(msg)=>{
  textDiv.innerHTML = JSON.stringify(msg.data)
})

// 右键菜单
const rightTemplate=[
  {
    label: '粘贴',
    accelerator: 'ctrl+c',// 快捷键
  },
  {
    label: '复制',
    accelerator: 'ctrl+v',
  }
]
const m = remote.Menu.buildFromTemplate(rightTemplate)

// 绑定右键事件
window.addEventListener('contextmenu',(e)=>{
  // 阻止默认事件
  e.preventDefault()
  m.popup({
    window:remote.getCurrentWindow()
  })
})

