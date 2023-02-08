import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import ProductItem from "../components/ProductItem"
import React, { useReducer, useEffect } from "react"
import { getError } from "../utils/error"
import axios from "axios"

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" }
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" }
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
export default function Search() {
  const [{ products }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  })

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" })
        const { data } = await axios.get(`/api/products`)
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
      <Layout title='All Boxes'>
        <div className='md:grid md:gap-4 lg:gap-12 md:mx-8 my-12 md:grid-cols-2'>
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </Layout>
    </>
  )
}
