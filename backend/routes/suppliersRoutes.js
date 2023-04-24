const express = require('express')
const router = express.Router()

const {
    addSuppliers,
    viewSuppliers,
    updateSuppliers,
    deleteSuppliers
} = require('../controllers/suppliersController')
const { protect  , adminProtect} = require('../middleware/authMiddleware')

router.get('/', viewSuppliers)
router.post('/', addSuppliers)
router.put('/:id', updateSuppliers)
router.delete('/:id', deleteSuppliers)

module.exports = router