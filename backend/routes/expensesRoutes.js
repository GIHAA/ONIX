const express = require('express')
const router = express.Router()

const {
    addExpenses ,
    viewExpenses ,
    updateExpenses ,
    deleteExpenses 
} = require('../controllers/expensesController')
const { protect  , adminProtect} = require('../middleware/authMiddleware')


router.get('/', viewExpenses )
router.post('/', addExpenses )
router.put('/:id', updateExpenses )
router.delete('/:id', deleteExpenses )

module.exports = router