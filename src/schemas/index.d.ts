import {FinalDBUser} from "./dbSchemas/UserDBSchema";

declare global {
    declare namespace Express {
        export interface Request {
            user: FinalDBUser | null
        }
    }
}