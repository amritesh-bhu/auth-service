import { Router } from "express";
import { dataValidator } from "../utils/validate-payload.js";
import { authDomain } from "../domain/user-auth/index.js";

export const authRouter = Router()

authRouter.post('/signup', async (req, res) => {

    try {
        dataValidator.signUpDataValidator(req)

        const { firstName, lastName, emailId, password } = req.body

        const user = await authDomain.registerUser({ firstName, lastName, emailId, password })
        res.status(200).json({ message: "User registered succefully!!", data: user })

    } catch (err) {
        res.status(400).send(err.message)
    }
})