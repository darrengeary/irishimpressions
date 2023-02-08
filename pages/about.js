import React from "react"

import Layout from "../components/Layout"
import NavBar from "../components/NavBar"

export default function Contact() {
  return (
    <>
      <NavBar />
      <Layout title='About'>
        <div className='mx-auto my-12 w-full md:w-3/4 lg:w-1/2 xl:w-1/2'>
          <h1 className='green text-medium'>About Us</h1>

          <div className='about'>
            <div id='floated'>
              <img
                layout='responsive'
                src='/images/dog.webp'
                className='dog-image'
                alt='Donegal'
              />{" "}
              <div className='text-center text-xs italic'>
                Pepper the Sprollie, Donegal.
              </div>
            </div>

            <p>
              Welcome to Irish Impressions, a subscription box service brought
              to you by the owner of a small business based in the beautiful
              county of Donegal, Ireland.
            </p>
            <p>
              We are a small team of passionate individuals who have a deep love
              and appreciation for the unique culture and traditions of Ireland.
              We wanted to share this with others, and thus, Irish Impressions
              was born.
            </p>
            <p>
              Our subscription service offers an unparalleled selection of the
              finest and most unique Irish-made products, including food and
              crafts, that are carefully curated and directly sourced from the
              dedicated and passionate crafter&apos;s and artisans from all
              across the island.
            </p>
            <p>
              We take great pride in personally handpicking and discussing each
              item with the artisans to ensure that only the highest quality and
              most authentic products are included in our boxes. Our goal is to
              provide a true taste of Ireland, and we are committed to
              delivering a one-of-a-kind experience right to your doorstep,
              every time. So, you can be sure that you will receive a selection
              of unique and high-quality products that capture the essence of
              Ireland and its culture, every month.
            </p>
            <p>
              {" "}
              We offer a single trial month option as well as flexible
              subscription options for you to choose from. Our two box options,
              the &apos;Bosca Meanach&apos; and the &apos;Bosca Mor&apos;, are
              filled with a selection of products that we personally handpick
              with care.
            </p>

            <p>
              We&apos;re excited to have you join us on this journey and to
              share our love of Ireland with you. Thank you for choosing Irish
              Impressions!
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}
