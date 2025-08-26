import express from "express"
import { HTTP_PORT, MONGO_URI } from "../.secrets/env.js"
import cookieParser from "cookie-parser"
import { mongoConnection } from "./configs/db-connection/db-conn.js"
import { authRouter } from "./routes/user-auth.js"

await mongoConnection(MONGO_URI)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/user', authRouter)

app.use((err, req, res, next) => {
    res.status(400).send({ message: err.message })
})



app.listen(HTTP_PORT, () => {
    console.log(`Server is listening on port ${HTTP_PORT}`)
})                              