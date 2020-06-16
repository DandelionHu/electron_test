const { Menu,BrowserWindow } = require('electron')
// 菜单
const template = [
  {
    label: '首页',
    submenu: [
      {
        label: '信息管理',
        accelerator: 'ctrl+n',
        click: ()=>{
          var win = new BrowserWindow({
            width: 500,
            height: 500,
            webPreferences: {
              nodeIntegration: true
            }
          })
          win.loadFile('src/yellow.html')
          win.on('close',()=>{
            win = null
          })
        }
      },
      {
        label: '车辆管理'
      },
      {
        label: '客户信息'
      }
    ]
  },
  {
    label: '进销存',
    submenu: [
      {
        label: '开单'
      },
      {
        label: '财务'
      },
      {
        label: '销售报表'
      }
    ]
  }
]
// 构建模板
const m = Menu.buildFromTemplate(template)
// 设置菜单
Menu.setApplicationMenu(m)
