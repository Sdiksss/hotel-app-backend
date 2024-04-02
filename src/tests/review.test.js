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


test('GET /reviews debe de traer un review', async() => {
    const res = await request(app).get('/reviews')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
})

test('POST /reviews debe de crear un review', async() => {
    const body = {
        rating: 1,
        comment: "comment",
        hotelId: "1",
        userId: "1"
    }
    const res = await request(app).post('/reviews')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.rating).toBeDefined();
    expect(res.body.rating).toBe(body.rating)
})
test('PUt /reviews/:id debe de actualizar un review', async() => {
    const body = {
        rating: 5,
        comment: "comment",
        hotelId: "1",
        userId: "1"
    }
    const res = await request(app).put(`/reviews/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.rating).toBe(body.rating)
})


test('DELETE /reviews/:id ', async() => {
    const res = await request(app).delete(`/reviews/${id}`)
        .set('Authorization', `Bearer ${token}`)
console.log(res)
    expect(res.status).toBe(204)
  
})