 const request = require("supertest");
 const app = require("../routes/test.route");
 const baseUrl = "192.168.1.212:8000/test"
const {describe, it} = require("@jest/globals")
// let server;
// describe('Space test suite', () => {
//     it('My Space Test', () => {
//         expect(true).toEqual(true);
//     });
// });

// describe('Test get api response', ()=>{
//     it('My test', async() => {
//         const response = await request(app).get('/');
//         console.log(response);
//         expect(response.body).toEqual(["Mars", "Moon", "Earth", "Mercury", "Venus", "Jupiter"]);
//         expect(response.body).toHaveLength(6);
//         expect(response.statusCode).toBe(200);
//         //expect(response.body).toEqual(expect.arrayContaining(['Earth']));
//     })
// })

describe('/test', ()=>{
    // beforeAll(async (done) => {
    //     server = app.listen(null, () => {
    //       global.agent = request.agent(server);
    //       done();
    //     });
    // });
    it("return 400", async()=>{
        const response = await request(baseUrl).get('/test/');
        console.log(response.status);
        console.log(response.body);
        expect(response.status).toBe(200);
    })
})

const menuController = require("../controller/menu.controller");

test("test data",()=>{
    expect(menuController.match()).toEqual({success: true,
        statusCode: 200,
        body: {
            name: "Anik"
        }});
});

test("Deta ", ()=>{
    expect(menuController.matches()).toBeNull();
});