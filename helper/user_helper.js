import { faker } from '@faker-js/faker';
import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/");

const TOKEN =
  "0ac57a061a9702505101994e17c06d7751a043cab1b1de7f8668e99f1608709e";
export const createRandomUser = async () =>{
    let postId, userId;
    const userData = {
        email: `testtest-${Math.floor(Math.random() * 9999)}@example.om`,
        name: "test",
        gender: "female",
        status: "active",
      };
    const res = await request
      .post("users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(userData)
      return userId = res.body.id;
}

export const createRandomUserWithFaker = async () =>{
  let postId, userId;
  const userData = {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      gender: "female",
      status: "active",
    };
  const res = await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userData)
    console.log(userData)
    return userId = res.body.id;
}