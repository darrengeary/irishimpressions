import { getSession } from "next-auth/react"
import Order from "../../../../models/Order"
import db from "../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("Signin Required")
  }
  if (req.method === "GET") {
    await db.connect()
    const orders = await Order.find({}).populate("user", "name")

    res.send(orders)
  } else {
    return res.status(400).send({ message: "Method not Allowed" })
  }
}

export default handler
