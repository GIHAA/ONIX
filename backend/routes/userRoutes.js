const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  viewUsers,
  deleteadmin,
  viewdrivers
} = require('../controllers/userController')
const { protect , userProtect , adminProtect} = require('../middleware/authMiddleware')

router.get('/', viewUsers)
router.get('/drivers', viewdrivers)
router.post('/',registerUser)
router.post('/login', loginUser)
router.put('/:id', updateUser)
router.post('/delete', deleteUser)
router.delete('/:id', deleteadmin)



module.exports = router