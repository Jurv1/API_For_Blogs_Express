import { body } from "express-validator";
import {UserQ} from "../../repositories/queryRepository/userQ/userQ";

const userQ = new UserQ()
export const isEmailOrLoginExists = (field: string) =>
    body(field).custom(async (value) => {
        const result = await userQ.getOneByLoginOrEmail(value);
        if (result) {
            throw new Error("User already registered");
        }
        return true;
    });