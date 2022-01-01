const express = require('express')
const router = express.Router()

const newController = require('../app/controllers/NewsController') // obj

// newController.index()

// tuyến đường chi tiết thì đứng trc, rồi mới cái lớn hơn, 
// vì nó đọc cái lớn hơn trc thì nó render luôn



router.get('/:slug', newController.show)
router.get('/', newController.index)

module.exports = router