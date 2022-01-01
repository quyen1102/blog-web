const Blog = require('../models/Blog')
const { mutipleMongooseToObject } = require('../../util/mongo')

class MeController {
    // [GET] /me//stored/blogs
   storedBlogs(req, res, next) {
     Promise.all([Blog.countDocumentsDeleted(), Blog.find({})])
          .then(([deletedCount, blogs])=>
               res.render('me/stored-blogs', { 
                    deletedCount: deletedCount, 
                    blogs: mutipleMongooseToObject(blogs)
          })
          )
          .catch(next)
        
   }
    // [GET] /me/trash/blogs
   trashBlogs(req, res, next){
     Blog.findDeleted({})
          .then(blogs => res.render('me/trash-blogs', { 
               blogs: mutipleMongooseToObject(blogs)
          }))
          .catch(next)
   }
}

module.exports = new MeController;