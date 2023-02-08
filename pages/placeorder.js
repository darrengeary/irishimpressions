import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import CheckoutWizard from "../components/CheckoutWizard"
import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import { getError } from "../utils/error"
import { Store } from "../utils/Store"

export default function PlaceOrderScreen() {
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

  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { cartItems, shippingAddress, paymentMethod } = cart
  const round2 = (num) =>
    (Math.round(num * 100 + Number.EPSILON) / 100).toFixed(2)

  const finalPriceCalc = () => {
    let finalPrice = 0
    if (paymentMethod === "12 Month Subscription") {
      {
        finalPrice = cartItems.product.yearPrice
      }
    }
    if (paymentMethod === "6 Month Subscription") {
      {
        finalPrice = cartItems.product.sixMonthPrice
      }
    }
    if (paymentMethod === "3 Month Subscription") {
      {
        finalPrice = cartItems.product.threeMonthPrice
      }
    }
    if (paymentMethod === "Single Month Trial") {
      {
        finalPrice = cartItems.product.monthPrice
      }
    }

    return finalPrice
  }

  const router = useRouter()

  useEffect(() => {
    console.log(cartItems)
    console.log(paymentMethod)
    if (!paymentMethod || !cartItems.product) {
      router.push("/order-history")
      toast.error("Cart Reset: Check Order History")
    } else {
      const finalPrice1 = finalPriceCalc()
      const shipCost = shippingList.filter(
        (country) => country.name === shippingAddress.country
      )[0].cost
      setShippingPrice(shipCost)
      setFinalPrice(finalPrice1)
      setTotalPrice(finalPrice1 + shipCost)
    }
  }, [paymentMethod, router])

  const [loading, setLoading] = useState(false)
  const [shippingPrice, setShippingPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)

  const placeOrderHandler = async () => {
    try {
      setLoading(true)

      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems.product,
        shippingAddress,
        paymentMethod,
        itemsPrice: finalPrice,
        shippingPrice,
        totalPrice: totalPrice,
      })

      setLoading(false)
      dispatch({ type: "CART_CLEAR_ITEMS" })
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: {},
        })
      )
      router.push(`/order/${data._id}`)
    } catch (err) {
      setLoading(false)
      toast.error(getError(err))
    }
  }

  return (
    <>
      <NavBar />
      <Layout title='Place Order'>
        <CheckoutWizard activeStep={3} />
        <h1 className='mb-4 text-xl'>Place Order</h1>
        {!cartItems ? (
          <div>
            Cart is empty. <Link href='/'>Go shopping</Link>
          </div>
        ) : (
          <div className='grid md:grid-cols-4 md:gap-5'>
            <div className='overflow-x-auto md:col-span-3'>
              <div className='card  p-5'>
                <h2 className='mb-2 text-lg'>Shipping Address</h2>
                <div>
                  {shippingAddress.fullName}, {" " + shippingAddress.address},
                  {" " + shippingAddress.city},{" "}
                  {" " + shippingAddress.postalCode},
                  {" " + shippingAddress.country}
                </div>
                <div>
                  <Link href='/shipping'>Edit</Link>
                </div>
              </div>

              <div className='card overflow-x-auto p-5'>
                <h2 className='mb-2 text-lg'>Order Items</h2>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='px-5 text-left'>Item</th>
                      <th className='p-5 text-right'>Subscription</th>
                      <th className='p-5 text-right'>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.product ? (
                      <tr key={cartItems.product_id} className='border-b'>
                        <td>
                          <Link href={`/product/${cartItems.product.slug}`}>
                            <a className='flex items-center'>
                              <Image
                                layout='responsive'
                                src={cartItems.product.image}
                                alt={cartItems.product.name}
                                width={50}
                                height={50}
                              ></Image>
                              &nbsp;
                              {cartItems.product.name}
                            </a>
                          </Link>
                        </td>
                        <td className='p-5 text-right'>
                          <div>{paymentMethod}</div>
                        </td>
                        <td className='p-5 text-right'>
                          €{round2(finalPrice)}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className='card p-5'>
                <h2 className='mb-2 text-lg'>Order Summary</h2>
                <ul>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Items</div>
                      <div>
                        €{finalPrice > 0 ? round2(finalPrice) : "Calculating"}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Shipping</div>
                      <div>
                        €
                        {shippingPrice > 0
                          ? round2(shippingPrice)
                          : "Calculating"}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Total</div>
                      <div>
                        €
                        {shippingPrice > 0 && cartItems.product
                          ? round2(totalPrice)
                          : "Calculating"}
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      disabled={loading}
                      onClick={placeOrderHandler}
                      className='primary-button w-full'
                    >
                      {loading ? "Loading..." : "Proceed to Payment"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

PlaceOrderScreen.auth = true
