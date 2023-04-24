const express = require('express')
const router = express.Router()

const {
    viewDeliveries,
    addDeliveries,
    updateDeliveries,
    deleteDeliveries
} = require('../controllers/deliveriesController')
const { protect  , adminProtect} = require('../middleware/authMiddleware')

router.get('/', viewDeliveries)
router.post('/', addDeliveries)
router.put('/:id', updateDeliveries)
router.delete('/:id', deleteDeliveries)

module.exports = router