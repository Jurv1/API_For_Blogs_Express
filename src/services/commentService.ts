import {commentsRepository} from "../repositories/commentRepository";

export async function updateOneCommentById(id: string, content: string): Promise<boolean>{
    return await commentsRepository.updateOne(id, content)
}

export async function deleteOneCommentById(id: string, userId: string): Promise<boolean>{

    return await commentsRepository.deleteOne(id, userId)

}