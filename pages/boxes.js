import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import ProductItem from "../components/ProductItem"
import Product from "../models/Product"
import db from "../utils/db"

const PAGE_SIZE = 2

export default function Search(props) {
  const { products } = props

  return (
    <>
      <NavBar />
      <Layout title='search'>
        <div className='md:grid md:gap-4 lg:gap-12 md:mx-8 my-12 md:grid-cols-2'>
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const pageSize = query.pageSize || PAGE_SIZE
  const page = query.page || 1
  const searchQuery = query.query || ""

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {}
  await db.connect()

  const productDocs = await Product.find({
    ...queryFilter,
  }).lean()

  const countProducts = await Product.countDocuments({
    ...queryFilter,
  })

  await db.disconnect()
  const products = productDocs.map(db.convertDocToObj)

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    },
  }
}
