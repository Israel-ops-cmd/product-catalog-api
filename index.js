import express from 'express'
import userRouters from './src/routers/user.router.js'
import 'dotenv/config'

const port = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(userRouters)

app.listen(port, () => {console.log(`Server is runnig on port ${port}`)})