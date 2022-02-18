import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app.js'
import 'dotenv/config';


chai.use(chaiHttp)
describe("COMMENT END-POINT TESTING", () => {

    // creating a comment

    // it("Should create the comment", (done) => {
    //     chai.request(app).post("/api/v1/comment/" + articleId)
    //         .send()
    //         .end((err, res) => {
    //             expect(res).to.have.status([200])
    //             expect(res.body).to.have.property("message")
    //             expect(res.body).to.have.property("data")
    //             done();
    //         });

    // });


    // //retrieve comment

    // it("Should retrieve the comments", (done) => {
    //     chai.request(app).get("/api/v1/comment/" + articleId)
    //         .send()
    //         .end((err, res) => {
    //             expect(res).to.have.status([200])
    //             expect(res.body).to.have.property("message")
    //             expect(res.body).to.have.property("data")
    //             done();
    //         });

    // });

    // it("Should not retrieve the comments", (done) => {
    //     chai.request(app).get("/api/v1/commentss/")
    //         .send()
    //         .end((err, res) => {
    //             expect(res).to.have.status([404])
    //             done()
    //         })
    // })
})