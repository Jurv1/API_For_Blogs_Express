import {getOneByConfirmationCode} from "../repositories/queryRepository/userQ/userQ"
import {usersRepository} from "../repositories/usersRepository"

export async function confirmEmail(code: string){
    const user = await getOneByConfirmationCode(code)

    if (!user) return false
    if(user.emailConfirmation.isConfirmed) return false
    if (user.emailConfirmation.confirmationCode === code) return false
    if ( user.emailConfirmation.expirationDate < new Date()) return false

    return await usersRepository.updateEmailConfirmation(user._id)

}