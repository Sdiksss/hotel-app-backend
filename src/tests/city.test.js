const request = require('supertest')
const app = require('../app')

let token
let id

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
      email: 'test@gmail.com',
      password: 'test1234'  
    });
   token = res.body.token
});


test('GET /cities debe de traer todos los hoteles', async() => {
    const res = await request(app)
        .get('/cities')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /cities debe de crear una ciudad', async() => {
    const body = {
        name: "lima",
        country: "Peru",
        countryId: "1",
    }
    const res = await request(app).post('/cities')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
})

test('PUt /cities/:id debe de actualizar una ciudad', async() => {
    const body = {
        name: "lima update",
        country: "Peru",
        countryId: "1",
    }
    const res = await request(app).put(`/cities/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})


test('DELETE /cities/:id ', async() => {
    const res = await request(app).delete(`/cities/${id}`)
        .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(204)
  
})

