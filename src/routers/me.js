const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController') // obj

// blogController.index()

// tuyến đường chi tiết thì đứng trc, rồi mới cái lớn hơn, 
// vì nó đọc cái lớn hơn trc thì nó render luôn



router.get('/stored/blogs', meController.storedBlogs)
router.get('/trash/blogs', meController.trashBlogs)

module.exports = router