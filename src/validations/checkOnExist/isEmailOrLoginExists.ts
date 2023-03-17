import { body } from "express-validator";
import {getOneByLoginOrEmail} from "../../repositories/queryRepository/userQ/userQ";

export const isEmailOrLoginExists = (field: string) =>
    body(field).custom(async (value) => {
        const result = await getOneByLoginOrEmail(value);
        if (result) {
            throw new Error("User already registered");
        }
        return true;
    });