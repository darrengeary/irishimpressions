import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useReducer } from "react"
import { toast } from "react-toastify"
import Layout from "../../components/Layout"
import NavBar from "../../components/NavBar"
import { getError } from "../../utils/error"
import Stripe from "../../components/Stripe.js"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    case "PAY_REQUEST":
      return { ...state }
    case "PAY_SUCCESS":
      return { ...state }
    case "PAY_FAIL":
      return { ...state, errorPay: action.payload }
    case "PAY_RESET":
      return { ...state, errorPay: "" }

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true }
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true }
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false }
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      }

    default:
      state
  }
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

function OrderScreen() {
  const round2 = (num) =>
    (Math.round(num * 100 + Number.EPSILON) / 100).toFixed(2)
  const { data: session } = useSession()
  const router = useRouter()
  const orderId = router.query.id

  const [{ loading, error, order, loadingDeliver, successDeliver }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
    })
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/orders/${orderId}`)
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }
    if (orderId) {
      fetchOrder()
    }
  }, [orderId, successDeliver])

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order

  const newDate = new Date(paidAt)

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" })
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      )
      dispatch({ type: "DELIVER_SUCCESS", payload: data })
      toast.success("Order is delivered")
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) })
      toast.error(getError(err))
    }
  }

  return (
    <>
      <NavBar />
      <Layout
        title={`Order ${orderId?.substring(
          orderId.length - 4,
          orderId.length
        )}`}
      >
        <h1 className='my-4 text-xl'>{`Order Reference: ${orderId?.substring(
          orderId.length - 4,
          orderId.length
        )}`}</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='alert-error'>{error}</div>
        ) : (
          <div className='lg:grid lg:grid-cols-5 md:gap-5'>
            <div className='lg:col-span-2'>
              <div className='card  p-5'>
                <h2 className='mb-2 text-lg'>Order Summary</h2>
                <ul>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Items</div>
                      <div>€{round2(itemsPrice)}</div>
                    </div>
                  </li>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Shipping</div>
                      <div>€{round2(shippingPrice)}</div>
                    </div>
                  </li>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Total</div>
                      <div>€{round2(totalPrice)}</div>
                    </div>
                  </li>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      {paymentMethod === "Single Month Trial" ? (
                        <></>
                      ) : (
                        <>
                          <div>Reccurring</div>
                          <div>Monthly</div>
                        </>
                      )}
                    </div>
                  </li>

                  {!isPaid && (
                    <Elements stripe={stripePromise}>
                      <Stripe />
                    </Elements>
                  )}
                  {session.user.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <li>
                        {loadingDeliver && <div>Loading...</div>}
                        <button
                          className='primary-button w-full'
                          onClick={deliverOrderHandler}
                        >
                          Order Shipped
                        </button>
                      </li>
                    )}
                </ul>
              </div>
            </div>
            <div className='overflow-x-auto lg:col-span-3'>
              {isPaid ? (
                isDelivered ? (
                  <div className='alert-success'>
                    Delivered at {deliveredAt}
                  </div>
                ) : (
                  <div className='alert-success'>
                    Subscribed on {newDate.toDateString()}. Please check your
                    email for more details. Thank you.
                  </div>
                )
              ) : (
                <div className='alert-warning'>Awaiting Stripe Payment</div>
              )}
              <div className='card  p-5'>
                <h2 className='mb-2 text-lg'>Shipping Address</h2>
                <div>
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </div>
              </div>

              <div className='card overflow-x-auto p-5'>
                <h2 className='mb-2 text-lg'>Order Items</h2>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='px-5 text-left'>Item</th>
                      <th className='p-5 text-right'>Subscription</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems ? (
                      <tr key={orderItems._id} className='border-b'>
                        <td>
                          <Link href={`/product/${orderItems.slug}`}>
                            <a className='flex items-center'>
                              <Image
                                layout='responsive'
                                src={orderItems.image}
                                alt={orderItems.name}
                                width={50}
                                height={50}
                              ></Image>
                              &nbsp;
                              {orderItems.name}
                            </a>
                          </Link>
                        </td>

                        <td className='p-5 text-right'>
                          <div>{paymentMethod}</div>
                        </td>
                      </tr>
                    ) : (
                      "No Subscription Box Selected"
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

OrderScreen.auth = true
export default OrderScreen
