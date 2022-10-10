
const request = require("supertest");
const { InsertValuesMissingError } = require("typeorm");

const { createApp } = require("../app");
const appDataSource = require("../models/dataSource");


describe("Posting Comment", () => {
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

    test("SUCCESS: Created Comment", async () => {
        await request(app)
        .post("/comment")
        .send({ userId : 1, postId : 1, comment:"crush hour"})
        .expect(201);
    });

    test("FAILED: Wrong Comment Key", async()  => {
        await request(app)
        .post("/comment")
        .send({ postId :"aa", comment:123 })
        .expect(400)
        .expect({ message: "Wrong Comment Key"})
    });


})


