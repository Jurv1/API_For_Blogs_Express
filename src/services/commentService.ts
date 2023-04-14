import {CommentRepository} from "../repositories/commentRepository";

export class CommentService {
    constructor( protected commentsRepository: CommentRepository) {}
    async updateOneCommentById(id: string, content: string): Promise<boolean> {
        return await this.commentsRepository.updateOne(id, content)
    }

    async deleteOneCommentById(id: string): Promise<boolean> {

        return await this.commentsRepository.deleteOne(id)

    }
}
