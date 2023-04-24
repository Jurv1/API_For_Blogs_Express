import "reflect-metadata";

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
import {Container} from "inversify";

export const container = new Container()

//controllers registrations
container.bind(UserController).toSelf()
container.bind(AuthController).toSelf()
container.bind(CommentController).toSelf()
container.bind(BlogController).toSelf()
container.bind(SecurityController).toSelf()
container.bind(PostController).toSelf()


//services registrations
container.bind(UserService).toSelf()
container.bind(CommentService).toSelf()
container.bind(AuthService).toSelf()
container.bind(BlogService).toSelf()
container.bind(PostService).toSelf()
container.bind(VideoService).toSelf()
container.bind(JWTService).toSelf()
container.bind(DeviceService).toSelf()


//repositories registrations
container.bind(UsersRepository).toSelf()
container.bind(CommentRepository).toSelf()
container.bind(BlogsRepository).toSelf()
container.bind(PostsRepository).toSelf()
container.bind(VideosRepository).toSelf()
container.bind(DevicesRepository).toSelf()

//query Repositories registrations
container.bind(UserQ).toSelf()
container.bind(CommentQ).toSelf()
container.bind(BlogQ).toSelf()
container.bind(DeviceQ).toSelf()
container.bind(PostQ).toSelf()