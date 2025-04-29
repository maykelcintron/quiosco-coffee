import { Product } from "@/app/generated/prisma"
import { formatCurrency } from "@/utils/formatCurrency"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardsProps = {
    product: Product
}

const ProductCard = ({product}: ProductCardsProps) => {
    return (
        <div className="border border-black/10 bg-white">
            <Image 
                width={500}
                height={500}
                src={`/products/${product.image}.jpg`}
                alt="Product Image"
                quality={100}
            />
            <div className="p-5">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-yellow-500">
                    {formatCurrency(product.price)}
                </p>

                <AddProductButton 
                    product={product} 
                />
            </div>
        </div>
    )
}

export default ProductCard
