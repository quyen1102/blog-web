const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController') // obj

// newController.index()

// tuyến đường chi tiết thì đứng trc, rồi mới cái lớn hơn, 
// vì nó đọc cái lớn hơn trc thì nó render luôn



router.get('/search', siteController.search)
router.get('/', siteController.index)

module.exports = router