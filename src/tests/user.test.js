const app = require("../app")
const request = require('supertest')

let id 
let token

test('POST /users debe de crear un usuario', async() => {
    const body = {
        firstName: "ruben",
        lastName: "laime",
        email: "laime123",
        password: "admin",
        gender: "MALE"
    }
    const res = await request(app).post('/users').send(body)


    id = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(body.firstName)
    expect(res.body.id).toBeDefined()
})

test('POST /users/login debe de hacer un login', async() => {
    const body = {
        email: "laime123",
        password: "admin"
    }
    const res = await request(app).post('/users/login').send(body)
    token= res.body.token
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe(body.email)
}) 



test('POST /users/login con credenciales incorrectas debe de enviar error', async() => {
    const body = {
        email: "notEmail",
        password: "notPassword"
    }
    const res = await request(app).post('/users/login').send(body)
    expect(res.status).toBe(401)
  
})

test('GET /users debe de traer todos los usuarios ', async() => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
})



test('PUT /users/:id debe de actualizar un usuario mediante id', async() => {
    const body = {
        firstName: "name update",
        lastName: "lastName update",
        email: "laime123",
        gender: "MALE"
    }
    const res = await request(app).put(`/users/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    console.log(res)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(body.firstName)
})



test('DELETE /users:id debe de eliminar un usuario', async() =>{
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
} )

