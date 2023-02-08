import { useRouter } from "next/router"
import React from "react"
import Layout from "../components/Layout"
import NavBar from "../components/NavBar"

export default function Unauthorized() {
  const router = useRouter()
  const { message } = router.query

  return (
    <>
      <NavBar />
      <Layout noContainer={false} title='Unauthorized Page'>
        <div className=''></div>
        <h1 className='text-xl'>Access Denied</h1>
        {message && <div className='mb-4 text-red-500'>{message}</div>}
      </Layout>
    </>
  )
}
