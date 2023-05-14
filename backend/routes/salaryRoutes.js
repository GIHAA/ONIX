const express = require('express')
const router = express.Router()

const {
    addSalary,
    viewSalary,
    updateSalary,
    deleteSalary
} = require('../controllers/salaryController')
const { protect  , adminProtect} = require('../middleware/authMiddleware')

router.get('/', viewSalary)
router.post('/', addSalary)
router.put('/:id', updateSalary)
router.delete('/:id', deleteSalary)

module.exports = router