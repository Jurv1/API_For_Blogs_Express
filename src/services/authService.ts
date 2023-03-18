import {getOneByConfirmationCode, getOneByLoginOrEmail} from "../repositories/queryRepository/userQ/userQ"
import {usersRepository} from "../repositories/usersRepository"
import {emailManager} from "../managers/emailManager";
import {v4 as uuidv4} from "uuid";

export async function confirmEmail(code: string): Promise<boolean>{

    try{
        const user = await getOneByConfirmationCode(code)
        if (!user) return false
        if(user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if ( user.emailConfirmation.expirationDate < new Date()) return false

        return await usersRepository.updateEmailConfirmation(user._id)
    } catch (err){
        console.log(err)
        return false
    }




}

export async function resendConfirmationEmail(email: string){

    const user = await getOneByLoginOrEmail(email)
    if (!user) return false
    const newRegistrationCode = uuidv4()
    try {
        await emailManager.sendEmailConfirmationMessage(user, newRegistrationCode)
    } catch (err){
        console.log(err)
        return false
    }
    return await  usersRepository.updateConfirmationCode(user._id, newRegistrationCode)

}