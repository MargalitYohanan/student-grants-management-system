import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js'
import { createRequest, getMyStatus, updateRequestStatus, getRequests, getRequestDetails } from '../controllers/requestController.js';

const router = express.Router();

router.post('/', authMiddleware, createRequest);
router.get('/status', authMiddleware, getMyStatus);

router.patch('/admin/:id/status',authMiddleware, adminMiddleware, updateRequestStatus);
router.get('/admin/all', authMiddleware, adminMiddleware, getRequests);
router.get('/admin/request/:id', authMiddleware, adminMiddleware, getRequestDetails)

export default router;