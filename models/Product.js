import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    english: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    monthPrice: { type: Number, required: true },
    threeMonthPrice: { type: Number, required: true },
    sixMonthPrice: { type: Number, required: true },
    yearPrice: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema)
export default Product
