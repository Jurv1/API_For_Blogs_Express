import {Blog} from "../schemas/blogSchemas";
import {Post} from "../schemas/postSchemas";
import {Video} from "../schemas/videoSchemas";

export let blogs: Blog[] = []
export let posts: Post[] = []
export let videos: Video[] = [];

export let db = [
    blogs,
    posts,
    videos
]