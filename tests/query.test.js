import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import { userData, validUser, postData, invalidUser, queryData, forupdateUser, updatedArticleInfo } from "./dummyData.js";
import User from "./../src/models/user.js";

chai.use(chaiHttp);
describe("QUERY END-POINT TESTING", () => {
    before(async() => {
        await User.deleteOne({ email: userData.email });
    });

    it("It should register the user", (done) => {
        chai
            .request(app)
            .post("/api/v1/user/register")
            .send(userData)
            .end((err, res) => {
                expect(res).to.have.status([201]);
                done();
            });
    });

    let token = "";
    it("It should loggin the user", (done) => {
        chai
            .request(app)
            .post("/api/v1/user/login")
            .send(validUser)
            .end((err, res) => {
                token = res.body.accessToken;
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("accessToken");
                done();
            });
    });

    //should not log the user in

    it("It should not loggin the user", (done) => {
        chai
            .request(app)
            .post("/api/v1/user/login")
            .send(invalidUser)
            .end((err, res) => {
                expect(res).status([403]);
                expect(res.body).to.have.property("message");

                done();
            });
    });

    it("While logged in Should retrieve the queries", (done) => {
        chai
            .request(app)
            .get("/api/v1/queries/")
            .set("Authorization", `Bearer ${token}`)
            .send()
            .end((err, res) => {
                expect(res).to.have.property("status");
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("data");
                done();
            });
    });

    it("while not logged in, should not retrieve the queries", (done) => {
        chai
            .request(app)
            .get("/api/v1/queries/")
            .send()
            .end((err, res) => {
                expect(res).to.have.status([401]);
                expect(res.body).to.have.property("message");

                done();
            });
    });

    it("Should not retrieve the queries", (done) => {
        chai
            .request(app)
            .get("/api/v1/qeury/")
            .send()
            .end((err, res) => {
                expect(res).to.have.status([404]);
                done();
            });
    });
    // should add queries
    it("should add query", (done) => {
        chai
            .request(app)
            .post("/api/v1/queries")
            .send(queryData)
            .end((req, res) => {

                expect(res).to.have.status([200]);
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("data");
                expect(res.body).to.be.a("object");
                done();
            });
    });
    //adding articles while logged in
    let articleId = "";
    it("should add article while logged in", (done) => {

        chai
            .request(app)
            .post("/api/v1/articles")
            .set("Authorization", `Bearer ${token}`)
            .send(postData)
            .end((req, res) => {
                articleId = res.body.data._id;
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("data");
                expect(res.body).to.be.a("object");
                done();
            });
    });

    //should not add article without login

    it("should not add article while logged out", (done) => {
        chai
            .request(app)
            .post("/api/v1/articles")
            .send(postData)
            .end((req, res) => {
                expect(res).to.have.status([401]);
                expect(res.body).to.have.property("message");
                expect(res.body).to.be.a("object");
                done();
            });
    });


    //should get users
    let userId = ''
    it("should get all users", (done) => {
        chai
            .request(app)
            .get("/api/v1/user/")
            .set("Authorization", `Bearer ${token}`)
            .send()
            .end((req, res) => {
                userId = res.body.data[0]._id
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property("message");
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("data");
                done();
            });
    });
    //should update user


    it("should update user with given id", (done) => {
        chai
            .request(app)
            .patch(`/api/v1/user/${userId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(forupdateUser)
            .end((req, res) => {

                expect(res).to.have.status([200]);
                expect(res.body).to.have.property("message");
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("data");
                done();
            });
    });

    //should not get all users

    it("should not get all users", (done) => {
        chai
            .request(app)
            .get("/api/v1/users/")
            .set("Authorization", `Bearer ${token}`)
            .send()
            .end((req, res) => {
                expect(res).to.have.status([404]);

                done();
            });
    });

    // should get user by id
    it("should get one users", (done) => {
        chai
            .request(app)
            .get(`/api/v1/user/${userId}`)
            .set("Authorization", `Bearer ${token}`)
            .send()
            .end((req, res) => {
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property("message");
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("data");
                done();
            });
    });
    //should not get one user

    it("should get one users", (done) => {
        chai
            .request(app)
            .get(`/api/v1/user/${userId}`)
            .send()
            .end((req, res) => {
                expect(res).to.have.status([401]);
                expect(res.body).to.have.property("message");
                done();
            });
    });

    //SHOULD UPDATE ARTICLE
    it("Should  retrieve the comment by article id", (done) => {
        chai
            .request(app)
            .patch(`/api/v1/articles/${articleId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedArticleInfo)
            .end((err, res) => {

                expect(res).to.have.status([200]);
                expect(res).to.have.property("status");
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("data");
                done();
            });
    });
});