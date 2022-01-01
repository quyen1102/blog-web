const express = require('express')
const router = express.Router()

const logoutController = require('../app/controllers/LogOutController') // obj

// newController.index()

// tuyến đường chi tiết thì đứng trc, rồi mới cái lớn hơn, 
// vì nó đọc cái lớn hơn trc thì nó render luôn



router.get('/logout', logoutController.logOut)

module.exports = router