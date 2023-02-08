import { getSession } from "next-auth/react"
import Order from "../../models/Order"
import db from "../../utils/db"

const postHandler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send("Error: Signin Required")
  }

  await db.connect()
  const order = await Order.findById(req.body.orderId)
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: "Error: Order is Already Paid" })
    }
    order.isPaid = true
    order.paidAt = Date.now()
    const paidOrder = await order.save()
    await db.disconnect()
    res.send({ message: "Order Paid Successfully", order: paidOrder })
  } else {
    await db.disconnect()
    res.status(404).send({ message: "Error: Order Not Found" })
  }
}
const handler = async (req, res) => {
  if (req.method === "POST") {
    return postHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method Not Allowed" })
  }
}

export default handler
