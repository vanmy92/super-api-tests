import  qa  from "./qa.js"
import supertest from "supertest";
const request = supertest(qa.baseUrl)
export default request