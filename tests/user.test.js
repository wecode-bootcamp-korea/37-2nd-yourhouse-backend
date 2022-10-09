const { SocialAuth } = require("../util/socialAuth")
const request = require("supertest");

const { createApp } = require("../app");
const appDataSource = require("../models/dataSource");

jest.mock("../util/socialAuth");

describe("Social Auth", () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize()
    })

    afterAll(async () => {
        await appDataSource.destroy();
    })

    test("SUCCESS: kakao signin", async () => {
        const socialAuth = new SocialAuth(1,1,1);
        const mockToken = jest.fn();
        const kakaoUserInfo = jest.fn();
        SocialAuth.prototype.getKakaoToken = mockToken;
        SocialAuth.prototype.getKaKaoUserInfo = kakaoUserInfo
        
        mockToken.mockReturnValue({
            data: {
                access_token : "dddd"
            }
        })

        kakaoUserInfo.mockReturnValue({
            id: 1122334455,
            kakao_account: {
                email: "gggssdd@kakao.com",
                profile: {
                    nickname: "홍기석",
                    profile_image_url: "image.jpg"
                }
            }
        })

        await request(app)
            .get("/user/auth")
            .set({ Authorization: `Bearer token`, })
            .expect(200);
    })

    test("FAILED: kakaoToken not exist", async () => {

        const socialAuth2 = new SocialAuth(2,2,2);
        const mockToken2 = jest.fn();
        const kakaoUserInfo2 = jest.fn();
        SocialAuth.prototype.getKakaoToken = mockToken2;
        SocialAuth.prototype.getKaKaoUserInfo = kakaoUserInfo2
        
        mockToken2.mockReturnValue({
            data: {
                access_token : "dddd"
            }
        })

        kakaoUserInfo2.mockReturnValue({
            id: 1122334455,
            kakao_account: {
                profile: {
                    nickname: "홍기석",
                    profile_image_url: "image.jpg"
                }
            }
        })

        await request(app)
        .get("/user/auth")
        .set({ Authorization: `Bearer token`, })
        .expect(400)
        .expect({ message: "KEY_ERROR"})
    })
})