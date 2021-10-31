const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(express.static(__dirname + '/dist/pb-app'))
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/pb-app/index.html'))
})
app.listen(process.env.PORT || 4200, () => { console.log(`server is listening on ${process.env.PORT || 4200}`) })