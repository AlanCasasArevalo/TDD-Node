
const handlers = ({ axios }) => ({
    getUsers: async (req, res) => {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
        res.status(200).json(data)
    },
    postUsers: async (req, res) => {
        const {body} = req
        const {data} = await axios.post(`https://jsonplaceholder.typicode.com/users`, body)
        res.status(201).json(data)
    },

    putUsers: async (req, res) => {
        const {body} = req
        const {id} = req.params
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body)
        res.sendStatus(204)
    },

    deleteUsers: async (req, res) => {
        const {id} = req.params
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        res.sendStatus(204)
    }
})

module.exports = handlers
