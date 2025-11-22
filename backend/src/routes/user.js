import express from 'express'
import { verifyRole, verifyToken } from '../middleware/authMiddleware.js'
import { deletUser, getProfile, getUsers } from '../controllers/userController.js'

const router = express.Router()

router.get('/', verifyToken, verifyRole('admin'), getUsers)
router.delete('/:id', verifyToken, verifyRole('admin'), deletUser) // eg: /api/users/197
router.get('/me', verifyToken, getProfile)

export default router
