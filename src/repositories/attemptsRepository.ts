import {attemptsDBController} from "../db/db";
import {Attempt} from "../schemas/presentationSchemas/attemptSchema";

export const attemptsRepository = {
    async countAttempts(ip: string, URL: string, timeLimit: Date){
        return await attemptsDBController.countDocuments({ip: ip, requestString: URL, expTime: {$gt: timeLimit}})
    },

    async createAttempt(attempt: Attempt){
        return await attemptsDBController.insertOne(attempt)
    }
}