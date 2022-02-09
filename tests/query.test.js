import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import { userData, validUser, postData, invalidUser, queryData, forupdateUser, EmptyQueryData, invalidPassword } from "./dummyData.js";
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

    // check existing user
    it("It should not register the user", (done) => {
        chai
            .request(app)
            .post("/api/v1/user/register")
            .send(userData)
            .end((err, res) => {
                expect(res).to.have.status([409]);
                expect(res).to.have.property("status");

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

    //checking mismatch password
    it("It should not loggin the user with wrong password", (done) => {
        chai
            .request(app)
            .post("/api/v1/user/login")
            .send(invalidPassword)
            .end((err, res) => {
                expect(res).status([403]);
                expect(res.body).to.have.property("message");

                done();
            });
    });
    //end
    let queryId = ""
    it("While logged in Should retrieve the queries", (done) => {
        chai
            .request(app)
            .get("/api/v1/queries/")
            .set("Authorization", `Bearer ${token}`)
            .send()
            .end((err, res) => {
                queryId = res.body.data[0]._id
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



    // SHOULD NOT ADD QUERIES
    it("should add query", (done) => {
        chai
            .request(app)
            .post("/api/v1/queries")
            .send(EmptyQueryData)
            .end((req, res) => {

                expect(res.body).to.have.property("error");
                expect(res.body).to.have.property("message");
                expect(res.body).to.be.a("object");
                done();
            });
    });
    // should delete query
    it("should  delete query with given id while login", (done) => {
        chai
            .request(app)
            .delete(`/api/v1/queries/${queryId}`)
            .set("Authorization", `Bearer ${token}`)
            .send()
            .end((req, res) => {
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("status");
                expect(res.body).to.be.a("object");
                done();
            });
    });

    it("should not delete query with given id without login", (done) => {
        chai
            .request(app)
            .delete(`/api/v1/queries/${queryId}`)
            .send()
            .end((req, res) => {
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("status");
                expect(res.body).to.be.a("object");
                done();
            });
    });
    //should not delete query

    it("should delete query with given invali id", (done) => {
        chai
            .request(app)
            .delete(`/api/v1/queries/jata5646677`)
            .send()
            .end((req, res) => {
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.status([401]);
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
            .set('Content-Type', 'multipart/form-data')
            .field({ title: 'postt1', content: 'hello', author: 'dave' })
            .end((req, res) => {
                articleId = res.body.data._id;
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("data");
                expect(res.body).to.be.a("object");
                done();
            });
    });

    //should not add article due to invalid data

    it("should not add article due to invalid data", (done) => {

        chai
            .request(app)
            .post("/api/v1/articles")
            .set("Authorization", `Bearer ${token}`)
            .set('Content-Type', 'multipart/form-data')
            .field({ title: 'postt1', author: 'dave' })
            .attach('image', 'gantt.jpg')
            .end((req, res) => {
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("error");
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

    // SHOULD NOT ADD POST DUE TO WRONG IMAGE FILE
    it("should not upload wrong image file", (done) => {

        chai
            .request(app)
            .post("/api/v1/articles")
            .set("Authorization", `Bearer ${token}`)
            .set('Content-Type', 'multipart/form-data')
            .field({ title: 'postt1', content: 'hello', author: 'dave' })
            .attach('image', 'README.md')
            .end((req, res) => {
                expect(res).to.have.status([500]);
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
    it("should not get one users", (done) => {
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

    // SHOULD DELETE ON USER WITH GIVEN ID

    it("should delete users with given id", (done) => {
        chai
            .request(app)
            .delete(`/api/v1/user/${userId}`)
            .set("Authorization", `Bearer ${token}`)
            .send()
            .end((req, res) => {
                expect(res).to.have.status([200]);
                expect(res.body).to.have.property("status");
                expect(res.body).to.have.property("message");
                done();
            });
    });



    // SHOULD NOT DELETE USER WITH GIVEN ID

    it("should not delete users with given id", (done) => {
        chai
            .request(app)
            .delete(`/api/v1/user/${userId}`)
            .send()
            .end((req, res) => {
                expect(res).to.have.status([401]);
                expect(res.body).to.have.property("message");
                done();
            });
    });

    it("should not delete users with given id", (done) => {
        chai
            .request(app)
            .delete(`/api/v1/user/rf45fffffaaa`)
            .set("Authorization", `Bearer ${token}`)
            .send()
            .end((req, res) => {
                expect(res).to.have.status([404]);
                expect(res.body).to.have.property("error");
                done();
            });
    });

    //SHOULD RETRIEVE THE COMMENT BY ARTICLE ID
    it("Should  update article ", (done) => {
        chai
            .request(app)
            .patch(`/api/v1/articles/${articleId}`)
            .set("Authorization", `Bearer ${token}`)
            .set('Content-Type', 'multipart/form-data')
            .field({ title: 'updated post 200', content: 'hello updates', author: 'davido' })

        .end((err, res) => {

            expect(res).to.have.status([200]);
            expect(res).to.have.property("status");
            expect(res.body).to.have.property("message");
            expect(res.body).to.have.property("data");
            done();
        });
    });
});