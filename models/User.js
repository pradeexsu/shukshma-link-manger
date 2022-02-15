const { Schema, model } = require('mongoose')

const userSchema = Schema({
    googleId: String
})

model('users', userSchema)