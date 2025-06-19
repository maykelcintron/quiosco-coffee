import EditProductForm from "@/components/product/EditProductForm"
import ProductForm from "@/components/product/ProductForm"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

const getProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if(!product){
        notFound()
    }

    return product
}


const EditProductPage = async ({params}: {params: {id: string}}) => {
    const product = await getProductById(+params.id)
    console.log(product)
    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>

            <Link
                href='/admin/products'
                className="bg-yellow-300 text-black px-6 py-3 text-sm text-center font-bold cursor-pointer w-full lg:w-auto"
            >Volver a Productos</Link>

            <EditProductForm>
                <ProductForm 
                    product={product}
                />
            </EditProductForm>
        </>
    )
}

export default EditProductPage
