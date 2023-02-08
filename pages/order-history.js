import axios from "axios"
import Link from "next/link"
import React, { useEffect, useReducer } from "react"
import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import { getError } from "../utils/error"
import { XCircleIcon } from "@heroicons/react/outline"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  })

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/orders/history`)
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) })
      }
    }
    fetchOrders()
  }, [])
  return (
    <>
      <NavBar />
      <Layout title='Order History'>
        <div className='my-12'>
          <h1 className='mb-4 text-xl'>Order History</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='alert-error'>{error}</div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                <thead className='border-b'>
                  <tr>
                    <th className='px-5 text-left'>ID</th>
                    <th className='p-5 text-left'>START</th>
                    <th className='p-5 text-left'>DURATION</th>
                    <th className='p-5 text-left'>TOTAL</th>
                    <th className='p-5 text-left'>SHIPPING</th>
                    <th className='p-5 text-left'>NEXT DELIVERY</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <Link key={index} href={`/order/${order._id}`} passHref>
                      <tr key={order._id} className='border-b pointer'>
                        <td className=' p-5 purple'>
                          {order._id.substring(20, 24)}
                        </td>
                        <td className=' p-5 '>
                          {order.isPaid ? (
                            `${order.paidAt.substring(0, 10)}`
                          ) : (
                            <XCircleIcon className='arrow red' />
                          )}
                        </td>
                        <td className=' p-5 '>
                          {order.paymentMethod != "Single Month Trial"
                            ? order.paymentMethod.substring(
                                0,
                                order.paymentMethod.length - 13
                              ) + "'s"
                            : order.paymentMethod}
                        </td>
                        <td className=' p-5 '>€{order.itemsPrice} / month</td>
                        <td className=' p-5 '>
                          €{order.shippingPrice} / month
                        </td>

                        <td className=' p-5 '>
                          {order.isPaid ? (
                            order.isDelivered ? (
                              `${order.deliveredAt.substring(0, 10)}`
                            ) : (
                              <div>TBC</div>
                            )
                          ) : (
                            <XCircleIcon className='arrow red' />
                          )}
                        </td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

OrderHistoryScreen.auth = true
export default OrderHistoryScreen
