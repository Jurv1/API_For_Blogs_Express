import { body } from "express-validator";
import {getOneByLoginOrEmail} from "../../repositories/queryRepository/userQ/userQ";

export const isUserConfirmedAlready = body("email").custom(
    async (value) => {
        const result = await getOneByLoginOrEmail(value)
        if (!result || result.emailConfirmation.isConfirmed) {
            console.log(value)
            throw new Error("You are already confirmed yourself")
        }
        return true
    }
)
