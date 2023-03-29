import request from "supertest";
import {app} from "../../src";
import {client} from "../../src/db/db";

//todo finish this at the end of it all

afterAll(async () => {
    await client.close()
})


describe("Testing CRUD on blogs", () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it("should return 404 if it's empty", async () => {
        await request(app)
            .get('/blogs')
                .expect(404)
    })

    it('should return 404 for not existing blog', async () => {
        await request(app).get('/blogs/safsafsafsafsaf')
            .expect(404)
    })

    it('should create a blog with correct input data', async () => {
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
            ).expect(201)

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

})

describe("Testing Create operations with incorrect data",   ()=> {

    it("shouldn't create blog with incorrect data",  async () => {
        await request(app).post('/blogs').send({
            name: ""
        }).set(
            "Authorization",
            "Basic YWRtaW46cXdlcnR5"
        ).expect(400)
    })

    it("shouldn't create post with incorrect data",  async () => {
        await request(app).post('/posts').send({
            title: ""
        }).set(
            "Authorization",
            "Basic YWRtaW46cXdlcnR5"
        ).expect(400)
    })

    it("shouldn't create comment with incorrect data",  async () => {
        await request(app).post('/comments').send({
            content: ""
        }).set(
            "Authorization",
            "Basic YWRtaW46cXdlcnR5"
        ).expect(400)
    })

    it("shouldn't create user with incorrect data",  async () => {
        await request(app).post('/users').send({
            login: ""
        }).set(
            "Authorization",
            "Basic YWRtaW46cXdlcnR5"
        ).expect(400)
    })

})

describe("Testing Auth", ()=> {
    it("shouldn't auth user with incorrect login or email ", async () => {
        
    });
})

describe("Testing login with zalupa", ()=> {
    it("should create user with correct data",  async () => {
        await request(app).post('/security/devices').send({
            login: "Poziloy_Chert",
            email: "XXX@mail.ru",
            password: "123456789"
        }).set(
            "Authorization",
            "Basic YWRtaW46cXdlcnR5"
        ).expect(201)
    })
})