// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from "stripe"
import Order from "../../models/Order"
import { getSession } from "next-auth/react"
import db from "../../utils/db"

require("dotenv").config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method != "POST") return res.status(400)

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send("Signin Required")
  }
  const { orderId, paymentMethod } = req.body

  await db.connect()
  const order = await Order.findById(orderId)

  try {
    // Create a customer
    const customer = await stripe.customers.create({
      name: session.user.name,
      email: session.user.email,
      payment_method: paymentMethod,
      invoice_settings: { default_payment_method: paymentMethod },
    })

    // Create a product
    const product = await stripe.products.create({
      name: "Monthly subscription",
    })
    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "eur",
            product: product.id,
            unit_amount: Math.round(order.totalPrice * 100),
            recurring: {
              interval: "month",
            },
          },
        },
      ],

      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    })

    // Send back the client secret for payment
    res.json({
      message: "Subscription successfully initiated",
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal server error" })
  }
}
