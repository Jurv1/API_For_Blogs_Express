import {body} from "express-validator";

export const likeValid = body("likeStatus").custom(
    async (value) => {
        const tuple = ['Like', 'Dislike', 'None']
        if ( !(tuple.includes(value)) ) {
            throw new Error("Something is wrong with your reaction on comment")
        }
        return true
    }
)