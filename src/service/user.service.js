import userRepository from '../repositories/user.respositories.js'

async function createUserService (newUser) {
    const foundUserUsername = await userRepository.findUserByUsername(newUser.username)
    if(foundUserUsername) throw new Error('User already exists!')
    const foundUserEmail = await userRepository.findUserByEmail(newUser.email)
    if(foundUserEmail) throw new Error('User already exists!')
    const user = await userRepository.createUserRepository(newUser)
    return user
}

export default {
    createUserService
}