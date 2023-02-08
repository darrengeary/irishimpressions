import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import ProductItem from "../components/ProductItem"
import Product from "../models/Product"
import db from "../utils/db"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Link from "next/link"

export default function Home({ products }) {
  return (
    <>
      <img
        layout='responsive'
        className='display'
        src='/images/display.png'
      ></img>
      <div className='banner'>
        <img
          layout='responsive'
          className='banner-text'
          src='/images/head-text.webp'
        ></img>
      </div>
      <NavBar alwaysVisible={false}></NavBar>
      <Layout noContainer={true} title='Home Page'>
        <div className='text-center how-to'>
          <div className='container mx-auto'>
            <h1 className='text-shadow'>How it Works?</h1>
            <h2 className='text-shadow'>
              Uncover the Best of Ireland Delivered at Your Doorstep with our
              Simple Subscription Service.
            </h2>
            <div className='text-shadow2 pt-12 flex grid gap-4 xs:grid-cols-1 md:grid-cols-3'>
              <div>
                <div className='w-max mx-auto'>
                  <img layout='responsive' src='/images/sub.jpg'></img>
                </div>
                <div className='relative flex inline'>
                  <div className='number'>1</div>
                  <h3 className=' text-left'>
                    Browse our curated boxes of products from Irish artisans and
                    producers, and choose the trial, 3 month, 6 month or 12
                    month subscription plan that suits you best.
                  </h3>
                </div>
              </div>
              <div>
                <div className='w-max mx-auto'>
                  <div className='w-max mx-auto'>
                    <img layout='responsive' src='/images/box.jpg'></img>
                  </div>
                </div>
                <div className='relative  flex inline'>
                  <div className='number'>2</div>
                  <h3 className='text-left'>
                    Enjoy the convenience and excitement of receiving a
                    personalized box every month at your doorstep, filled with
                    unique and authentic Irish goodies.
                  </h3>
                </div>
              </div>
              <div>
                <div className='w-max mx-auto'>
                  <div className='w-max mx-auto'>
                    <img layout='responsive' src='/images/girl.jpg'></img>
                  </div>
                </div>
                <div className='relative  flex inline'>
                  <div className='number'>3</div>
                  <h3 className='text-left'>
                    Discover new and exciting products, all while supporting
                    artisans and producers in Ireland with our convenient and
                    hassle-free subscription service.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='cta-container cream-bg grid grid-cols-3  gap-24'>
          <div className='cta-content col-span-1 text-center'>
            <h1 className='cta-title'>
              Be a Monthly Supporter of Irish Food and Crafts!
            </h1>
            <Link href='/boxes'>
              <div className='primary-button button-middle cta-button'>
                Subscribe
              </div>
            </Link>
          </div>
          <img
            layout='responsive'
            src='/images/craft.jpg'
            alt='CTA'
            className='col-span-2 cta-image'
          />
        </div>
        <hr className='mt-20'></hr>
        <Carousel
          className='caro mx-auto'
          showThumbs={false}
          infiniteLoop={true}
          interval={6000}
          autoPlay
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
        >
          <div className='flex'>
            <div className='left-review'>
              <img
                layout='responsive'
                src='/images/left-review.jpg'
                alt='shamrock'
              />
            </div>
            <div className='center-review'>
              <img
                layout='responsive'
                className='stars'
                src='/images/review-stars.jpg'
                alt='shamrock'
              />
              <h1>Jenny Browne</h1>
              <h2>NJ, USA</h2>
              <h3>
                &apos;My grandmother peggy left Ireland to New York in her 20s,
                she came from Arvagh in Cavan. We ordered irish impressions to
                surprise her with a taste of home each month. She couldn&apos;t
                be more happy with the handmade crafts and always has a smile on
                her face when her new box arrives. She especially loves hearing
                the &apos;yarns&apos; or poems included in every box. Thank you
                Irish Impressions&apos;
              </h3>
            </div>
            <div className='right-review'>
              <img
                layout='responsive'
                src='/images/right-review.jpg'
                alt='shamrock'
              />
            </div>
          </div>

          <div className='flex'>
            <div className='left-review'>
              <img
                layout='responsive'
                src='/images/left-review.jpg'
                alt='shamrock'
              />
            </div>
            <div className='center-review'>
              <img
                layout='responsive'
                className='stars'
                src='/images/review-stars.jpg'
                alt='shamrock'
              />
              <h1>Andrew McHugh</h1>
              <h2>Illford, UK</h2>
              <h3>
                &apos;Absolutely loved my Irish artisan subscription box! The
                handcrafted items were unique and beautifully made. The
                selection of products truly captured the essence of Ireland and
                made me feel connected to the culture. Highly recommend to
                anyone looking to discover new Irish artisans and
                products!&apos;
              </h3>
            </div>
            <div className='right-review'>
              <img
                layout='responsive'
                src='/images/right-review.jpg'
                alt='shamrock'
              />
            </div>
          </div>
          <div className='flex'>
            <div className='left-review'>
              <img
                layout='responsive'
                src='/images/left-review.jpg'
                alt='shamrock'
              />
            </div>
            <div className='center-review'>
              <img
                layout='responsive'
                className='stars'
                src='/images/review-stars.jpg'
                alt='shamrock'
              />
              <h1>Mary Shields</h1>
              <h2>St Louis, MO, USA</h2>
              <h3>
                &apos;Irish Impressions subscription box is the best yet! I love
                getting it every month, it&apos;s full of amazing crafts that
                you won&apos;t get anywhere else. It&apos;s like a little piece
                of Ireland delivered through my door. I totally recommend it to
                anyone who wants to discover unique Irish crafts and food while
                supporting true Irish talent.&apos;
              </h3>
            </div>
            <div className='right-review'>
              <img
                layout='responsive'
                src='/images/right-review.jpg'
                alt='shamrock'
              />
            </div>
          </div>
        </Carousel>
        <hr className='mb-12'></hr>
        <div className='container mx-auto'>
          <h1 className='text-center text-medium mb-6 mt-20'>
            Subscription Options
          </h1>
          <div className='grid grid-cols-1 lg:gap-24 md:gap-12 xs:grid-cols-1 lg:mx-24 md:grid-cols-2'>
            {products.map((product) => (
              <ProductItem product={product} key={product.slug}></ProductItem>
            ))}
          </div>
        </div>
        <div className='cta-container cream-bg grid grid-cols-3 mt-20 gap-24'>
          <img
            layout='responsive'
            src='/images/granny.jpg'
            alt='CTA'
            className='col-span-2 cta-image'
          />
          <div className='cta-content col-span-1 '>
            <h1 className='text-center cta-title'>
              100% Satisfaction Guaranteed
            </h1>
            <h3 className='guarantee-text mb-7 pt-0 text-center'>
              If you&apos;re not completely satisfied with your purchase,
              we&apos;ll make it right.
            </h3>
            <Link href='/boxes'>
              <div className='primary-button button-middle cta-button'>
                Subscribe
              </div>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find().lean()
  const featuredProducts = await Product.find({ isFeatured: true }).lean()
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  }
}
