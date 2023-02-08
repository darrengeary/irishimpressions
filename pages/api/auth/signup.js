import bcryptjs from "bcryptjs"
import User from "../../../models/User"
import db from "../../../utils/db"

async function handler(req, res) {
  if (req.method !== "POST") {
    return
  }

  const { name, email, password, acceptedTermsAndPrivacyPolicies } = req.body

  if (acceptedTermsAndPrivacyPolicies != true) {
    res.status(422).json({
      message: "All user's must accept the terms and conditions first",
    })
    return
  }

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

  if (!password) {
    res.status(422).json({
      message: "Password is required",
    })
    return
  }

  if (!/[0-9]/.test(password)) {
    res.status(422).json({
      message: "Password must contain at least one number",
    })
    return
  }

  if (!/[^0-9a-zA-Z\s]/.test(password)) {
    res.status(422).json({
      message:
        "Password must contain at least one special character, such as # @ ! % ^ & * ( )",
    })
    return
  }

  if (password.trim().length < 7) {
    res.status(422).json({
      message: "Password must be at least 7 characters long",
    })
    return
  }

  await db.connect()
  const existingUser = await User.findOne({ email: email })
  if (existingUser) {
    res
      .status(422)
      .json({ message: "There is already an account with this email" })
    return
  }

  const newUser = new User({
    name,
    email,
    acceptedTermsAndPrivacyPolicies,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  })

  const user = await newUser.save()

  res.status(201).send({
    message: "Created User!",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  })
}

export default handler
