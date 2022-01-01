const newRouter = require('./news')
const meRouter = require('./me')
const logOutRouter = require('./logOut')
const blogRouter = require('./blogs')
const siteRouter = require('./site')

function route(app){

    app.use('/news', newRouter)
    app.use('/logs', logOutRouter)
    app.use('/me', meRouter)
    app.use('/blogs', blogRouter)
    app.use('/', siteRouter)
    

}

module.exports = route