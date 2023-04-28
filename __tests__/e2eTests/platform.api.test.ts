import request from "supertest";
import {app} from "../../src";
import mongoose from "mongoose";

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

            it("should return 404 codes for non-existent blogs", async () => {

                await request(app).get('/blogs/' + "sfafasfasgfknaw;l").expect(404)

                await request(app).put('/blogs/').expect(404)

                await request(app).delete('/blogs/').expect(404)

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