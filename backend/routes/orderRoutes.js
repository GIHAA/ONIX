const express = require('express')
const router = express.Router()

const {
    addOrder,
    viewOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController')
const { protect  , adminProtect} = require('../middleware/authMiddleware')

router.get('/', viewOrder)
router.post('/', addOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

module.exports = router