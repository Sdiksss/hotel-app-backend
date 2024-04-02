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


test('GET /bookings debe de treaer todas las reservas', async() => {
    const res = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /bookings debe de crear un booking', async() => {
    const body = {
        checkIn: "2020-10-05",
        checkOut: "2020-10-10",
        hotelId: 1,
        userId: 1
    }
    const res = await request(app).post('/bookings')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.checkIn).toBeDefined();
    expect(res.body.hotelId).toBe(body.hotelId)
})
test('PUt /bookings/:id debe de actualizar un booking', async() => {
    const body = {
        checkIn: "2020-10-05",
        checkOut: "2020-10-10",
        hotelId: 1,
        userId: 1
    }
    const res = await request(app).put(`/bookings/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
})


test('DELETE /bookings/:id ', async() => {
    const res = await request(app).delete(`/bookings/${id}`)
        .set('Authorization', `Bearer ${token}`)
console.log(res)
    expect(res.status).toBe(204)
  
})