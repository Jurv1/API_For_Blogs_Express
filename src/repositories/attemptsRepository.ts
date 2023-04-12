import {Attempt} from "../schemas/presentationSchemas/attemptSchema";
import {AttemptModel} from "../schemas/mongooseSchemas/mongooseAttemptSchema";

class AttemptsRepository {
    async countAttempts(ip: string, URL: string, timeLimit: Date){
        return AttemptModel.countDocuments({ip: ip, requestString: URL, expTime: {$gt: timeLimit}});
    }

    async createAttempt(attempt: Attempt){
        return await AttemptModel.create(attempt)
    }
}
export const attemptsRepository = new AttemptsRepository()