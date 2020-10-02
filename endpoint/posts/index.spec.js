
const postHandlers = require('./index')
describe('EndPoints', () => {
    describe('posts', () => {
        it('It should create', async () => {
            const mockUsers = [
                {id: '1'},
                {id: '2'},
            ]
            const post = {
                title: "Titulo",
                body: "Cuerpo del post",
                userId: '1',
                id: '1'
            }
            const req = {
                body: post
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }

            const axios = {
                get: jest.fn().mockReturnValue({data: mockUsers}),
                post: jest.fn().mockReturnValue({data: {id: 1000}})
            }

            await postHandlers({axios}).post(req, res)

            expect(res.status.mock.calls).toEqual([
                [201]
            ])

            expect(res.send.mock.calls).toEqual([
                [{id: 1000}]
            ])

            expect(axios.get.mock.calls).toEqual([
                ['https://jsonplaceholder.typicode.com/users']
            ])

            expect(axios.post.mock.calls).toEqual([
                ['https://jsonplaceholder.typicode.com/posts', req.body]
            ])
        })
        it('should not create if userId does not exists', async () => {
            const mockUsers = [
                {id: 1},
                {id: 2},
            ]
            const post = {
                title: "Titulo",
                body: "Cuerpo del post",
                userId: 3,
                id: 1
            }

            const req = {
                body: post
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                sendStatus: jest.fn(),
            }

            const axios = {
                get: jest.fn().mockReturnValue({data: mockUsers}),
                post: jest.fn().mockReturnValue({data: {id: 1000}})
            }

            await postHandlers({axios}).post(req, res)

            expect(axios.post.mock.calls).toEqual([])
            expect(res.sendStatus.mock.calls).toEqual([
                [400]
            ])
        })
    })
})