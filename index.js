import express from 'express'
import userRouters from './src/routers/user.router.js'

const app = express()

app.use(express.json())
app.use(userRouters)

app.listen(3001, () => {console.log("Server is runnig on port 3001")})