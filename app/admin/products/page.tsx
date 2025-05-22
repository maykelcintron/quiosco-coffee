import ProductSearchForm from "@/components/product/ProductSearchForm";
import ProductsPagination from "@/components/product/ProductsPagination";
import ProductTable from "@/components/product/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

const getProductsCount = async () => await prisma.product.count()

const getProducts = async (page: number) => {
    const products = await prisma.product.findMany({
        take: 10,
        skip: ((page - 1) * 10),
        include: {
            category: true,
        },
    });

    return products
}

const ProductsPage = async ({searchParams}: {searchParams: {page: string}}) => {
    const page = +searchParams.page || 1
    
    if(page < 1) redirect(`/admin/products`)

    const [products, count] = await Promise.all([getProducts(page), getProductsCount()])
    
    if(page > (Math.ceil(count / 10))) redirect(`/admin/products`)    

    
    return (
        <>
            <Heading>
                Administrar Productos
            </Heading>

            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <Link
                    href="/admin/products/new"
                    className="bg-yellow-300 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
                >Crear Producto</Link>

                <ProductSearchForm />
            </div>

            <ProductTable
                products={products}
            />

            <ProductsPagination 
                page={page}
                totalPages={Math.ceil(count / 10)}
            />
        </>
    )
}

export default ProductsPage
