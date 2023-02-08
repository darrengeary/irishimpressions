import Head from "next/head"
import Link from "next/link"
import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Layout({ title, noContainer, children }) {
  return (
    <>
      <Head>
        <title>
          {title ? title + " - Irish Impressions" : "Irish Impressions"}
        </title>
        <meta name='description' content='Ecommerce Website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ToastContainer
        position='top-center'
        className='toast-pos'
        hideProgressBar={false}
        limit={4}
      />
      <div className='top-main flex min-h-screen flex-col justify-between '>
        <main className={noContainer ? "" : "container mx-auto"}>
          {children}
        </main>

        <footer className='footer-div  text-white'>
          <div>
            <div className='flex justify-center items-center shadow-inner'>
              <img
                layout='responsive'
                className='w-40 mt-24'
                src='/images/footer.png'
              ></img>
            </div>
            <div className='grid grid-cols-3 text-center my-12 gap-2'>
              <Link href='/postage'>
                <div className='pointer'>Shipping Info</div>
              </Link>
              <Link href='/terms'>
                <div className='pointer'>Terms & Conditions</div>
              </Link>
              <Link href='/privacy'>
                <div className='pointer'>Privacy Policy</div>
              </Link>
            </div>
            <div className='flex justify-center items-center text-center pt-8 items-center shadow-inner'>
              <p className='flex'>E-Commerce by</p>
              <a
                className='flex items-center'
                target='_blank'
                rel='noreferrer'
                href='https://syfo.ie'
              >
                <img
                  layout='responsive'
                  className='mr-2 ml-3 w-7'
                  src='/images/syfo.png'
                ></img>
                <p className='purple'>Syfo Solutions</p>
              </a>
            </div>
            <p className='mt-8 items-center justify-center mx-auto flex mb-2'>
              Copyright {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
