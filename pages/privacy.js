import React from "react"
import Layout from "../components/Layout"
import NavBar from "../components/NavBar"

export default function Privacy() {
  return (
    <>
      <NavBar />
      <Layout title='Terms and Conditions'>
        <div className='mx-auto container mb-24'>
          <h1 className='text-medium underline mt-8 mb-4 green'>
            Cookie Policy
          </h1>
          <h2 className='mb-2'>
            Our website uses cookies to enhance the user experience and provide
            essential functionality. Cookies are small text files that are
            stored on your device when you visit our website.
          </h2>
          <h2 className='mb-2'>
            We use cookies for several purposes, including user authentication.
            When you sign in to our website, a cookie will be placed on your
            device to keep you logged in and to remember your shopping cart
            information. We also use cookies to store information related to
            shipping and payment methods during the checkout process. This
            information is essential for completing an order and ensuring a
            smooth checkout experience for our users.
          </h2>
          <h2 className='mb-2'>
            By using our website, you agree to our use of cookies for these
            purposes. You may change your cookie preferences at any time by
            adjusting your browser settings.
          </h2>
          <h1 className='text-medium underline mt-8 mb-4 green'>
            Privacy Policy
          </h1>
          <h2 className='mb-2'>
            Syfo (the business registered in Ireland with registration number
            714844) respects your privacy and is committed to protecting your
            personal data. This privacy policy sets out how Syfo uses and
            protects any information that you give us when you use our Service.
            It also outlines the ways in which we may use, share, and store your
            personal data. By using our Service, you agree to the collection and
            use of information in accordance with this policy.{" "}
          </h2>
          <h2 className='mb-2'>
            We may collect and process personal data about you when you create
            an account, purchase a subscription, or contact us with a request
            for assistance. This data may include, but is not limited to, your
            name, email address, billing address, phone number, payment
            information, and product preferences.
          </h2>
          <h2 className='mb-2'>We may use your personal information to: </h2>
          <h2 className='mb-2'>
            • Process and fulfill your subscription order{" "}
          </h2>
          <h2 className='mb-2'>• Respond to your requests </h2>
          <h2 className='mb-2'>• Send you promotional materials </h2>
          <h2 className='mb-2'>• Improve our Service </h2>
          <h2 className='mb-2'>• Monitor customer service inquiries </h2>
          <h2 className='mb-2'>
            We will not share your personal information with any third parties,
            except where required by law or with your express consent. We take
            reasonable steps to protect your personal data from unauthorized
            access or disclosure. However, no method of transmission over the
            Internet or methods of storage are highly secure. Therefore, while
            we strive to use commercially acceptable means to protect your
            personal data, we cannot guarantee its absolute security. We cannot
            and do not accept any responsibility or liability for the security
            of your personal data transmitted to our Service or for your use of
            the Service.{" "}
          </h2>
          <h2 className='mb-2'>
            This privacy policy may be updated from time to time. We will notify
            you of any changes by email. If you have any questions about our
            privacy policy, please feel free to contact us.{" "}
          </h2>{" "}
        </div>
      </Layout>
    </>
  )
}
