/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import React from "react"

const round2 = (num) =>
  (Math.round(num * 100 + Number.EPSILON) / 100).toFixed(2)

export default function ProductItem({ product }) {
  return (
    <div className='card'>
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            layout='responsive'
            src={product.image}
            alt={product.name}
            className='rounded shadow green-bg object-cover product-height w-full'
          />
        </a>
      </Link>
      <div className='flex flex-col items-center mb-4 mt-2 pt-5 justify-center'>
        <Link href={`/product/${product.slug}`}>
          <a>
            <h1 className='green hover-purple text-medium'>{product.name}</h1>
          </a>
        </Link>
        <h2 className='py-1 text-lg'>{product.english}</h2>
        <h3 className='italic mb-4'>
          from €{round2(product.yearPrice)} per Month
        </h3>
        <Link href={`/product/${product.slug}#peek`}>
          <a className='purple mb-4'>
            Peek inside
            {" " +
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                1
              ).toLocaleString("default", { month: "long" }) +
              "'s "}
            Box
          </a>
        </Link>
      </div>
    </div>
  )
}
