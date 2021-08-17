'use strict';
require("dotenv").config();

process.env.SECRET = "toes";

const supertest = require('supertest');
const server = require('../src/server').server;
const { db } = require('../src/models');

const mockRequest = supertest(server);

let users = {
  admin: { username: 'admin', password: 'password', role:'admin' },
  // editor: { username: 'editor', password: 'password', role:'admin' },
  // user: { username: 'user', password: 'password' },
};

beforeAll(async (done) => {
  await db.sync();
  done();
});
afterAll(async (done) => {
  await db.drop();
  done();
});


describe('Auth Router', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      it('can create one', async (done) => {

        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;

        expect(response.status).toBe(201);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
        done();
      });

      it('can signin with basic - admin role', async (done) => {

        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username)
        done();
      });

      it('can signin with bearer - admin role', async (done) => {

        // First, use basic to login to get a token
        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);

        const token = response.body.token;

        // First, use basic to login to get a token
        const bearerResponse = await mockRequest
          .get('/users')
          .set('Authorization', `Bearer ${token}`)

        // Not checking the value of the response, only that we "got in"
        expect(bearerResponse.status).toBe(200);
        done();
      });

    });

    it('post data from /api/v1/:model ', async () => {
      let obj = {
        
            name:'Rami',
            color:'blu',
            size: "xl"
        
      }
        const response = await mockRequest.post('/api/v1/clothes').send(obj); // async
        expect(response.status).toEqual(201);
        expect(typeof response.body).toEqual('object'); // superagent is behind this 
    });

    it('gets data from /api/v1/:model ', async () => {
      // let obj = {
        
      //       name:'Rami',
      //       color:'blu',
      //       size: "xl"
        
      // }
        const response = await mockRequest.get('/api/v1/clothes') // async
        expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object'); // superagent is behind this 
    });

    it('gets data from /api/v1/:model/:id ', async () => {
      let obj = {
        
            name:'Rami',
            color:'blu',
            size: "xl"
        
      }
        await mockRequest.post('/api/v1/clothes').send(obj);
        const response = await mockRequest.get('/api/v1/clothes/1') // async
        expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object'); // superagent is behind this 
    });

    it('updates data from /api/v1/:model/:id ', async () => {
      let obj = {
        
            name:'Rami',
            color:'blu',
            size: "xl"
        
      }
        // await mockRequest.post('/api/v1/clothes').send(obj);
        const response = await mockRequest.put('/api/v1/clothes/1').send(obj) // async
        expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object'); // superagent is behind this 
    });


    it('deletes data from /api/v1/:model/:id ', async () => {
      // let obj = {
        
      //       name:'Rami',
      //       color:'blu',
      //       size: "xl"
        
      // }
      //   await mockRequest.post('/api/v1/clothes').send(obj);
        const response = await mockRequest.delete('/api/v1/clothes/1') 
         await mockRequest.delete('/api/v1/clothes/2') 

        const responseGet = await mockRequest.get('/api/v1/clothes/1')// async
        
        expect(response.status).toEqual(200);
        expect(responseGet.body).toEqual(null); // superagent is behind this 
    });


    it('post data from /api/v2/:model ', async () => {

      const response = await mockRequest.post('/signin')
      .auth(users[userType].username, users[userType].password);

    const token = response.body.token;

    // First, use basic to login to get a token
    const bearerResponse = await mockRequest
      .post('/api/v2/food')
      .set('Authorization', `Bearer ${token}`)

      let obj = {
        name:'Rami',
        color:'blu',
        size: "xl"
  }

    // Not checking the value of the response, only that we "got in"
    const responsePost = await mockRequest.post('/api/v1/food').send(obj)
    expect(bearerResponse.status).toBe(201);
    expect(typeof responsePost.body).toEqual('object');
    });
//******************************************************************** */

    it('get data from /api/v2/:model ', async () => {

      const response = await mockRequest.post('/signin')
      .auth(users[userType].username, users[userType].password);

    const token = response.body.token;

    // First, use basic to login to get a token
    const bearerResponse = await mockRequest
      .get('/api/v2/food')
      .set('Authorization', `Bearer ${token}`)

 
    // Not checking the value of the response, only that we "got in"
  
    expect(bearerResponse.status).toBe(200);
    expect(typeof bearerResponse.body).toEqual('object');
    });

//********************************************************************** */


    it('get data from /api/v2/:model/:id ', async () => {

      const response = await mockRequest.post('/signin')
      .auth(users[userType].username, users[userType].password);

    const token = response.body.token;

    // First, use basic to login to get a token
    const bearerResponse = await mockRequest
      .put('/api/v2/food/1')
      .set('Authorization', `Bearer ${token}`)

      let obj = {
        name:'Rami',
        color:'blu',
        size: "xl"
  }
 
    // Not checking the value of the response, only that we "got in"
    const responsePost = await mockRequest.put('/api/v1/food').send(obj)
    expect(bearerResponse.status).toBe(200);
    expect(typeof responsePost.body).toEqual('object');
    });

//********************************************************************** */

    it('delete data from /api/v2/:model/:id ', async () => {

      const response = await mockRequest.post('/signin')
      .auth(users[userType].username, users[userType].password);

    const token = response.body.token;

    // First, use basic to login to get a token
    const bearerResponse = await mockRequest
      .delete('/api/v2/food/1')
      .set('Authorization', `Bearer ${token}`)

  
 
    // Not checking the value of the response, only that we "got in"
    const responsePost = await mockRequest.delete('/api/v1/food/1')
    expect(bearerResponse.status).toBe(200);
    expect(typeof bearerResponse.body).toEqual('number');
    expect(responsePost.body).toEqual(0);

    });

  

    // describe('bad logins', () => {
    //   it('basic fails with known user and wrong password ', async (done) => {

    //     const response = await mockRequest.post('/signin')
    //       .auth('admin', 'xyz')
    //     const userObject = response.body;

    //     expect(response.status).toBe(403);
    //     expect(userObject.user).not.toBeDefined();
    //     expect(userObject.token).not.toBeDefined();
    //     done();
    //   });

      // it('basic fails with unknown user', async (done) => {

      //   const response = await mockRequest.post('/signin')
      //     .auth('nobody', 'xyz')
      //   const userObject = response.body;

      //   expect(response.status).toBe(403);
      //   expect(userObject.user).not.toBeDefined();
      //   expect(userObject.token).not.toBeDefined()
      //   done();
      // });

      // it('bearer fails with an invalid token', async (done) => {

      //   // First, use basic to login to get a token
      //   const bearerResponse = await mockRequest
      //     .get('/users')
      //     .set('Authorization', `Bearer foobar`)

      //   // Not checking the value of the response, only that we "got in"
      //   expect(bearerResponse.status).toBe(403);
      //   done();
      // })
    // })

  });

});