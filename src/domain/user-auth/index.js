import mongoose from "mongoose";
import { nanoid } from "nanoid";
import crypto from "crypto";


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 20
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    salt: {
        type: String
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Invalid gender!!")
            }
        }
    },
    photoUrl: {
        type: String
    },
    skills: {
        type: [String]
    }
},
    {
        timestamps: true
    }
)


const authModel = mongoose.model("user", userSchema)

const createPasswordHash = async (password, salt) => {

    const hashedPassword = await crypto.createHash('md5').update(Buffer.from(password)).digest('hex') + salt
    return hashedPassword
}

const registerUser = async ({ firstName, lastName, emailId, password }) => {

    const salt = nanoid(8)
    const hashedPassword = await createPasswordHash(password, salt)

    const registeredUser = await authModel.create({ firstName, lastName, emailId, password: hashedPassword })
    if (!registeredUser) {
        throw new Error('Something went wrong while registering the user!!');
    }

    return registeredUser
}

export const authDomain = {
    registerUser
} 