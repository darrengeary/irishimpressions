import { getSession } from "next-auth/react"
import Message from "../../models/Message"
import db from "../../utils/db"
import sanitize from "sanitize-html"

const postHandler = async (req, res) => {
  try {
    await db.connect()
    const sanName = sanitize(req.body.sanName)
    const sanEmail = sanitize(req.body.sanEmail)
    const sanMessage = sanitize(req.body.sanMessage)

    if (sanName && sanEmail && sanMessage) {
      const session = await getSession({ req })
      const newMessage = new Message({
        name: sanName,
        email: sanEmail,
        message: sanMessage,
      })
      if (session && session.user) {
        newMessage.user = session.user._id
      }
      const savedMessage = await newMessage.save()

      res.send({ message: "Message Sent", savedMessage })
    }
  } catch (error) {
    res.status(500).send({ message: "Error Occurred" })
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
