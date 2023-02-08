import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import Layout from "../../components/Layout"
import NavBar from "../../components/NavBar"
import Product from "../../models/Product"
import db from "../../utils/db"
import { Store } from "../../utils/Store"
import { ArrowRightIcon, ArrowUpIcon } from "@heroicons/react/outline"
import Cookies from "js-cookie"

function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return dimensions
}

const handleTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export default function ProductScreen(props) {
  const round2 = (num) =>
    num % 1 == 0
      ? Math.round(num * 100 + Number.EPSILON) / 100
      : (Math.round(num * 100 + Number.EPSILON) / 100).toFixed(2)

  const meanachContent = [
    {
      key: 0,
      name: "Doogan Pure Wool Socks",
      image: "/images/socks.jpg",
      description:
        "Made from pure Irish wool this pair of socks makes for a comfortable wear. Produced here in Donegal from high-quality materials this pair of socks is very durable and long-lasting. Perfect to use for going on long walks but equally as comfy wearing them if your lounging around the house.",
    },
    {
      key: 1,
      name: "Gran Grans Raspberry Jam",
      image: "/images/jam.jpg",
      description:
        "Indulge in a taste of summer with Gran Grans Raspberry Jam. This delicately tart and fruity spread is perfect for adding a burst of flavor to your favorite desserts, or mix with olive oil, salt, and red wine vinegar for a delicious vinaigrette. Made with a traditional homemade recipe passed down for generations, each jar of Raspberry Jam is brimming with wholesome, natural ingredients for a taste that's both nostalgic and oh-so-delicious. Whether you're spreading it on your morning toast or using it to elevate your baking game, this jam is sure to be a summer favorite.",
    },
    {
      key: 2,
      name: "Irish Sheep Dog Art",
      image: "/images/dog.jpg",
      description:
        "Bring a touch of Ireland's beauty into your home with these stunning prints by artist Jane Dunn, a talented artist from Co. Mayo. Inspired by her visits to Lunasa, each image showcases the unique beauty and charm of the local area. With Jane's studio offering breathtaking views of a river valley in North Mayo, these cards are a testament to her passion and artistic prowess.",
    },
  ]
  const morContent = [
    {
      key: 0,
      name: "Fantastical Tales from Irish Folklore",
      image: "/images/book.jpg",
      description:
        "Discover the rich, mystical folklore of Ireland. Experience the timeless tales of legendary heroes and epic battles passed down through generations through fireside chats and songs. Explore a world of wonder with some of Ireland's most cherished tales, still relatively unknown to the rest of the world. Get ready to be transported to the mystical land of Ireland.",
    },
    {
      key: 1,
      name: "Doogan Pure Wool Socks",
      image: "/images/socks.jpg",
      description:
        "Made from pure Irish wool this pair of socks makes for a comfortable wear. Produced here in Donegal from high-quality materials this pair of socks is very durable and long-lasting. Perfect to use for going on long walks but equally as comfy wearing them if your lounging around the house.",
    },
    {
      key: 2,
      name: "Real Irish Turf Bag",
      image: "/images/turf.jpg",
      description:
        "Bring a piece of Ireland's rich history into your home with these charming Bog Buddies! Each hemp bag contains 5 mini sods of Irish turf, carefully harvested from non-conservation worthy bogs and supported by the Irish Peatland Conservation Council. Take a step back in time as you breathe in the sweet aroma of burning turf, a staple of Irish homes for centuries. This unique and quirky gift comes with a detailed leaflet explaining the history and usage of Irish turf, making it a perfect keepsake for anyone who loves Ireland's cultural heritage.",
    },
    {
      key: 3,
      name: "Donegal Seaweed Soap",
      image: "/images/soap.jpg",
      description:
        "Treat yourself to a luxurious, nutrient-rich spa experience with this handcrafted soap made with organic Donegal seaweed. The finely ground seaweed provides a wealth of vitamins and minerals, while the addition of Borage Seed Oil, rich in skin-regenerating gamma-linolenic acid (GLA), makes it perfect for those with dry or sensitive skin. Indulge in the ultimate pampering session with this soap, made with love and care to provide you with a nourishing and rejuvenating skin experience.",
    },
    {
      key: 4,
      name: "Gran Grans Raspberry Jam",
      image: "/images/jam.jpg",
      description:
        "Indulge in a taste of summer with Gran Grans Raspberry Jam. This delicately tart and fruity spread is perfect for adding a burst of flavor to your favorite desserts, or mix with olive oil, salt, and red wine vinegar for a delicious vinaigrette. Made with a traditional homemade recipe passed down for generations, each jar of Raspberry Jam is brimming with wholesome, natural ingredients for a taste that's both nostalgic and oh-so-delicious. Whether you're spreading it on your morning toast or using it to elevate your baking game, this jam is sure to be a summer favorite.",
    },
    {
      key: 5,
      name: "Donegal Rapeseed Oil",
      image: "/images/oil.jpg",
      description:
        "Experience the superior flavor of locally sourced ingredients with our multi-award winning Donegal Rapeseed Oil. Made just a few miles from our business, this pure, cold-pressed oil is made with seed grown on unique soil, giving it a distinct and delicious flavor. With a high burn point and numerous health benefits, this versatile oil is perfect for all your cooking needs, whether you're frying, baking, roasting, or more. Discover the taste of Donegal with this premium, multi-award winning oil.",
    },
    {
      key: 6,
      name: "Irish Sheep Dog Art",
      image: "/images/dog.png",
      description:
        "Bring a touch of Ireland's beauty into your home with these stunning prints by artist Jane Dunn, a talented artist from Co. Mayo. Inspired by her visits to Lunasa, each image showcases the unique beauty and charm of the local area. With Jane's studio offering breathtaking views of a river valley in North Mayo, these cards are a testament to her passion and artistic prowess.",
    },
  ]

  const { product } = props
  const { state, dispatch } = useContext(Store)
  const router = useRouter()
  const { width } = useWindowDimensions()

  const { cart } = state
  const [isSelected, setSelected] = useState("3 Month Subscription")
  const [contents, setContents] = useState([])

  useEffect(() => {
    product.name.substring(10, 13) === "ach"
      ? setContents(meanachContent)
      : setContents(morContent)
  }, [product])

  if (!product) {
    return (
      <>
        <NavBar />
        <Layout title='Product Not Found'>Product Not Found</Layout>;
      </>
    )
  }
  const addToCartHandler = async () => {
    if (isSelected) {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: isSelected })
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          paymentMethod: isSelected,
        })
      )
      dispatch({ type: "CART_ADD_ITEM", payload: { product } })
      router.push("/register?redirect=/shipping")
    } else {
      toast.error("Please Select a Subscription Type")
    }
  }

  return (
    <>
      <NavBar />
      <Layout noContainer={false} title={product.name}>
        <div className='lg-container mx-auto'>
          <h3 className='py-2'>
            <Link href='/' className='purple'>
              Go Back
            </Link>
          </h3>
          <div className='lg:grid grid-cols-2 gap-8'>
            <div className='col-span-1'>
              <div>
                <h1 className='main-text green'>{product.name}</h1>
                <h2 className='mb-2'>{product.english}</h2>
                <div className='grid grid-cols-2 p-1 py-4 gap-1 text-left bg-white rounded-lg shadow'>
                  <div
                    className={`mb-4 py-8 bux items-center ${
                      isSelected === "Single Month Trial" ? "selected-sub" : ""
                    }`}
                    onClick={() => setSelected("Single Month Trial")}
                  >
                    <h3>Single Month Trial</h3>
                    <div className='font-medium flex text-green-500'>
                      <div className='euro'>€</div>
                      {round2(product.monthPrice)} per box
                    </div>
                  </div>
                  <div
                    className={`mb-4 py-8 relative bux items-center ${
                      isSelected === "3 Month Subscription"
                        ? "selected-sub"
                        : ""
                    }`}
                    onClick={() => setSelected("3 Month Subscription")}
                  >
                    <h3>3 Month Subscription</h3>
                    <div className='py-1 px-2 offer-popular absolute rounded-full text-white'>
                      Most Popular
                    </div>
                    <div className='font-medium flex text-green-500'>
                      <div className='euro'>€</div>
                      {round2(product.threeMonthPrice)} per box
                    </div>
                  </div>
                  <div
                    className={`mb-4 py-8 bux items-center ${
                      isSelected === "6 Month Subscription"
                        ? "selected-sub"
                        : ""
                    }`}
                    onClick={() => setSelected("6 Month Subscription")}
                  >
                    <h3>6 Month Subscription</h3>

                    <div className='font-medium flex text-green-500'>
                      <div className='euro'>€</div>
                      {round2(product.sixMonthPrice)} per box
                    </div>
                  </div>
                  <div
                    className={`mb-4 relative bux py-8 items-center ${
                      isSelected === "12 Month Subscription"
                        ? "selected-sub"
                        : ""
                    }`}
                    onClick={() => setSelected("12 Month Subscription")}
                  >
                    <h3>12 Month Subscription</h3>
                    <span className='py-1 px-2 offer-best pink-bg rounded-full text-white'>
                      Best Value
                    </span>
                    <div className='font-medium flex text-green-500'>
                      <div className='euro'>€</div>
                      {round2(product.yearPrice)} per box
                    </div>
                  </div>
                  <div
                    onClick={addToCartHandler}
                    className='col-span-2 checkout-button pointer flex primary-button'
                  >
                    Proceed to Checkout &nbsp;&nbsp;
                    <ArrowRightIcon className='arrow'></ArrowRightIcon>
                  </div>
                </div>
              </div>
            </div>

            <div className='md:mt-0 mt-12 mb-12'>
              <ul>
                <li>
                  <h1 className='text-lg  my-5'>Description:</h1>
                </li>
                <li>
                  {product.description.split("\n").map((e, index) => (
                    <p key={index + 1000} className='my-3'>
                      {e}
                    </p>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <div id='peek'></div>
          <h1 id='peek' className='my-12 mb-6 text-center text-xl'>
            Peek Inside Last Months Box
          </h1>
          {width < 768
            ? contents.map((product, index) => (
                <>
                  <div key={index} className='grid md:grid-cols-2 md:gap-12'>
                    <div>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={20}
                        height={10}
                        className='content-image'
                        layout='responsive'
                      ></Image>
                    </div>
                    <div className='content-info'>
                      <div>
                        <h1 className='text-lg'>{product.name}</h1>
                        <h2>{product.description}</h2>
                      </div>
                    </div>
                  </div>
                  <hr className='my-12'></hr>
                </>
              ))
            : contents.map((product, index) => (
                <div key={index}>
                  <div key={index} className='grid md:grid-cols-2 md:gap-24'>
                    <div className={index % 2 === 0 ? "order-2" : "order-1"}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={20}
                        height={10}
                        className='content-image'
                        layout='responsive'
                        key={index}
                      ></Image>
                    </div>
                    <div
                      className={
                        index % 2 === 0
                          ? "order-1 content-info"
                          : "order-2 content-info"
                      }
                      key={index}
                    >
                      <div key={index}>
                        <h1 className='text-lg'>{product.name}</h1>
                        <h2>{product.description}</h2>
                      </div>
                    </div>
                  </div>
                  <hr className='my-12'></hr>
                </div>
              ))}
        </div>
        <div
          className='flex justify-center my-12 purple pointer '
          onClick={handleTop}
        >
          <ArrowUpIcon className='w-5'></ArrowUpIcon>
          <br></br>
          <h3 className='p-0 ml-3'>Show Subscriptions</h3>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  }
}
