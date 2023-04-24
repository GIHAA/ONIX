const express = require('express')
const router = express.Router()

const {
    addStock ,
    viewStock ,
    updateStock ,
    deleteStock 
} = require('../controllers/stockController')
const { protect  , adminProtect} = require('../middleware/authMiddleware')

router.get('/', viewStock )
router.post('/', addStock )
router.put('/:id', updateStock )
router.delete('/:id', deleteStock )

module.exports = router