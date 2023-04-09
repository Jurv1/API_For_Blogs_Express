import { body } from "express-validator";
import {getOneByPassCode} from "../../../repositories/queryRepository/userQ/userQ";

export const isPassCodeValid = body("recoveryCode").custom(
    async (value) => {
        const user = await getOneByPassCode(value)
        if (!user || user.passRecovery.recoveryCode !== value || user.passRecovery.expirationDate! < new Date()
        ) {
            throw new Error("Something is wrong with your code")
        }
        return true
    }
)