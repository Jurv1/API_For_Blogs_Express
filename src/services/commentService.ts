import {CommentRepository} from "../repositories/commentRepository";
import {DBLike} from "../schemas/dbSchemas/LikesDBSchema";
import {injectable} from "inversify";
import {LikesRepository} from "../repositories/likesRepository";

@injectable()
export class CommentService {
    constructor( protected commentsRepository: CommentRepository, protected likesRepo: LikesRepository) {}
    async updateOneCommentById(id: string, content: string): Promise<boolean> {
        return await this.commentsRepository.updateOne(id, content)
    }

    async deleteOneCommentById(id: string): Promise<boolean> {

        return await this.commentsRepository.deleteOne(id)

    }

    async deleteLikeDislike(userId: string, commentId: string, userStatus: string){

        return await this.likesRepo.deleteLikeDislike(userId, commentId, userStatus)

    }

    // async likePostOrComment(commentPostId: string, likeStatus: string, userId: string, userLogin: string){
    //
    //         const LikeTmp: DBLike = {
    //             userId: userId,
    //             userLogin: userLogin,
    //             userStatus: likeStatus,
    //             commentPostId: commentPostId,
    //             addedAt: (new Date()).toISOString()
    //         }
    //         //await this.commentsRepository
    //         return await this.commentsRepository.makeLikeForPost(LikeTmp)
    // }


}
