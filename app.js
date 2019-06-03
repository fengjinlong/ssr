const Vue = require('vue')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  // renderer.renderToString(app, (err, html) => {
  //   if (err) {
  //     res.status(500).end('Internal Server Error')
  //     return
  //   }
  //   res.end(`
  //     <!DOCTYPE html>
  //     <html lang="en">
  //       <meta charset="UTF-8">
  //       <head><title>Hello</title></head>
  //       <body>${html}</body>
  //     </html>
  //   `)
  // })

  const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./staticHtml/index.template.html', 'utf-8')
  })
  const context = {
    title: 'hello1',
    meta: `
    <meta charset="UTF-8">
    `
  }
  
  renderer.renderToString(app, context, (err, html) => {
    console.log(html) // html 将是注入应用程序内容的完整页面
    res.end(html)
  })
})

server.listen(8080)