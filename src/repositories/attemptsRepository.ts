import {attemptsDBController} from "../db/db";
import {Attempt} from "../schemas/presentationSchemas/attemptSchema";

export const attemptsRepository = {
    async countAttempts(ip: string, URL: string, time: Date){
        return await attemptsDBController.countDocuments({  })
    },

    async createAttempt(att: Attempt){
        const result = await attemptsDBController.insertOne(att)
        return await attemptsDBController.findOne({ _id: result.insertedId })
    }
}