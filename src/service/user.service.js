import userRepository from '../repositories/user.repositories.js'
import bcrypt from 'bcrypt'

async function createUserService (newUser) {
    const foundUserUsername = await userRepository.findUserByUsername(newUser.username)
    if(foundUserUsername) throw new Error('User already exists!')
    const foundUserEmail = await userRepository.findUserByEmail(newUser.email)
    if(foundUserEmail) throw new Error('User already exists!')
    const passHash = await bcrypt.hash(newUser.password, 10)
    const user = await userRepository.createUserRepository({ ...newUser, password: passHash})
    if(!user) throw new Error('Error creating user!')
    return user
}

export default {
    createUserService
}