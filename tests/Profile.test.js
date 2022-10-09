const request = require("supertest");

const { createApp } = require("../app");
const appDataSource = require("../models/dataSource");

describe("Social Auth", () => {
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

    test("SUCCESS: My Profile Data", async() => {
        await request(app)
            .get("/profile")
            .set({ authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NjUzOTIwMzF9.iRHwAVuNnhHZ7HLnkx8GY4WaqbCRLMGSNMuPFCQRcVI" })
            .expect(200);
    })

    test("SUCCESS: GET MY POSTS", async() => {
        await request(app)
            .get("/profile/post")
            .set({ authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NjUzOTIwMzF9.iRHwAVuNnhHZ7HLnkx8GY4WaqbCRLMGSNMuPFCQRcVI" })
            .expect(200);
    })

    test("SUCCESS: GET LIKES POSTS", async() => {
        await request(app)
            .get("/profile/like")
            .set({ authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NjUzOTIwMzF9.iRHwAVuNnhHZ7HLnkx8GY4WaqbCRLMGSNMuPFCQRcVI" })
            .expect(200);
    })

    test("FAILED: INVALID_TOKEN", async() => {
        await request(app)
            .get("/profile")
            .set({ authorization: "DONT TOKEN"})
            .expect(400)
            .expect({ message: "INVALID_TOKEN"})
    })
})