import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import axios from "axios"

function Stripe() {
  const [loadingPay, setLoadingPay] = useState(false)
  const [isPaid, setPaid] = useState(false)
  const stripe = useStripe()
  const { query } = useRouter()
  const orderId = query.id
  const elements = useElements()
  const router = useRouter()

  const createSubscription = async () => {
    setLoadingPay(true)
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        card: elements.getElement("card"),
        type: "card",
      })
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          paymentMethod: paymentMethod.paymentMethod.id,
        }),
      })
      if (!response.ok) {
        setLoadingPay(false)
        return toast.error("Stripe: Payment unsuccessful!")
      }
      const data = await response.json()
      const confirm = await stripe.confirmCardPayment(data.clientSecret)

      if (confirm.error) {
        setLoadingPay(false)
        return toast.error("Payment unsuccessful!")
      }
      toast("Stripe: Payment Successful!")
      setPaid(true)
      try {
        await axios.post(`/api/pay`, {
          orderId,
        })
        router.reload()
      } catch (err) {
        console.error(err)
        toast.error(
          "Payment Received but issue updating order, Please contact support!"
        )
      }
    } catch (err) {
      console.error(err)
      toast.error("Stripe: Payment failed!")
      setLoadingPay(false)
    }
  }

  return (
    <>
      {!isPaid ? (
        <div className='stripe-container'>
          <div className='stripecard'>
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    iconColor: "white",
                    color: "white",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                      color: "#9c9c9c",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
              className='stripecardelement'
            ></CardElement>
          </div>
          {loadingPay ? (
            <div className='disabled-pay flex text-center mt-4 justify-center align-center my-auto pointer'>
              <div className='my-0.5 stripe-text text-white'>Processing...</div>
            </div>
          ) : (
            <div
              onClick={createSubscription}
              className='stripe disabled flex text-center mt-4 justify-center align-center my-auto pointer'
            >
              <div className='mt-0.5 stripe-text text-white'>Pay with</div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='60'
                height='30'
                fillRule='evenodd'
                fill='white'
                viewBox='0 0 40 20'
              >
                <path d='M33.849 10.313c0 -1.962 -0.95 -3.51 -2.767 -3.51 -1.823 0 -2.927 1.548 -2.927 3.494 0 2.307 1.303 3.471 3.172 3.471 0.912 0 1.602 -0.207 2.123 -0.498v-1.533c-0.521 0.261 -1.119 0.421 -1.877 0.421 -0.743 0 -1.402 -0.261 -1.487 -1.165h3.747c0 -0.1 0.015 -0.498 0.015 -0.682zM30.067 9.586c0 -0.866 0.529 -1.226 1.012 -1.226 0.467 0 0.966 0.36 0.966 1.226zm-4.866 -2.782c-0.751 0 -1.233 0.352 -1.502 0.598l-0.1 -0.475H21.91v8.935l1.916 -0.406 0.008 -2.169c0.276 0.199 0.682 0.483 1.357 0.483 1.372 0 2.621 -1.1 2.621 -3.533 -0.008 -2.222 -1.272 -3.433 -2.613 -3.433zm-0.46 5.28c-0.452 0 -0.72 -0.161 -0.904 -0.36l-0.008 -2.843c0.199 -0.222 0.475 -0.375 0.912 -0.375 0.697 0 1.18 0.782 1.18 1.785 0 1.027 -0.475 1.793 -1.18 1.793zm-5.467 -5.732l1.923 -0.413V4.383l-1.923 0.406zm0 0.582h1.923v6.705h-1.923zm-2.062 0.567l-0.123 -0.567h-1.655V13.64h1.916V9.095c0.452 -0.59 1.218 -0.483 1.456 -0.398v-1.762c-0.245 -0.092 -1.142 -0.261 -1.594 0.567zm-3.831 -2.233L11.512 5.667l-0.008 6.138c0 1.134 0.851 1.969 1.985 1.969 0.628 0 1.088 -0.115 1.341 -0.253v-1.556c-0.245 0.1 -1.456 0.452 -1.456 -0.682V8.567h1.456v-1.632h-1.457zm-5.18 3.609c0 -0.299 0.245 -0.413 0.651 -0.413a4.283 4.283 0 0 1 1.9 0.49V7.157c-0.636 -0.253 -1.264 -0.352 -1.9 -0.352 -1.556 0 -2.59 0.812 -2.59 2.169 0 2.115 2.912 1.778 2.912 2.69 0 0.352 -0.307 0.467 -0.736 0.467 -0.636 0 -1.448 -0.261 -2.092 -0.613v1.823c0.713 0.307 1.433 0.433 2.092 0.433 1.594 0 2.69 -0.789 2.69 -2.161 -0.008 -2.283 -2.927 -1.877 -2.927 -2.736z' />
              </svg>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default Stripe
