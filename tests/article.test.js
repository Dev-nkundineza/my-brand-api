import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import { addcomment } from "./dummyData.js";

chai.use(chaiHttp);
describe("ARTICLE END-POINT TESTING", () => {
    let articleId = "";
    it("Should retrieve the articles", (done) => {
        chai
            .request(app)
            .get("/api/v1/articles/")
            .send()
            .end((err, res) => {
                articleId = res.body.data[0]._id;
                expect(res).to.have.property("status");
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("data");
                done();
            });
    });
    it("Should not retrieve the articles", (done) => {
        chai
            .request(app)
            .get("/api/v1/aritcle/")
            .send()
            .end((err, res) => {
                expect(res).to.have.status([404]);
                done();
            });
    });

    it("Should  retrieve the article by id", (done) => {
        chai
            .request(app)
            .get(`/api/v1/articles/${articleId}`)
            .send()
            .end((err, res) => {
                expect(res).to.have.status([200]);
                expect(res).to.have.property("status");
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("data");
                done();
            });
    });

    //NOT RETRIEVING ARTICLE BY ID
    it("Should  not retrieve the article by id", (done) => {
        chai
            .request(app)
            .get(`/api/v1/article/${articleId}`)
            .send()
            .end((err, res) => {
                expect(res).to.have.status([404]);
                done();
            });
    });

    // SHOULD ADD COMMENT
    it("Should create the comment", (done) => {
        chai
            .request(app)
            .post(`/api/v1/comment/${articleId}`)
            .send(addcomment)
            .end((err, res) => {
                expect(res).to.have.status([201]);
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("comment");
                done();
            });
    });

    // SHOULD NOT ADD COMMENT


    it("Should not create the comment", (done) => {
        chai
            .request(app)
            .post(`/api/v1/comment/`)
            .send(addcomment)
            .end((err, res) => {
                expect(res).to.have.status([404]);
                done();
            });
    });


    // DELETE AN ARTICLE
    it("Should  not delete the article by id", (done) => {
        chai
            .request(app)
            .delete(`/api/v1/articles/${articleId}`)
            .send()
            .end((err, res) => {
                expect(res).to.have.status([401]);
                done();
            });
    });


});