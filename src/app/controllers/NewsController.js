
class NewsController {

    //[GET] /news
    index(req, res) {
        res.render('news')
    }
    //[GET] /news/:slug
    show(req, res) {
        res.send('Bang tin hom nay!!')
    }

}

module.exports = new NewsController;