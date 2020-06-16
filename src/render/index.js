const fs = require('fs') // 引入文件系统

// 页面加载完毕执行
window.onload = function () {
  let btn = this.document.querySelector('#btn')
  let show_div = this.document.querySelector('#show_div')
  btn.onclick = function () {
    fs.readFile('src/read.txt',(err,data)=>{
      show_div.innerHTML = data
    })
  }
}
