import React, { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { getError } from "../utils/error"
import axios from "axios"
import Layout from "../components/Layout"
import NavBar from "../components/NavBar"

export default function ProfileScreen() {
  const { data: session } = useSession()
  const [addNew, setAddNew] = useState(false)

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("name", session.user.name)
    setValue("email", session.user.email)
  }, [session.user, setValue])

  useEffect(() => {
    setValue("newPassword", "")
    setValue("confirmNewPassword", "")
  }, [addNew])

  const submitHandler = async ({
    name,
    email,
    currentPassword,
    newPassword,
    confirmNewPassword,
  }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword,
      })
      toast.success("Profile updated successfully")
      let result
      if (newPassword) {
        result = await signIn("credentials", {
          redirect: false,
          email,
          password: newPassword,
        })
      }
      if (!newPassword) {
        result = await signIn("credentials", {
          redirect: false,
          email,
          password: currentPassword,
        })
      }
      if (result.error) {
        setValue("currentPassword", "")
        setValue("newPassword", "")
        setValue("confirmNewPassword", "")
        toast.error(result.error)
      }
      setValue("currentPassword", "")
      setAddNew(false)
    } catch (err) {
      setValue("currentPassword", "")
      setValue("newPassword", "")
      setValue("confirmNewPassword", "")
      toast.error(getError(err))
    }
  }

  return (
    <>
      <NavBar />
      <Layout title='Profile'>
        <form
          className='mx-auto max-w-screen-md'
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className='my-4 text-xl'>Update Profile</h1>

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
              className='w-full'
              id='email'
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
            />
            {errors.email && (
              <div className='text-red-500'>{errors.email.message}</div>
            )}
          </div>
          <div className='mb-4'>
            <label htmlFor='password'>Current Password</label>
            <input
              className='w-full'
              type='password'
              id='currentPassword'
              {...register("currentPassword", {
                required: "Please enter password",
                minLength: {
                  value: 8,
                  message: "Current Password is more than 7 characters",
                },
              })}
            />
            {errors.currentPassword && (
              <div className='text-red-500 '>
                {errors.currentPassword.message}
              </div>
            )}
          </div>

          <div
            onClick={() => setAddNew(!addNew)}
            className='pointer purple mb-5'
          >
            {!addNew ? "Change Password" : "Cancel Password Change"}
          </div>
          {addNew && (
            <>
              <div className='mb-4'>
                <label htmlFor='password'>New Password</label>
                <input
                  className='w-full'
                  type='password'
                  id='newPassword'
                  {...register("newPassword", {
                    minLength: {
                      value: 8,
                      message: "Confirm New Password is more than 7 characters",
                    },
                  })}
                />
                {errors.newPassword && (
                  <div className='text-red-500 '>
                    {errors.newPassword.message}
                  </div>
                )}
              </div>

              <div className='mb-4'>
                <label htmlFor='confirmPassword'>Confirm New Password</label>
                <input
                  className='w-full'
                  type='password'
                  id='confirmNewPassword'
                  {...register("confirmNewPassword", {
                    validate: (value) => value === getValues("newPassword"),
                    minLength: {
                      value: 8,
                      message: "Confirm New Password is more than 7 characters",
                    },
                  })}
                />
                {errors.confirmNewPassword && (
                  <div className='text-red-500 '>
                    {errors.confirmNewPassword.message}
                  </div>
                )}
                {errors.confirmNewPassword &&
                  errors.confirmNewPassword.type === "validate" && (
                    <div className='text-red-500 '>
                      New password confirmation does not match
                    </div>
                  )}
              </div>
            </>
          )}
          <div className='mb-4'>
            <button className='primary-button'>Update Profile</button>
          </div>
        </form>
      </Layout>
    </>
  )
}

ProfileScreen.auth = true
