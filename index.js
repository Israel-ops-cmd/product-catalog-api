import express from 'express'
import { routers } from './src/routers/index.js'
import 'dotenv/config'

const port = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(routers)

app.listen(port, () => {console.log(`Server is runnig on port ${port}`)})