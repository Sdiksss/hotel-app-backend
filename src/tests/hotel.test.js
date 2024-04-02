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


test('GET /hotels debe de traer todos los hoteles', async() => {
    const res = await request(app).get('/hotels')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /hotels debe de crear un hotel', async() => {
    const body = {
        name: "hotel.name ",
        description: "hotel.description",
        price: "hotel.price",
        address: "hotel.address",
        lat: "hotel.lat",
        lon: "hotel.lon"
    }
    const res = await request(app).post('/hotels')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
})
test('PUt /hotels/:id debe de actualizar un hotel', async() => {
    const body = {
        name: "hotel.name update ",
        description: "hotel.description",
        price: "hotel.price",
        address: "hotel.address",
        lat: "hotel.lat",
        lon: "hotel.lon"
    }
    const res = await request(app).put(`/hotels/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test('GET /hotels/:id debe de traer un hotel', async() => {
    const res = await request(app).get(`/hotels/${id}`)
    expect(res.status).toBe(200);
})


test('DELETE /hotels/:id ', async() => {
    const res = await request(app).delete(`/hotels/${id}`)
        .set('Authorization', `Bearer ${token}`)
console.log(res)
    expect(res.status).toBe(204)
  
})