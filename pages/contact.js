import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import axios from "axios"
import sanitize from "sanitize-html"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import { getError } from "../utils/error"

export default function Contact() {
  const { data: session } = useSession()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name)
      setValue("email", session.user.email)
    }
  }, [session, setValue])

  const submitHandler = async ({ name, email, message }) => {
    const sanName = sanitize(name)
    const sanEmail = sanitize(email)
    const sanMessage = sanitize(message)

    try {
      if (sanName && sanEmail && sanMessage) {
        await axios.post(`/api/contact`, {
          sanName,
          sanEmail,
          sanMessage,
        })
        toast.success("Message Received")
      } else {
        toast.error("Message Blocked for Security Reasons")
      }
      setValue("message", "")
    } catch (err) {
      toast.error(getError(err))
    }
  }

  return (
    <>
      <NavBar />
      <Layout title='Contact'>
        <div className='mx-auto my-12 w-full md:w-3/4 lg:w-1/2 xl:w-1/2'>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='cream-bg p-8 rounded-lg'>
              <h1 className='text-medium underline mt-8 mb-4 green'>
                Contact Us
              </h1>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 font-medium mb-2'
                  htmlFor='name'
                >
                  Name
                </label>
                <input
                  className='bg-white appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500'
                  type='text'
                  id='name'
                  autoFocus
                  {...register("name", {
                    required: "Please enter name",
                  })}
                />
                {errors.name && (
                  <div className='text-red-500'>{errors.name.message}</div>
                )}
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 font-medium mb-2'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='bg-white appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500'
                  type='email'
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid email",
                    },
                  })}
                  id='email'
                />
                {errors.email && (
                  <div className='text-red-500'>{errors.email.message}</div>
                )}
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 font-medium mb-2'
                  htmlFor='message'
                >
                  Message
                </label>
                <textarea
                  className='bg-white appearance-none border-2 border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500'
                  id='message'
                  rows='8'
                  type='message'
                  {...register("message", {
                    required: "Please enter message",
                  })}
                ></textarea>
                {errors.message && (
                  <div className='text-red-500'>{errors.message.message}</div>
                )}
              </div>
              <div className='flex items-center justify-center'>
                <div className='mb-4 '>
                  <button className='primary-button'>Send Message</button>
                </div>
              </div>
              <h4 className='text-center mt-4'>
                We will reply via email as soon as possible.
              </h4>
            </div>
          </form>
        </div>
      </Layout>
    </>
  )
}
