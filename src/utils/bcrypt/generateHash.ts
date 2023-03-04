import bcrypt from "bcrypt";

export async function generateHash(password: string, salt: string){

    return await bcrypt.hash(password, salt)

}