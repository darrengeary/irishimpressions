import { getSession } from "next-auth/react"
import Order from "../../../../models/Order"
import db from "../../../../utils/db"
import mongoose from "mongoose"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send("Signin Required")
  }
  await db.connect()
  const order = await Order.findById(mongoose.Types.ObjectId(req.query.id))

  res.send(order)
}

export default handler
