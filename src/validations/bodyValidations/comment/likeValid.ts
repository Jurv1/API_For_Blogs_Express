import {body} from "express-validator";

export const likeValid = body("likeStatus").custom(
    async (value) => {
        if ( value !== "Like" || value !== "Dislike" || value !== "None" ) {
            throw new Error("Something is wrong with your reaction on comment")
        }
        return true
    }
)