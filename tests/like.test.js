
const request = require("supertest");


const { createApp } = require("../app");
const appDataSource = require("../models/dataSource");


describe("Posting like", () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize()
    })

    afterAll(async () => {
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`)
        await appDataSource.query(`TRUNCATE users`);
        await appDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`)
        await appDataSource.destroy();
    })

    test("SUCCESS: Created like", async () => {
        await request(app)
        .post("/like")
        .set({ authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NjUzOTIwMzF9.iRHwAVuNnhHZ7HLnkx8GY4WaqbCRLMGSNMuPFCQRcVI" })
        .send({ userId : 1, postId : 1 })
        .expect(201);
    });

    test("FAILED: Wrong Like Key", async()  => {
        await request(app)
        .post("/like")
        .set({ authorization: "DONT TOKEN" })
        .send({ postId :"aa" })
        .expect(400)
        .expect({ message: "INVALID_TOKEN"})
    });

    test("SUCCESS: Delete like", async () => {
        await request(app)
        .delete("/like")
        .set({ authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NjUzOTIwMzF9.iRHwAVuNnhHZ7HLnkx8GY4WaqbCRLMGSNMuPFCQRcVI" })
        .send({ userId : 1, postId : 1 })
        .expect(204);
    });

    test("FAILED: INVALID_TOKEN", async()  => {
        await request(app)
        .delete("/like")
        .set({ authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NjUzOTIwMzF9.iRHwAVuNnhHZ7HLnkx8GY4WaqbCRLMGSNMuPFCQRcVI" })
        .send({ postId :"DONT TOKEN" })
        .expect(400)
        .expect({ message: "INVALID_TOKEN"})
    });
})


