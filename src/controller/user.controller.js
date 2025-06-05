import userService from "../service/user.service.js"

async function createUserController(req, res) {
    const newUser = req.body
    try {
        const user = await userService.createUserService(newUser)
        res.status(201).send({ user })
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

export default {
    createUserController
}