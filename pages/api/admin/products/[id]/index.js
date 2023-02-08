import { getSession } from "next-auth/react"
import Product from "../../../../../models/Product"
import db from "../../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send("Signin Required")
  }

  const { user } = session
  if (req.method === "GET") {
    return getHandler(req, res, user)
  } else if (req.method === "PUT") {
    return putHandler(req, res, user)
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res, user)
  } else {
    return res.status(400).send({ message: "Method Not Allowed" })
  }
}
const getHandler = async (req, res) => {
  await db.connect()
  const product = await Product.findById(req.query.id)

  res.send(product)
}
const putHandler = async (req, res) => {
  await db.connect()
  const product = await Product.findById(req.query.id)
  if (product) {
    product.name = req.body.name
    product.english = req.body.english
    product.slug = req.body.slug
    product.image = req.body.image
    product.monthPrice = req.body.monthPrice
    product.threeMonthPrice = req.body.threeMonthPrice
    product.sixMonthPrice = req.body.sixMonthPrice
    product.yearPrice = req.body.yearPrice
    product.description = req.body.description
    await product.save()

    res.send({ message: "Product Updated Successfully" })
  } else {
    res.status(404).send({ message: "Product not found" })
  }
}
const deleteHandler = async (req, res) => {
  await db.connect()
  const product = await Product.findById(req.query.id)
  if (product) {
    await product.remove()

    res.send({ message: "Product Deleted Successfully" })
  } else {
    res.status(404).send({ message: "Product Not Found" })
  }
}
export default handler
