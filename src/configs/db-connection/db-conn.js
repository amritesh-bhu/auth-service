import mongoose from "mongoose"

export const mongoConnection = async (MONGO_URI) => {
    try {
        await mongoose.connect(`${MONGO_URI}`)
        console.log('Databse connected successfully!!')

    } catch (error) {
        throw new Error("Couldn't connect to database!!")
    }
}