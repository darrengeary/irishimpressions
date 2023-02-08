import Link from "next/link"
import React, { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import { getError } from "../utils/error"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import axios from "axios"

export default function LoginScreen() {
  const { data: session } = useSession()

  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/")
    }
  }, [router, session, redirect])

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm()
  const submitHandler = async ({
    name,
    email,
    password,
    acceptedTermsAndPrivacyPolicies,
  }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        acceptedTermsAndPrivacyPolicies,
      })

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }
  return (
    <>
      <NavBar />
      <Layout title='Create Account'>
        <form
          className='mx-auto my-12 max-w-screen-md'
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className='mb-4 text-xl'>Create Account</h1>
          <div className='mb-4'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              className='w-full'
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
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
              className='w-full'
              id='email'
            ></input>
            {errors.email && (
              <div className='text-red-500'>{errors.email.message}</div>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 8,
                  message: "Confirm password is more than 7 character's",
                },
              })}
              className='w-full'
              id='password'
            ></input>
            {errors.password && (
              <div className='text-red-500 '>{errors.password.message}</div>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              className='w-full'
              type='password'
              id='confirmPassword'
              {...register("confirmPassword", {
                required: "Please enter confirm password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 8,
                  message: "Confirm password is more than 7 character's",
                },
              })}
            />
            {errors.confirmPassword && (
              <div className='text-red-500 '>
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className='text-red-500 '>Password do not match</div>
              )}
          </div>
          <div className='mb-4'>
            <input
              className='mr-2'
              type='checkbox'
              {...register("acceptedTermsAndPrivacyPolicies", {
                required: "Please accept terms and conditions",
              })}
            />
            <label htmlFor='acceptedTermsAndPrivacyPolicies'>
              I accept the&nbsp;
              <a href='/terms' target='_blank'>
                terms and conditions
              </a>
              &nbsp;and&nbsp;
              <a href='/privacy' target='_blank'>
                privacy policy.
              </a>
            </label>
            {errors.acceptedTermsAndPrivacyPolicies && (
              <div className='text-red-500'>
                {errors.acceptedTermsAndPrivacyPolicies.message}
              </div>
            )}
          </div>
          <div className='mb-4 '>
            <button className='primary-button'>Register</button>
          </div>
          <h2 className='mb-4'>
            Already have an account with us? &nbsp;
            <Link
              className='purple'
              href={`/login?redirect=${redirect || "/"}`}
            >
              Login Now
            </Link>
          </h2>
        </form>
      </Layout>
    </>
  )
}
