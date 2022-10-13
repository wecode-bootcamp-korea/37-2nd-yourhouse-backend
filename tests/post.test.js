
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

    test("SUCCESS: Get Post", async () => {
        await request(app)
        .get("/post")
        .send({ sort : 'current', color :1 , roomsize : 1, residence : 1, style : 1, space : 1, limit : 10, offset : 1 })
        .expect(200);
    });

    test("FAILED: Wrong Post Key", async()  => {
        await request(app)
        .post("/post")
        .send({ limit : 10 })
        .expect(400)
        .expect({ message: "Wrong post Key"})
    });

    test("SUCCESS: Created Follow", async () => {
        await request(app)
        .post("/post/follow")
        .send({ followerId : 1, writerId : 2 })
        .expect(201);
    });

    test("FAILED: Created Follow Key", async()  => {
        await request(app)
        .post("/post/follow")
        .send({ postId :"aa" })
        .expect(400)
        .expect({ message: "Wrong follow Key"})
    });

    test("SUCCESS: Deleted follow", async () => {
        await request(app)
        .delete("/post/follow")
        .send({ userId : 1 })
        .expect(204);
    });

    test("FAILED: Wrong Follow Key", async()  => {
        await request(app)
        .delete("/post/follow")
        .send({ userId : "aaa" })
        .expect(400)
        .expect({ message: "Wrong Follow Key"})
    });

    test("SUCCESS: Get follows", async () => {
        await request(app)
        .get("/post/follow")
        .send({ userId : 1, limit : 10, offwer :1})
        .expect(200);
    });

    test("FAILED: Wrong Follow Key", async()  => {
        await request(app)
        .get("/post/follow")
        .send({ userId : "aaa" })
        .expect(400)
        .expect({ message: "Wrong Follow Key"})
    });

})


