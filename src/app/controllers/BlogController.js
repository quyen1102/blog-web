const Blog = require('../models/Blog')
const { mongooseToObject } = require('../../util/mongo')

class BlogController {

    //[GET] /blogs/:slug
    show(req, res, next) {
        Blog.findOne({ slug: req.params.slug})
            .then(blog =>{
                res.render('blogs/show', { blog: mongooseToObject(blog) })
            })
            .catch(next)

        // res.send(req.params.slug)
    }
    //[GET] /blogs/:create
    create(req, res, next) {
       res.render('blogs/create')
    }
    //[POST] /blogs/store
    store(req, res, next) {
        // res.json(req.body)
        const formData = req.body
        const blog = new Blog(formData)
        blog.save()
            .then(() => res.redirect(`/me/stored/blogs`))
            .catch(err => res.render('Lỗi rồi'))
        
    }
    //[GET] /blogs/:id/edit
    edit(req, res, next) {
        Blog.findById(req.params.id)
            .then(blog => {
                res.render('blogs/edit', {
                    blog: mongooseToObject(blog)
                })
            })
            .catch(next)
     }

    //[PUT] /blogs/:id/
    update(req, res, next) {
        Blog.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/blogs'))
            .catch(next)
    }
    //[DELETE] /blogs/:id/
    destroy(req, res, next) {
        Blog.delete({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[DELETE] /blogs/:id/force
    forceDestroy(req, res, next) {
        Blog.deleteOne({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }
    //[PATH] /blogs/:id/restore
    restore(req, res, next) {
        Blog.restore({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[POST] /blogs/handle-form-action
    handleFormAction(req, res, next) {
        // res.json(req.body.action);
        switch(req.body.action) {
            case 'delete': 
                Blog.delete({ _id: { $in: req.body.blogIDs}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default: res.send('Vui lòng chọn Hành động trước khi thực hiện!!')
        }
    }
    //[POST] /blogs/handle-trash-form-action
    handletrashFormAction(req, res, next) {
        // res.json(req.body.action);
        switch(req.body.action) {
            case 'delete destroy': 
                Blog.deleteOne({ _id: { $in: req.body.blogsCheckedByIDs}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'restore': 
                Blog.restore({ _id: { $in: req.body.blogsCheckedByIDs}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default: res.send('Vui lòng chọn Hành động trước khi thực hiện!!')
        }
    }
}

module.exports = new BlogController;