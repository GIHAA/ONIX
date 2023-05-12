const express = require('express')
const router = express.Router()

const {
    addAttendance,
    viewAttendance,
    updateAttendance,
    deleteAttendance
} = require('../controllers/AttendanceController')
const { protect  , adminProtect} = require('../middleware/authMiddleware')

router.get('/', viewAttendance)
router.post('/', addAttendance)
router.put('/:id', updateAttendance)
router.delete('/:id', deleteAttendance)

module.exports = router