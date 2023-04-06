import {Attempt} from "../presentationSchemas/attemptSchema";
import {model, Schema} from "mongoose";

export const attemptSchema = new Schema<Attempt>({
    ip: {type: String, required: true},
    requestString: {type: String, required: true},
    expTime: {type: Date, required: true}
})

export const AttemptModel = model<Attempt>("Attempt", attemptSchema)