const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

const testEmail = "test@hotmail.com"

describe("/POST missing params", () => {
  it("it should return 400", done => {
    chai
      .request(app)
      .post(`/register/`)
      .send({ })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("it should return 400", done => {
    chai
      .request(app)
      .post(`/register/`)
      .send({ email: testEmail})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("it should return 400", done => {
    chai
      .request(app)
      .post(`/register/`)
      .send({ password: "abcdefg" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe("/POST password less than 6 chars", () => {
  it("it should return 400", done => {
    chai
    .request(app)
    .post(`/register/`)
    .send({email: 'test@hotmail.com', password: 'abc' })
    .end((err, res) => {
        res.should.have.status(400);
        done();
    });
  });
});

describe("/POST email is invalid", () => {
  it("it should return 400", done => {
    chai
    .request(app)
    .post(`/register/`)
    .send({email: 'test@', password: 'abcdefg' })
    .end((err, res) => {
        res.should.have.status(400);
        done();
    });
  });
});
