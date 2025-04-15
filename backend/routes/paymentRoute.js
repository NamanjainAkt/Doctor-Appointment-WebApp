import express from 'express';
import { createPaymentSession, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Create Stripe payment session
router.post('/create-session', createPaymentSession);

// Handle Stripe webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;