import {Attempt} from "../schemas/presentationSchemas/attemptSchema";
import {AttemptModel} from "../schemas/mongooseSchemas/mongooseAttemptSchema";

export const attemptsRepository = {
    async countAttempts(ip: string, URL: string, timeLimit: Date){
        return AttemptModel.countDocuments({ip: ip, requestString: URL, expTime: {$gt: timeLimit}});
    },

    async createAttempt(attempt: Attempt){
        return await AttemptModel.create(attempt)
    }
}