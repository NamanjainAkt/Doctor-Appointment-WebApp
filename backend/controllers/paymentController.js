import stripe from '../config/stripe.js';

export const createPaymentSession = async (req, res) => {
    try {
        const { appointmentId, amount, doctorName } = req.body;

        if (!appointmentId || !amount || !doctorName) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                message: 'Stripe configuration is missing'
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `Appointment with Dr. ${doctorName}`,
                        description: 'Medical consultation appointment',
                    },
                    unit_amount: amount * 100, // Convert to smallest currency unit (paise)
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/appointments?success=true&appointment=${appointmentId}`,
            cancel_url: `${process.env.FRONTEND_URL}/appointments?canceled=true`,
            metadata: {
                appointmentId
            }
        });

        if (!session || !session.url) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create Stripe session'
            });
        }

        res.json({
            success: true,
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error('Payment session creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment session'
        });
    }
};

export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).json({ success: false, message: `Webhook Error: ${err.message}` });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const appointmentId = session.metadata.appointmentId;

        try {
            await fetch(`${process.env.BACKEND_URL}/api/appointments/status/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'confirmed',
                    paymentId: session.payment_intent
                })
            });
        } catch (error) {
            console.error('Error updating appointment status:', error);
            return res.status(500).json({ success: false, message: 'Failed to update appointment status' });
        }
    }

    res.json({ success: true });
};