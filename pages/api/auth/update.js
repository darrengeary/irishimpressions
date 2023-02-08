import { getSession } from "next-auth/react"
import bcryptjs from "bcryptjs"
import User from "../../../models/User"
import db from "../../../utils/db"

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} Not Supported` })
  }

  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send({ message: "Signin Required" })
  }

  const { user } = session
  const { name, email, currentPassword, newPassword, confirmNewPassword } =
    req.body

  if (!name) {
    res.status(422).json({
      message: "Name is required",
    })
    return
  }

  if (!email) {
    res.status(422).json({
      message: "Email is required",
    })
    return
  }

  if (!email.includes("@")) {
    res.status(422).json({
      message: "Email must be a valid address",
    })
    return
  }

  if (!currentPassword) {
    res.status(422).json({
      message: "Password is required",
    })
    return
  }

  if (newPassword && confirmNewPassword) {
    if (newPassword != confirmNewPassword) {
      res.status(422).json({
        message: "Password confirmation does not match",
      })
      return
    }

    if (!/[0-9]/.test(newPassword)) {
      res.status(422).json({
        message: "Password must contain at least one number",
      })
      return
    }

    if (!/[^0-9a-zA-Z\s]/.test(newPassword)) {
      res.status(422).json({
        message:
          "Password must contain at least one special character, such as # @ ! % ^ & * ( )",
      })
      return
    }

    if (newPassword.trim().length < 7) {
      res.status(422).json({
        message: "Password must be at least 7 characters long",
      })
      return
    }
  }
  await db.connect()
  const existingUser = await User.find({ email: email })
  await db.disconnect()
  if (
    (session.user.email === email && existingUser.length > 1) ||
    (session.user.email != email && existingUser.length > 0)
  ) {
    res
      .status(422)
      .json({ message: "There is already an account with this email" })
    return
  }

  await db.connect()
  const toUpdateUser = await User.findById(user._id)
  if (bcryptjs.compareSync(currentPassword, toUpdateUser.password)) {
    toUpdateUser.name = name
    toUpdateUser.email = email
    if (newPassword) {
      toUpdateUser.password = bcryptjs.hashSync(newPassword)
    }
    await toUpdateUser.save()
    await db.disconnect()
    res.send({
      message: "User Successfully Updated",
    })
  } else {
    await db.disconnect()
    res.status(422).json({ message: "Incorrect Password" })
    return
  }
}

export default handler
