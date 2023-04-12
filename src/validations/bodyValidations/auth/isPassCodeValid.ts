import { body } from "express-validator";
import {UserQ} from "../../../repositories/queryRepository/userQ/userQ";

const userQ = new UserQ
export const isPassCodeValid = body("recoveryCode").custom(
    async (value) => {
        const user = await userQ.getOneByPassCode(value)
        if (!user || user.passRecovery.recoveryCode !== value || user.passRecovery.expirationDate! < new Date()
        ) {
            throw new Error("Something is wrong with your code")
        }
        return true
    }
)