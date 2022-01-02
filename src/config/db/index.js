
const mongoose = require('mongoose')


async function connect(url) {
    try {
        await mongoose.connect(url)

        console.log('Connect successfully!!!')
    } catch (error) {
        console.log('fail')

    }

}

module.exports = { connect }