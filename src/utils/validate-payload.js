import validator from "validator";

const signUpDataValidator = (req) => {
    const { firstName, lastName, emailId, password } = req.body

    if (!firstName || !lastName) {
        throw new Error("Please enter firstName and lastname")
    }
    else if (!validator.isEmail(emailId) || !validator.isStrongPassword(password)) {
        throw new Error("Please enter valid email id!!")
    }
}

export const dataValidator = {
    signUpDataValidator
}