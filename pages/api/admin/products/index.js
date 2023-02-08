import { getSession } from "next-auth/react"
import Product from "../../../../models/Product"
import db from "../../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("Admin Signin Required")
  }
  // const { user } = session;
  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "POST") {
    return postHandler(req, res)
  } else {
    return res.status(400).send({ message: "Method Not Allowed" })
  }
}
const postHandler = async (req, res) => {
  await db.connect()
  const newProduct = new Product({
    name: "Bosca Meánach",
    english: "Medium Box",
    slug: "meanach",
    image: "/images/meanach.jpg",
    monthPrice: 27,
    threeMonthPrice: 77.25,
    sixMonthPrice: 147,
    yearPrice: 270,
    description:
      "Introducing our Bosca Meánach (Medium Irish Artisan Box), filled with an expertly curated selection of handcrafted products worth over 27 Euro. Each month, you'll receive a variety of unique and beautifully crafted items all made by skilled artisans from around Ireland. \n\nWith a medium box subscription, you'll have the opportunity to discover new and exciting products from a wide range of Irish artisans, and treat yourself or a loved one to a special and unique gift each month. The contents of the box will change each month, so you'll never receive the same items twice.\n\nOur Medium Irish Artisan Box is perfect for those who want to try a little box of gifts or for a single person. You'll receive a great variety of artisan products.\n\nSign up for a medium box subscription today and experience the best of Irish craftsmanship delivered straight to your door.",
  })

  const product = await newProduct.save()
  await db.disconnect()
  res.send({ message: "Product Created Successfully", product })
}
const getHandler = async (req, res) => {
  await db.connect()
  const products = await Product.find({})
  await db.disconnect()
  res.send(products)
}
export default handler
