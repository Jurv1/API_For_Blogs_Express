import {blogDBController, userDBController} from "../db/db";
import {DBUser, FinalDBUser} from "../schemas/dbSchemas/UserDBSchema";
import {ObjectId, SortDirection} from "mongodb";
import {BlogPagination} from "../schemas/paginationSchemas/blogPaginationSchema";
import {mapBlogs} from "../utils/mappers/blogMapper";
import {UserPagination} from "../schemas/paginationSchemas/userPaginationSchema";
import {mapUsers} from "../utils/mappers/userMapper";

export const usersRepository = {

    async createOne(newUserTmp: DBUser): Promise<FinalDBUser|null> {

        const resultId = await userDBController.insertOne(newUserTmp)
        console.log(resultId)
        return await userDBController.findOne({_id: resultId.insertedId});

    },

    async updateEmailConfirmation(id: ObjectId){
        const result = await userDBController.updateOne({_id: id},
            {$set:
                    {
                        'emailConfirmation.isConfirmed': true
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