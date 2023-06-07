import supertest from "supertest";
import { expect } from "chai";
const request = supertest("https://gorest.co.in/public/v2/");

const TOKEN =
  "0ac57a061a9702505101994e17c06d7751a043cab1b1de7f8668e99f1608709e";
describe("Users", () => {
  let userId;

  describe("POST", () => {
    it("/Users", () => {
      const data = {
          email : `testtest-${Math.floor(Math.random()*9999)}@example.om`,
          name : "test",
          gender : "female",
          status: "active"
      }
      return request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          // console.log(res.body);
  
          expect(res.body).to.deep.include(data);
          userId =res.body.id
          console.log(userId)
        });
    });
  });



  describe("GET", () => {
    it("Get /Users", () => {
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body).to.not.be.empty;
      });
    });
  
    it("Get /Users/:id", () => {
      return request.get(`users/${userId}?access-token=${TOKEN}`).then((res) => {
        expect(res.body.id).to.be.eq(userId);
      });
    });
    it("Get with query params", () => {
      const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
  
      return request.get(url).then((res) => {
        expect(res.body).to.not.be.empty;
        res.body.forEach((data) => {
          expect(data.gender).to.eq("female");
          expect(data.status).to.eq("active");
        });
      });
    });
  });
  


  describe("PUT", () => {
    it("/Users:id", () => {
      const data = {
          name : `test + ${Math.floor(Math.random()*9999)}`,
          gender : "female",
          status: "active"
      }
      return request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          console.log(res.body);
          
          expect(res.body).to.deep.include(data);
        });
    }); 
  });

  
  describe("DELETE", () => {
    it("/Users:id", () => {
   
      return request
        .delete(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          console.log(res.body);
          
          // expect(res.body).to.be.eq({});
        });
    }); 
  });

  

  

  


});
