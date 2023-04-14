import {UsersRepository} from "./repositories/usersRepository";
import {UserService} from "./services/userService";
import {UserQ} from "./repositories/queryRepository/userQ/userQ";
import {AuthController} from "./controllers/authController";
import {UserController} from "./controllers/userController";
import {AuthService} from "./services/authService";
import {DeviceService} from "./services/deviceService";
import {JWTService} from "./application/jwtService";
import {DevicesRepository} from "./repositories/devicesRepository";
import {BlogController} from "./controllers/blogController";
import {BlogService} from "./services/blogService";
import {BlogsRepository} from "./repositories/blogsRepository";
import {BlogQ} from "./repositories/queryRepository/blogQ/blogQ";
import {PostController} from "./controllers/postController";
import {PostService} from "./services/postService";
import {PostQ} from "./repositories/queryRepository/postQ/postQ";
import {PostsRepository} from "./repositories/postsRepository";
import {CommentController} from "./controllers/commentController";
import {CommentQ} from "./repositories/queryRepository/commentQ/commentQ";
import {CommentService} from "./services/commentService";
import {CommentRepository} from "./repositories/commentRepository";
import {SecurityController} from "./controllers/securityController";
import {DeviceQ} from "./repositories/queryRepository/deviceQ/deviceQ";
import {VideoService} from "./services/videoService";
import {VideosRepository} from "./repositories/videosRepository";

//Repositories
const userRepository = new UsersRepository
const devicesRepository = new DevicesRepository()
const blogsRepository = new BlogsRepository()
const postsRepository = new PostsRepository()
const commentsRepository = new CommentRepository()
const videosRepository = new VideosRepository()

//Query Repositories
const userQ = new UserQ()
const blogQ = new BlogQ()
const postQ = new PostQ()
const commentQ = new CommentQ()
const deviceQ = new DeviceQ()

//Services
const userService = new UserService(userRepository, userQ)
const authService = new AuthService(userRepository, userQ)
const deviceService = new DeviceService(devicesRepository)
const blogService = new BlogService(blogsRepository)
const postService = new PostService(postQ, blogQ, postsRepository)
const commentService = new CommentService(commentsRepository)
export const videoService = new VideoService(videosRepository)
const jwtService = new JWTService()

//Controllers
export const authController = new AuthController(userService, userQ, authService, deviceService,
    jwtService, devicesRepository)
export const userController = new UserController(userService, userQ)
export const blogController = new BlogController(blogService, blogQ)
export const postController = new PostController(postService, postQ)
export const commentController = new CommentController(commentQ, commentService)
export const securityController = new SecurityController(deviceQ, deviceService, jwtService)