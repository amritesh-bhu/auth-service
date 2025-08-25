import express from "express"
import { HTTP_PORT } from "../.secrets/env.js"

const app = express()

app.get("/", (req, res) => {
    res.send("Hi there!!")
})

app.listen(HTTP_PORT, () => {
    console.log(`Server is listening on port ${HTTP_PORT}`)
})