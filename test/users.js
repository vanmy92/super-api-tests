import supertest from "supertest";
import { expect } from "chai";
const request = supertest("https://gorest.co.in/public/v2/");

const TOKEN =
  "0ac57a061a9702505101994e17c06d7751a043cab1b1de7f8668e99f1608709e";
xdescribe("Users", () => {
  it("Get /Users", () => {
    // request.get(
    //   `users?access-token=${TOKEN}`).end((err, res) => {
    //    expect(res.body).to.not.be.empty;
    //    done();
    // });

    return request.get(`users?access-token=${TOKEN}`).then((res) => {
      expect(res.body).to.not.be.empty;
    });
  });

  it("Get /Users/:id", () => {
    return request.get(`users/2625099?access-token=${TOKEN}`).then((res) => {
      expect(res.body.id).to.be.eq(2625099);
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

  it("POST /Users", () => {
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
      });
  });

  it("PUT /Users:id", () => {
    const data = {
        name : `test + ${Math.floor(Math.random()*9999)}`,
        gender : "female",
        status: "active"
    }
    return request
      .put("users/2625469")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        
        expect(res.body).to.deep.include(data);
      });
  }); 

  it("DELETE /Users:id", () => {
   
    return request
      .delete("users/2625869")
      .set("Authorization", `Bearer ${TOKEN}`)
      .then((res) => {
        console.log(res.body);
        
        // expect(res.body).to.be.eq({});
      });
  }); 


});
