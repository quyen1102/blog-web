const mongoose = require('mongoose')


async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog_learnF8_dev')

        console.log('Connect successfully!!!')
    } catch (error) {
        console.log('fail')

    }

}

module.exports = { connect }