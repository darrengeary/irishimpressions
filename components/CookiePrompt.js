import React from "react"
import Cookies from "js-cookie"
import { useState, useEffect } from "react"
import Link from "next/link"

const CookiePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const hasOkCookies = Cookies.get("okCookies")
    if (!hasOkCookies) {
      setShowPrompt(true)
    }
  }, [])

  const handleAccept = () => {
    Cookies.set("okCookies", "true", { expires: 365 })
    setShowPrompt(false)
  }

  return (
    showPrompt && (
      <div className='cookie-box fixed bottom-0 w-full pb-5'>
        <div className='mx-auto'>
          <div className='p-2 rounded cookie-bg mx-10 shadow'>
            <div className='flex justify-between items-center w-full'>
              <h3 className='ml-3 py-2 text-white'>
                Cookies are used only for essential functions.&nbsp;&nbsp;
                <Link className='text-white' href='/privacy'>
                  Privacy Policy for more info.
                </Link>
              </h3>
              <button
                type='button'
                onClick={handleAccept}
                className='inline-flex ok items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white cookie-button ease-in-out duration-150'
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default CookiePrompt
