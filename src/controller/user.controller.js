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

async function findAllUserController(req, res){
    try {
        const users = await userService.findAllUserService()
        res.status(201).send({ users })
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

async function updateUserController(req, res) {
    const { id } = req.params
    const newUser = req.body
    try {
        const user = await userService.updateUserService(newUser, id)
        res.send({ user })
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

async function deleteUserController(req, res) {
    const { id } = req.params
    try {
        const message = await userService.deleteUserService(id)
        res.status(201).send({ message })
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

export default {
    createUserController,
    findAllUserController,
    updateUserController,
    deleteUserController
}