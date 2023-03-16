import { param } from "express-validator";
import {getOneByLoginOrEmail} from "../../repositories/queryRepository/userQ/userQ";

export const isCommentExists = param("email").custom(
    async (value) => {
        const result = await getOneByLoginOrEmail(value)
        if (!result || result.emailConfirmation.isConfirmed) throw new Error("You are already confirmed yourself")
        return true
    }
)