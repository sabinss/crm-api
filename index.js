import express from 'express'
import routes from './src/routes/crmRoutes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const app = express()
const PORT = 4000
console.log('New image build')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://mongo/CRMdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error:'))
conn.once('open', function () {
  console.log('db connection open')
})
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

// serving static files
app.use(express.static('public'))

app.get('/', (req, res) => res.send(`Node and express server running on port ${PORT}`))

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`))
