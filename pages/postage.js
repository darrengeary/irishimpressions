import React from "react"
import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import Link from "next/link"

export default function Unauthorized() {
  return (
    <>
      <NavBar />
      <Layout title='Shipping Info'>
        <div className='container mx-auto'>
          <h1 className='text-medium green mt-8 mb-4'>Shipping Information</h1>
          <p className='mb-3 mt-2'>
            Shipping cost starts from €9.99 and is calculated at checkout
            depending on the destination country.
          </p>
          <p className='mb-3 mt-2'>
            We will notify you by email when your subscription box has been
            dispatched with an estimated delivery time. Your boxes will be
            delivered on a regular, recurring basis and we will endeavor to
            ensure that the delivery date is consistent each month from the
            initial setup.
          </p>

          <p className='mb-3 mt-2'>
            If you have not received your subscription box within the estimated
            delivery time, please contact us immediately and we will investigate
            the matter and take the appropriate action.
          </p>

          <h2 className='mt-8'>Damaged or Broken Items</h2>

          <p className='mb-3 mt-2'>
            We take great care and pride in ensuring that each item in our
            subscription box is in perfect condition before being shipped to our
            customers. In the unlikely event that you receive a damaged or
            broken item, please contact us as soon as possible and provide
            photographic evidence of the damage. We will work to provide a
            replacement as quickly as possible.
          </p>

          <h2 className='mt-8'>Dissatisfaction with Products</h2>

          <p className='mb-3 mt-2'>
            We strive to curate the best selection of Irish artisan products for
            our customers, but understand that personal taste can vary. If you
            are not satisfied with a product received, you have the option to
            gift it to a friend or, within seven days of receiving your box, you
            may return the entire box and its contents to us for an extension of
            your subscription by one month at no additional cost. Please note
            that return shipping of the original items must be paid by the
            customer.
          </p>

          <h2 className='mt-8'>Questions</h2>

          <p className='mb-24 mt-2'>
            If you have any questions about our delivery and shipping policy,
            please refer to our <Link href='/terms'>Terms and Conditions</Link>{" "}
            or <Link href='contact'>Contact Us</Link> and we will be happy to
            help.
          </p>
        </div>
      </Layout>
    </>
  )
}
