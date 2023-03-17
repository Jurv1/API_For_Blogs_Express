import {userDBController} from "../db/db";
import {DBUser, FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import {ObjectId} from "mongodb";

export const usersRepository = {

    async createOne(newUserTmp: DBUser): Promise<FinalDBUser|null> {

        const resultId = await userDBController.insertOne(newUserTmp)
        console.log(resultId)
        return await userDBController.findOne({_id: resultId.insertedId});

    },

    async updateEmailConfirmation(id: ObjectId): Promise<boolean>{
        const result = await userDBController.updateOne({_id: id},
            {$set:
                    {
                        'emailConfirmation.isConfirmed': true
                    }
            }
            )
        return result.modifiedCount === 1

    },

    async updateConfirmationCode(id: ObjectId, code: string): Promise<boolean>{
        const result = await userDBController.updateOne({_id: id},
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
        const result = await userDBController.deleteOne({ _id: myId })
        return result.deletedCount === 1

    }
}