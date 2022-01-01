const Blog = require('../models/Blog')
const { mutipleMongooseToObject } = require('../../util/mongo')

class LogOutController {

    //[GET] /
    
    //[GET] /logs/logout
    logOut(req, res) {
        res.render('logs/logout')
    }

}

module.exports = new LogOutController;