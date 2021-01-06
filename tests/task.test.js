const request = require('supertest')
const { set } = require('../src/app')
const app = require("../src/app")
const Task = require('../src/models/task')
const {userOneId, userOne, userTwo, taskOne, setupDatabases} = require('./fixtures/db') 

beforeEach(setupDatabases)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test("Should fetch user tasks", async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    expect(response.body.length).toEqual(3)
})

test("Should don't delete another user task", async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(404)

    const task = await Task.findById(taskOne._id)

    expect(task).not.toBeNull()
})