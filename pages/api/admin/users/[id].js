import User from "../../../../models/User"
import db from "../../../../utils/db"
import { getSession } from "next-auth/react"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("Admin Signin Required")
  }

  if (req.method === "DELETE") {
    return deleteHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method Not Allowed" })
  }
}

const deleteHandler = async (req, res) => {
  await db.connect()
  const user = await User.findById(req.query.id)
  if (user) {
    if (user.email === "admin@example.com") {
      return res.status(400).send({ message: "Can't Delete Admin" })
    }
    await user.remove()

    res.send({ message: "User Deleted" })
  } else {
    res.status(404).send({ message: "User Not Found" })
  }
}

export default handler
