import ProductSearchForm from "@/components/product/ProductSearchForm"
import ProductTable from "@/components/product/ProductTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

const searchProducts = async (search: string) => {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: search,
                mode: "insensitive"
            }
        },
        include: {
            category: true
        }
    })

    return products
}

const SearchPage = async ({searchParams}: {searchParams: {search: string}}) => {
    
    const products = await searchProducts(searchParams.search)
    
    return (
        <>
            <Heading>Resultados de Busqueda: {searchParams.search} </Heading>

            <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
                <ProductSearchForm />
            </div>

            {products.length? (
                <ProductTable 
                    products={products}
                />
            
            ) : 
                <div className="text-center mt-4">
                    <h3 className="text-xl font-medium">No se encuentran resultados</h3>
                </div>
            }
            
        </>
    )
}

export default SearchPage