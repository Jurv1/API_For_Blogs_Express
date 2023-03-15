import { param } from "express-validator";
import {getOneByLoginOrEmail} from "../../repositories/queryRepository/userQ/userQ";
import {NextFunction} from "express";

export async function isEmailOrLoginExists(field: string) {
    param(field).custom(
        async (value) => {
            const result = await getOneByLoginOrEmail(value)
            if (!result) throw new Error("Login or email is already exists")
            return true
        }
    )
}