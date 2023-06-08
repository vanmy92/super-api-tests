import request from "../config/common.js";
require('dotenv').config()
import dotenv  from "dotenv";
dotenv.config()
import { faker } from '@faker-js/faker';
import { expect } from "chai";
import { createRandomUser, createRandomUserWithFaker } from "../helper/user_helper.js";

const TOKEN =  process.env.USER_TOKEN


describe("user Posts", () => {
  let postId, userId;

  before(async () => {
    // userId = await createRandomUser();
    userId = await createRandomUserWithFaker();

  });
  it("/posts", async () => {
    const data = {
      user_id: userId,
      title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
    };

    const postRes = await request
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);
    // console.log(data)
    console.log(postRes.body);

    expect(postRes.body).to.deep.include(data);
    postId = postRes.body.id;
    console.log(postId);
  });

  it("Get /posts/:id", async () => {
    await request
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`);
    //   .expect(200);
  });

  describe("Negative Tests", () => {
    it("401 Authentication Failed", async () => {
      const data = {
        user_id: userId,
        title: "Utpote creo terga stips decens surgo usus.",
        body: "Bis tergo ea. Sollicito curriculum voluptas. Blandior perferendis urbs. Tyrannus sed succurro. Sunt aestivus animus. Velut amplus cibo. Quidem adhuc pauci. Concedo cum ultio. Damno trado consequatur. Celer crapula thymbra. Thermae cohibeo amo. Audax depulso denuo. Concido vivo patior. Sit auctor alioqui. Carmen aqua aut. Accusamus adhuc adipiscor. Audax paens tabula.",
      };
      const postRes = await request.post("posts").send(data);
      console.log(postRes.body);

      // expect(postRes.body.code).to.eq(401);
      expect(postRes.body.message).to.eq("Authentication failed");
    });

    it("421 Validation Failed", async () => {
      const data = {
        user_id: userId,
        title: "Utpote creo terga stips decens surgo usus.",
      };
      const postRes = await request
        .post("posts")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data);
      console.log(postRes.body);

      expect(postRes.body[0].field).to.eq("body");
    //   expect(postRes.body[1].message).to.eq("can't be blank");

      //   expect(postRes.body.message).to.eq('Authentication failed');
    });
  });
});
