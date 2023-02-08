import { getSession } from "next-auth/react"
import Order from "../../../models/Order"
import Product from "../../../models/Product"
import db from "../../../utils/db"

const shippingList = [
  { name: "Australia", cost: 34.99 },
  { name: "Austria", cost: 14.99 },
  { name: "Belgium", cost: 14.99 },
  { name: "Bulgaria", cost: 14.99 },
  { name: "Canada", cost: 29.99 },
  { name: "Croatia", cost: 14.99 },
  { name: "Cyprus", cost: 14.99 },
  { name: "Czech Republic", cost: 14.99 },
  { name: "Denmark", cost: 14.99 },
  { name: "Estonia", cost: 14.99 },
  { name: "Finland", cost: 14.99 },
  { name: "France", cost: 14.99 },
  { name: "Germany", cost: 14.99 },
  { name: "Greece", cost: 14.99 },
  { name: "Hungary", cost: 14.99 },
  { name: "Ireland", cost: 9.99 },
  { name: "Italy", cost: 14.99 },
  { name: "Latvia", cost: 14.99 },
  { name: "Lithuania", cost: 14.99 },
  { name: "Luxembourg", cost: 14.99 },
  { name: "Malta", cost: 14.99 },
  { name: "Netherlands", cost: 14.99 },
  { name: "Poland", cost: 14.99 },
  { name: "Portugal", cost: 14.99 },
  { name: "Romania", cost: 14.99 },
  { name: "Slovakia", cost: 14.99 },
  { name: "Slovenia", cost: 14.99 },
  { name: "Spain", cost: 14.99 },
  { name: "Sweden", cost: 14.99 },
  { name: "United Kingdom", cost: 9.99 },
  { name: "USA", cost: 29.99 },
]

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).send("Signin Required")
  }

  let reqBody = req.body

  const country = shippingList.find(
    (country) => country.name === reqBody.shippingAddress.country
  )
  reqBody.shippingPrice = country ? country.cost : 0

  await db.connect()
  const item = await Product.findOne({ name: reqBody.orderItems.name })
  await db.disconnect()

  let itemsPrice
  switch (reqBody.paymentMethod) {
    case "12 Month Subscription":
      itemsPrice = item.yearPrice
      break
    case "6 Month Subscription":
      itemsPrice = item.sixMonthPrice
      break
    case "3 Month Subscription":
      itemsPrice = item.threeMonthPrice
      break
    case "Single Month Trial":
      itemsPrice = item.monthPrice
      break
    default:
      itemsPrice = 49.99
  }

  reqBody.itemsPrice = itemsPrice
  reqBody.totalPrice = reqBody.itemsPrice + reqBody.shippingPrice

  const { user } = session
  await db.connect()
  const newOrder = new Order({
    ...reqBody,
    user: user._id,
  })

  const order = await newOrder.save()
  await db.disconnect()
  res.status(201).send(order)
}

export default handler
