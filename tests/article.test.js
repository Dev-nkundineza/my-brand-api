import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app.js'
import 'dotenv/config';

chai.use(chaiHttp)
describe("ARTICLE END-POINT TESTING", () => {
    it("Should retrieve the articles",(done) => {
        chai.request(app).get("/api/v1/articles/")
        .send()
        .end((err,res)=>{
            expect(res).to.have.property("status")
            expect(res.body).to.have.property("message")
            expect(res.body).to.have.property("data")
    
            // console.log(res.status)
            // res.should.have.status(200)
        //   res.type.should.have.equal("application/json")
          done()

        })
        
    })
    // it("Should not retrieve the articles", async () => {
    //     const res = await request(app).get("/api/v1/aritcle/")
    //     expect(res).to.have.status([404])
    // })
})