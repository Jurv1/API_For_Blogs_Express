import {PostsRepository} from "../repositories/postsRepository";
import {FinalDBPost} from "../schemas/dbSchemas/PostDBSchema";
import {FinalDBComment} from "../schemas/dbSchemas/CommentDBSchema";
import {BlogQ} from "../repositories/queryRepository/blogQ/blogQ";
import {PostQ} from "../repositories/queryRepository/postQ/postQ";

export class PostService {
    private postQ: PostQ;
    private blogQ: BlogQ;
    private postsRepository: PostsRepository;

    constructor() {
        this.postQ = new PostQ
        this.blogQ = new BlogQ
        this.postsRepository = new PostsRepository
    }
    async createOnePost(id: string, title: string, shortDescription: string, content: string,
                                        blogId: string, blogName: string, createdAt: string): Promise<FinalDBPost | null> {

        const foundedEl = await this.blogQ.getOneBlog(blogId)

        if (foundedEl) {
            const blogName = foundedEl.name
            let newPostTmp = {
                title: title.toString(),
                shortDescription: shortDescription.toString(),
                content: content,
                blogId: blogId,
                blogName: blogName,
                createdAt: new Date().toISOString()
            }
            return await this.postsRepository.createOne(newPostTmp)
            //return await postDBController.findOne({id: id}, {projection: {_id: 0}})
        } else {
            return null
        }

    }

    async createOnePostByBlogId(title: string, shortDescription: string, content: string, blogId: string):
        Promise<FinalDBPost | null> {

        const foundedEl = await this.blogQ.getOneBlog(blogId)
        if (foundedEl) {
            const blogName = foundedEl.name
            const newPostTmp = {
                title: title.toString(),
                shortDescription: shortDescription.toString(),
                content: content,
                blogId: blogId,
                blogName: blogName,
                createdAt: new Date().toISOString()
            }
            return await this.postsRepository.createOne(newPostTmp)
        } else {
            return null
        }
    }

    async createOneCommentByPostId(postId: string, content: string, userId: string, userLogin: string): Promise<FinalDBComment | null> {
        const foundedEl = await this.postQ.getOnePost(postId)
        if (foundedEl) {
            const newCommentTmp = {
                content: content,
                commentatorInfo: {
                    userId: userId,
                    userLogin: userLogin
                },
                postId: postId,
                createdAt: new Date().toISOString()
            }
            return await this.postsRepository.createOneCommentByPostId(newCommentTmp)
        } else return null
    }

    async updateOnePost(id: string, title: string, shortDescription: string, content: string,
                                        blogId: string,): Promise<boolean> {

        return await this.postsRepository.updateOne(id, title, shortDescription, content, blogId)

    }

    async deleteOnePost(id: string) {

        return await this.postsRepository.deleteOne(id)

    }
}

export const postService = new PostService()