const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Order = require("../models/Order");
const Payment = require("../models/Payment");

exports.createIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({ message: "Amount & Order ID required" });
    }

    const intent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      metadata: {
        orderId,
        userId: req.user.id,
      },
    });

    res.json({
      clientSecret: intent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment failed" });
  }
};

/**
 * STRIPE WEBHOOK
 */
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Payment successful
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const orderId = paymentIntent.metadata.orderId;
    const userId = paymentIntent.metadata.userId;

    // Update Order
    await Order.findByIdAndUpdate(orderId, {
      status: "PAID",
      paymentIntentId: paymentIntent.id,
    });

    // Save payment
    await Payment.create({
      orderId,
      userId,
      provider: "stripe",
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      paymentIntentId: paymentIntent.id,
      status: "SUCCESS",
    });

    console.log("Payment verified & order updated");
  }

  // Failed payment
  if (event.type === "payment_intent.payment_failed") {
    console.log("Payment failed");
  }

  res.json({ received: true });
};
