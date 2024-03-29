import request from "supertest";
import {app} from "../../src";
import mongoose, {Schema} from "mongoose";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";

//todo finish this at the end of it all


// beforeEach(async () => {
//     await mongoose.connect();
// })
afterAll(async () => {
    await mongoose.disconnect()
})


describe("Blogs", () => {
    describe("Testing good CRUD operations on blogs", () => {
        beforeAll(async () => {
            await request(app).delete('/testing/all-data')
        })

        it("should return 404 status cause there NO blogs", async () => {
            const result = await request(app).get('/blogs')

            expect(result.status).toEqual(404)
        })

        it("should create blog with correct input data", async () => {
            const result = await request(app).post('/blogs')
                .send({
                    name: "new blog",
                    description: "It's my first blog don't judge me a lot",
                    websiteUrl:
                        "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8"
                })
                .set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                )
                .expect(201)

            expect(result.body).toEqual({
                id: expect.any(String),
                name: "new blog",
                description: "It's my first blog don't judge me a lot",
                websiteUrl:
                    "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8",
                isMembership: false,
                createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
            })

            const createdBlog = await request(app).get('/blogs').expect(200)
            expect(createdBlog.body.items[0]).toEqual({
                id: expect.any(String),
                name: "new blog",
                description: "It's my first blog don't judge me a lot",
                websiteUrl:
                    "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8",
                isMembership: false,
                createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
            })
        })

        it("should get one blog by Id", async () => {

            const result = await request(app).get('/blogs')
            expect(result.status).toEqual(200)

            const blog = await request(app).get('/blogs/' + result.body.items[0].id)
            expect(blog.body).toEqual(result.body.items[0])
        })

        it("should update blog by Id", async () => {

            const result = await request(app).get('/blogs')
            expect(result.status).toEqual(200)

            const updatedBlog = await request(app).put('/blogs/' + result.body.items[0].id).send({
                name: "New Name",
                description: "New Description",
                websiteUrl: "https://5XTbP0GoJAGFA0M_X0IuoDwg1Vwqj4DPn-D6RclYA.MFcVjRabQrhw1cIq6v7vtibGCiQaWUpszHB3hwUuGyG9oW_ET4"
            }).set(
                "Authorization",
                "Basic YWRtaW46cXdlcnR5"
            )

            const updatedResult = await request(app).get('/blogs/' + result.body.items[0].id)
            expect(updatedBlog.status).toEqual(204)

            expect(updatedResult.status).toBe(200)
            expect(updatedResult.body.name).toEqual("New Name")
            expect(updatedResult.body.description).toEqual("New Description")
            expect(updatedResult.body.websiteUrl).toEqual("https://5XTbP0GoJAGFA0M_X0IuoDwg1Vwqj4DPn-D6RclYA.MFcVjRabQrhw1cIq6v7vtibGCiQaWUpszHB3hwUuGyG9oW_ET4")

        })

        it('should delete blog by Id', async () => {

            const result = await request(app).get('/blogs')
            expect(result.status).toEqual(200)

            const isPostDeleted = await request(app).delete('/blogs/' + result.body.items[0].id)
                .set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                )
            expect(isPostDeleted.status).toBe(204)

            const blogById = await request(app).get('/blogs/' + result.body.items[0].id)
            expect(blogById.status).toBe(404)

        });
    })

    describe("Testing bad CRUD operations on blogs", () => {

        describe("Checking body validation", () => {
            it('should not create blog with incorrect body', async () => {

                let result = await request(app).post('/blogs')
                    .send({
                        name: "",
                        description: "It's my first blog don't judge me a lot",
                        websiteUrl:
                            "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8"
                    })
                    .set(
                        "Authorization",
                        "Basic YWRtaW46cXdlcnR5"
                    )
                    .expect(400)

                expect(result.body).toEqual({
                    "errorsMessages": [{
                        "message": expect.any(String),
                        "field": "name"
                    }]
                })

                result = await request(app).post('/blogs')
                    .send({
                        name: "string",
                        description: "",
                        websiteUrl:
                            "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8"
                    })
                    .set(
                        "Authorization",
                        "Basic YWRtaW46cXdlcnR5"
                    )
                    .expect(400)

                expect(result.body).toEqual({
                    "errorsMessages": [{
                        "message": expect.any(String),
                        "field": "description"
                    }]
                })

                result = await request(app).post('/blogs')
                    .send({
                        name: "string",
                        description: "It's my first blog don't judge me a lot",
                        websiteUrl:
                            ""
                    })
                    .set(
                        "Authorization",
                        "Basic YWRtaW46cXdlcnR5"
                    )
                    .expect(400)

                expect(result.body).toEqual({
                    "errorsMessages": [{
                        "message": expect.any(String),
                        "field": "websiteUrl"
                    }]
                })
            })

            it("should return 400 codes for non-existent blogs and 404 for put query", async () => {

                await request(app).get('/blogs/' + "sfafasfasgfknaw;l").expect(404)

                await request(app).put('/blogs/' + "sfafasfasgfknaw;l").set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).expect(400)

                await request(app).delete('/blogs/' + "sfafasfasgfknaw;l").set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).expect(404)

            })

            it('should return 401 codes for non-auth requests', async () => {

                await request(app).post('/blogs')
                    .send({
                        name: "new blog",
                        description: "It's my first blog don't judge me a lot",
                        websiteUrl:
                            "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8"
                    })
                    .expect(401)

                await request(app).post('/blogs')
                    .send({
                        name: "new blog",
                        description: "It's my first blog don't judge me a lot",
                        websiteUrl:
                            "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8"
                    })
                    .set(
                        "Authorization",
                        "Basic YWRtaW46cXdlcnR5"
                    )
                    .expect(201)



                const result = await request(app).get('/blogs')
                expect(result.status).toEqual(200)

                const blog = await request(app).get('/blogs/' + result.body.items[0].id)
                expect(blog.body).toEqual(result.body.items[0])

                await request(app).put('/blogs/' + blog.body.id).set({
                    name: "New Name",
                    description: "New Description",
                    websiteUrl: "https://5XTbP0GoJAGFA0M_X0IuoDwg1Vwqj4DPn-D6RclYA.MFcVjRabQrhw1cIq6v7vtibGCiQaWUpszHB3hwUuGyG9oW_ET4"
                }).expect(401)

                await request(app).delete('/blogs/' + result.body.items[0].id).expect(401)

            });

        })


    })
})

describe("Posts", () => {

    describe("Testing good CRUD Operations on posts", () => {

        beforeAll(async () => {
            await request(app).delete('/testing/all-data')
        })

        it("should not get all posts cause /testing/all-data and there no posts", async () => {
            await request(app).get('/posts').expect(404)
        })

        it("should create blog and then create post for blog by blog Id in body and in params from query",
            async () => {

                const blog = await request(app).post('/blogs').send({
                    name: "string",
                    description: "string",
                    websiteUrl: "https://_xZJtiwiHdtYnwp.xbcUd8i.ok4Rykgg2GAjjiFacZtuGCDB8FDwVs.2o2a-ZridI0a-xrbW6BsqC_EaCcSwjZXqzdqP"
                }).set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).expect(201)

                const post = await request(app).post('/posts').send({
                    title: "string",
                    shortDescription: "string",
                    content: "string",
                    blogId: blog.body.id
                }).set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).expect(201)

                expect(post.body).toStrictEqual(
                    {
                        id: expect.any(String),
                        title: "string",
                        shortDescription: "string",
                        content: "string",
                        blogName: blog.body.name,
                        blogId: blog.body.id,
                        createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/),
                       extendedLikesInfo:{
                         dislikesCount: 0,
                             likesCount: 0,
                             myStatus: "None",
                             newestLikes: [],
                           },
                    }
                )

                const postFromBlogId = await request(app).post('/blogs/' + blog.body.id + '/posts')
                    .send({
                        title: "string",
                        shortDescription: "It was created from Id in URI params",
                        content: "string",
                    }).set(
                        "Authorization",
                        "Basic YWRtaW46cXdlcnR5"
                    ).expect(201)

                expect(postFromBlogId.body).toStrictEqual(
                    {
                        id: expect.any(String),
                        title: "string",
                        shortDescription: "It was created from Id in URI params",
                        content: "string",
                        blogName: blog.body.name,
                        blogId: blog.body.id,
                        createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/),
                        extendedLikesInfo:{
                            dislikesCount: 0,
                            likesCount: 0,
                            myStatus: "None",
                            newestLikes: [],
                        },
                    }
                )

            })

        it("should get One post by Id", async () => {

            const posts = await request(app).get('/posts').expect(200)

            const post = await request(app).get('/posts/' + posts.body.items[0].id).expect(200)
            expect(post.body).toStrictEqual(posts.body.items[0])

        })

        it('should update One post', async () => {

            const posts = await request(app).get('/posts').expect(200)

            await request(app).put('/posts/' + posts.body.items[0].id)
                .send({
                    title: "It's was updated",
                    shortDescription: "It's was updated",
                    content: "It's was updated",
                    blogId: posts.body.items[0].blogId
                }).set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).expect(204)

            const updatedPosts = await request(app).get('/posts').expect(200)
            expect(updatedPosts.body.items[0]).toStrictEqual({

                    id: expect.any(String),
                    title: "It's was updated",
                    shortDescription: "It's was updated",
                    content: "It's was updated",
                    blogName: posts.body.items[0].blogName,
                    blogId: posts.body.items[0].blogId,
                    createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/),
                    extendedLikesInfo:{
                        dislikesCount: 0,
                        likesCount: 0,
                        myStatus: "None",
                        newestLikes: [],

                },
            })

        });

        it('should delete ONE post by Id', async () => {

            const posts = await request(app).get('/posts').expect(200)

            await request(app).delete('/posts/' + posts.body.items[0].id).set(
                "Authorization",
                "Basic YWRtaW46cXdlcnR5"
            ).expect(204)

            const postsAfterDelete = await request(app).get('/posts').expect(200)

            expect(posts.body.items.length).not.toEqual(postsAfterDelete.body.items.length)

        });

    })

    describe("Testing bad CRUD operations on posts", () => {

        describe("Checking body validation", () => {
            it('should not create posts with bad bodies and wrong blog id', async () => {

                const blogs = await request(app).get('/blogs').expect(200)
                let requestWithError

                requestWithError = await request(app).post('/posts').set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).send({
                    title: "",
                    shortDescription: "It's was updated",
                    content: "It's was updated",
                    blogId: blogs.body.items[0].id
                }).expect(400)

                expect(requestWithError.body).toEqual({
                    errorsMessages: [{
                        message: expect.any(String),
                        field: "title"
                    }]
                })

                requestWithError = await request(app).post('/posts').set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).send({
                    title: "string",
                    shortDescription: "",
                    content: "It's was updated",
                    blogId: blogs.body.items[0].id
                }).expect(400)

                expect(requestWithError.body).toEqual({
                    errorsMessages: [{
                        message: expect.any(String),
                        field: "shortDescription"
                    }]
                })

                requestWithError = await request(app).post('/posts').set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).send({
                    title: "string",
                    shortDescription: "string",
                    content: "",
                    blogId: blogs.body.items[0].id
                }).expect(400)

                expect(requestWithError.body).toEqual({
                    errorsMessages: [{
                        message: expect.any(String),
                        field: "content"
                    }]
                })

                requestWithError = await request(app).post('/posts').set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).send({
                    title: "string",
                    shortDescription: "string",
                    content: "string",
                    blogId: "blogs.body.items[0].id"
                }).expect(400)

                expect(requestWithError.body).toEqual({
                    errorsMessages: [{
                        message: expect.any(String),
                        field: "blogId"
                    }]
                })
            });
        })

        describe("Testing operations with non-existing posts", () => {

            it('should return 404 codes for non-existing posts and 400 for put query', async () => {

                await request(app).get('/posts/' + 'salkfbnakslbf').expect(404)

                await request(app).put('/posts/' + 'sfafsafweagasga').set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).expect(400)

                await request(app).delete('/posts/' + 'sfagfwagasdgaw').set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                ).expect(404)

            });

        })

        describe("Testing unAuthorized operations", ()=>{

            it("should give 401 statuses for CUD operations", async () => {

                const posts = await request(app).get('/posts').expect(200)

                await request(app).post('/posts').expect(401)

                await request(app).put('/posts/' + posts.body.items[0].id).expect(401)

                await request(app).delete('/posts/' + posts.body.items[0].id).expect(401)

            })

        })


    })

})

describe("Users", () => {

    describe("Testing good CRD on users", () => {

        beforeAll(async () => {
            await request(app).delete('/testing/all-data')
        })

        it('should get all users', async () => {

            const result = await request(app).get('/users').set(
                    "Authorization",
                    "Basic YWRtaW46cXdlcnR5"
                )
                    .expect(200)

            expect(result.body.items).toEqual([])

        });

        it('should create a new user by Admin (without email confirmation)', async () => {

            const result = await request(app).post('/users').set(
                "Authorization",
                "Basic YWRtaW46cXdlcnR5"
            )
                .send({
                    login: "Nick",
                    email: "abdulallah228322@gmail.com",
                    password: "1234567"
                }).expect(201)

            expect(result.body).toStrictEqual({
                    id: expect.any(String),
                    login: "Nick",
                    email: "abdulallah228322@gmail.com",
                    createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
                })

        });

        it('should delete one user by Id', async () => {

            const users = await request(app).get('/users').set(
                "Authorization",
                "Basic YWRtaW46cXdlcnR5"
            ).expect(200)

            await request(app).delete('/users/' + users.body.items[0].id).set(
                "Authorization",
                "Basic YWRtaW46cXdlcnR5"
            ).expect(204)

            const usersAfterDeleting = await request(app).get('/users').set(
                "Authorization",
                "Basic YWRtaW46cXdlcnR5"
            ).expect(200)

            expect(usersAfterDeleting.body.items).toEqual([])

        });

    })

    describe("Testing bad CRD on users", () => {

        it('should not create user with bad body', async () => {

            let badUser

            badUser = await request(app).post('/users').set(
                "Authorization",
                "Basic YWRtaW46cXdlcnR5"
            ).send({
                login: "",
                email: "abdulallah228322@gmail.com",
                password: "1234567"
            }).expect(400)

            expect(badUser.body).toStrictEqual({
                errorsMessages: [{
                    message: expect.any(String),
                    field: "login"
                }]
            })

            badUser = await request(app).post('/users').set(
                "Authorization",
                "Basic YWRtaW46cXdlcnR5"
            ).send({
                login: "Nick",
                email: "gmail.com",
                password: "1234567"
            }).expect(400)

            expect(badUser.body).toStrictEqual({
                errorsMessages: [{
                    message: expect.any(String),
                    field: "email"
                }]
            })

            badUser = await request(app).post('/users').set(
                "Authorization",
                "Basic YWRtaW46cXdlcnR5"
            ).send({
                login: "Nick",
                email: "abdulallah228322@gmail.com",
                password: "123"
            }).expect(400)

            expect(badUser.body).toStrictEqual({
                errorsMessages: [{
                    message: expect.any(String),
                    field: "password"
                }]
            })

        });

        it('should get 401', async () => {

            await request(app).get('/users').expect(401)

            await request(app).post('/users').expect(401)

            await request(app).delete('/users/' + "asfnanlfksalnkfs").expect(401)

        });

    })

})

// describe("Testing CRUD on blogs", () => {
//
//     beforeAll(async () => {
//         await request(app).delete('/testing/all-data')
//     })
//
//     it("should return 404 if it's empty", async () => {
//         await request(app)
//             .get('/blogs')
//                 .expect(404)
//     })
//
//     it('should return 404 for not existing blog', async () => {
//         await request(app).get('/blogs/safsafsafsafsaf')
//             .expect(404)
//     })
//
//     it('should create a blog with correct input data', async () => {
//        const result = await request(app).post('/blogs')
//             .send({
//                 name: "new blog",
//                 description: "It's my first blog don't judge me a lot",
//                 websiteUrl:
//                     "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8"
//             })
//             .set(
//                 "Authorization",
//                 "Basic YWRtaW46cXdlcnR5"
//             ).expect(201)
//
//         expect(result.body).toEqual({
//             id: expect.any(String),
//             name: "new blog",
//             description: "It's my first blog don't judge me a lot",
//             websiteUrl:
//                 "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8",
//             isMembership: false,
//             createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
//         })
//
//         const createdBlog = await request(app).get('/blogs').expect(200)
//         expect(createdBlog.body.items[0]).toEqual({
//             id: expect.any(String),
//             name: "new blog",
//             description: "It's my first blog don't judge me a lot",
//             websiteUrl:
//                 "https://Jm.UVdmJfQbX5mZiymZIvqF3mtYwsPLPrjJy9dvja-bG8171dEOojVARhV0eV8GGSpjS30Nd_9wY2L-Azq.BsIUOzRX8",
//             isMembership: false,
//             createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
//         })
//     })
//
// })
//
// describe("Testing Create operations with incorrect data",   ()=> {
//
//     it("shouldn't create blog with incorrect data",  async () => {
//         await request(app).post('/blogs').send({
//             name: ""
//         }).set(
//             "Authorization",
//             "Basic YWRtaW46cXdlcnR5"
//         ).expect(400)
//     })
//
//     it("shouldn't create post with incorrect data",  async () => {
//         await request(app).post('/posts').send({
//             title: ""
//         }).set(
//             "Authorization",
//             "Basic YWRtaW46cXdlcnR5"
//         ).expect(400)
//     })
//
//     it("shouldn't create comment with incorrect data",  async () => {
//         await request(app).post('/comments').send({
//             content: ""
//         }).set(
//             "Authorization",
//             "Basic YWRtaW46cXdlcnR5"
//         ).expect(400)
//     })
//
//     it("shouldn't create user with incorrect data",  async () => {
//         await request(app).post('/users').send({
//             login: ""
//         }).set(
//             "Authorization",
//             "Basic YWRtaW46cXdlcnR5"
//         ).expect(400)
//     })
//
// })
//
// describe("Testing Auth", ()=> {
//     it("shouldn't auth user with incorrect login or email ", async () => {
//
//     });
// })
//
// describe("Testing login with zalupa", ()=> {
//     it("should create user with correct data",  async () => {
//         await request(app).post('/security/devices').send({
//             login: "Poziloy_Chert",
//             email: "XXX@mail.ru",
//             password: "123456789"
//         }).set(
//             "Authorization",
//             "Basic YWRtaW46cXdlcnR5"
//         ).expect(201)
//     })
// })