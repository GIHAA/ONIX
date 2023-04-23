const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  viewUsers
} = require('../controllers/userController')
const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware')

router.get('/', viewUsers)
router.post('/',registerUser)
router.post('/login', loginUser)
router.post('/update',protect, userProtect, updateUser)
router.delete('/',protect, userProtect, deleteUser)



module.exports = router