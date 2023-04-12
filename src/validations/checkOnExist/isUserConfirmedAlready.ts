import { body } from "express-validator";
import {UserQ} from "../../repositories/queryRepository/userQ/userQ";

const userQ = new UserQ()
export const isUserConfirmedAlready = body("email").custom(
    async (value) => {
        const result = await userQ.getOneByLoginOrEmail(value)
        if (!result || result.emailConfirmation.isConfirmed) {
            console.log(value)
            throw new Error("You are already confirmed yourself")
        }
        return true
    }
)
