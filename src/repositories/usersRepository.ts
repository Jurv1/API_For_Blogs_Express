import {DBUser, FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import {ObjectId} from "mongodb";
import {User} from "../schemas/mongooseSchemas/mongooseUserSchema";

export const usersRepository = {

    async createOne(newUserTmp: DBUser): Promise<FinalDBUser|null> {

        const resultId = await User.create(newUserTmp)
        console.log(resultId)
        return User.findOne({_id: resultId._id});

    },

    async updateEmailConfirmation(id: ObjectId): Promise<boolean>{
        const result = await User.updateOne({_id: id},
            {$set:
                    {
                        'emailConfirmation.isConfirmed': true
                    }
            }
            )
        return result.modifiedCount === 1

    },

    async updateConfirmationCode(id: ObjectId, code: string): Promise<boolean>{
        const result = await User.updateOne({_id: id},
            {$set:
                    {
                        'emailConfirmation.confirmationCode': code
                    }
            }
        )
        return result.modifiedCount === 1

    },

    async deleteOne(id: string): Promise<boolean> {
        const myId = new ObjectId(id)
        const result = await User.deleteOne({ _id: myId })
        return result.deletedCount === 1

    },

    async updatePassword(id: string, passSalt: string, passHash: string){
      const result = await User.updateOne({_id: id},
          {$set:
                  {
                      'accountData.password': passHash,
                      'accountData.passwordSalt': passSalt,
                      'passRecovery.recoveryCode': null,
                      'passRecovery.expirationDate': null
                  }}
          )

        return result.modifiedCount === 1
    },

}