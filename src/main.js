const electron = require('electron')
// 引用app
const app = electron.app
// 窗口引用
const BrowserWindow = electron.BrowserWindow
const BrowserView = electron.BrowserView
// 全局快捷键
const globalShortcut = electron.globalShortcut
// 声明要打开的主窗口
let mainWindow = null

// 创建应用
app.on('ready',()=>{
  // 创建窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    // 启用node.js api可以在渲染进程中使用
    webPreferences: {
      nodeIntegration: true
    }
  })
  // 打开调试模式
  mainWindow.webContents.openDevTools()
  // 引入菜单
  require('./main/menu')
  // 加载页面
  mainWindow.loadFile('src/filetest.html')
  // 创建view
  const view = new BrowserView()
  // 在主窗口中设置view可用
  mainWindow.setBrowserView(view)
  // 定义view的具体样式和位置
  view.setBounds({
    x: 0,
    y: 120,
    width: 1000,
    height: 680
  })
  // wiew载入的页面,加载网页（嵌入到主窗口）
  // view.webContents.loadURL('https://jspang.com')

  // 监听关闭窗口
  mainWindow.on('closed',()=>{
    // 释放窗口实例
    mainWindow = null
  })
  // 注册全局快捷键
  globalShortcut.register('ctrl+e',()=>{
    mainWindow.loadURL('https://jspang.com')
  })
  // 判断是否注册成功
  let isRegister = globalShortcut.isRegistered('ctrl+e')?'register ok':'fail'
  console.log(isRegister)

  // 注册全局快捷键
  let level = 0;
  // 注册一个 'CommandOrControl+X' 的全局快捷键
  const ret = globalShortcut.register('CommandOrControl+0', () => {
    level = 0
    mainWindow.webContents.setZoomLevel(0);
  });
  if (!ret) {
    console.log('registration failed');
  }
  // 验证是否注册成功
  console.log(globalShortcut.isRegistered('CommandOrControl+0'))
  mainWindow.webContents.on('zoom-changed', (e, zoomDirection) => {
    if (zoomDirection === 'in') {
      level = level >= 3 ? level : level += 0.2;
    } else {
      level = level <= -3 ? level : level -= 0.2;
    }
    mainWindow.webContents.setZoomLevel(level);
  });

})
// 即将退出
app.on('will-quit',()=>{
  // 注销全局快捷键方法
  globalShortcut.unregister('ctrl+e') // 单个取消
  globalShortcut.unregister('CommandOrControl+0') // 单个取消
  globalShortcut.unregisterAll() //全部取消
})



