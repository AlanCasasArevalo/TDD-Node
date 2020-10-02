const handlers = require('./index')
describe('EndPoints', () => {
    describe('Users', () => {
        describe('GET', () => {
            it('Return to user json', async () => {
                const axios = {
                    get: jest.fn().mockResolvedValue({
                        data: 1
                    })
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }

                await handlers({axios}).getUsers({}, res)
                expect(res.status.mock.calls).toEqual([
                    [200]
                ])
                expect(res.json.mock.calls).toEqual([
                    [1]
                ])
            })
        })
        describe('POST', () => {
            it('Create a resource', async () => {
                const axios = {
                    post: jest.fn().mockResolvedValue({
                        data: 1
                    })
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                }

                const req = {
                    body: 'request body'
                }

                await handlers({axios}).postUsers(req, res)
                expect(res.status.mock.calls).toEqual([
                    [201]
                ])
                expect(res.json.mock.calls).toEqual([
                    [1]
                ])
                expect(axios.post.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/users', 'request body']
                ])
            })
        })
        describe('PUT', () => {
            it('Update resource', async () => {
                const axios = {
                    put: jest.fn().mockResolvedValue({
                        data: 1
                    })
                }
                const res = {
                    sendStatus: jest.fn()
                }

                const req = {
                    body: 'request body',
                    params: {
                        id: 1313
                    }
                }

                await handlers({axios}).putUsers(req, res)
                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ])
                expect(axios.put.mock.calls).toEqual([
                    [`https://jsonplaceholder.typicode.com/users/${1313}`, 'request body']
                ])
            })
        })
        describe('DELETE', () => {
            it('Delete resource', async () => {
                const axios = {
                    delete: jest.fn()
                }
                const res = {
                    sendStatus: jest.fn()
                }

                const req = {
                    params: {
                        id: 4343
                    }
                }

                await handlers({axios}).deleteUsers(req, res)
                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ])
                expect(axios.delete.mock.calls).toEqual([
                    [`https://jsonplaceholder.typicode.com/users/${4343}`]
                ])
            })
        })
    })
})