import userRepository from '../repositories/user.repositories.js'
import bcrypt from 'bcrypt'

async function createUserService (newUser) {
    const foundUserUsername = await userRepository.findUserByUsernameRepository(newUser.username)
    if(foundUserUsername) throw new Error('User already exists!')
    const foundUserEmail = await userRepository.findUserByEmailRepository(newUser.email)
    if(foundUserEmail) throw new Error('User already exists!')
    const foundUserId = await userRepository.findUserByIdRepository(newUser.id)
    if(foundUserId) throw new Error('User already exists')
    const passHash = await bcrypt.hash(newUser.password, 10)
    const user = await userRepository.createUserRepository({ ...newUser, password: passHash})
    if(!user) throw new Error('Error creating user!')
    return user
}

async function findAllUserService () {
    const users = await userRepository.findAllUserRepository()
    return users
}

async function updateUserService(newUser, userId) {
    const user = await userRepository.findUserByIdRepository(userId)
    if(!user) throw new Error('User not found!')
    if(newUser.password) {
        newUser.password = await bcrypt.hash(newUser.password, 10)
    }
    const updateUser = await userRepository.updateUserRepository(userId, newUser)
    return updateUser
}

export default {
    createUserService,
    findAllUserService,
    updateUserService
}