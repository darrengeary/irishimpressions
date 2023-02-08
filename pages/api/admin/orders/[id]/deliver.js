import { getSession } from "next-auth/react"
import Order from "../../../../../models/Order"
import db from "../../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("Error: Signin Required")
  }
  await db.connect()
  const order = await Order.findById(req.query.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const deliveredOrder = await order.save()

    res.send({
      message: "Order Delivered Successfully",
      order: deliveredOrder,
    })
  } else {
    res.status(404).send({ message: "Error: Order Not Found" })
  }
}

export default handler
