import { prisma } from "@/src/lib/prisma"
import Categories from "../ui/Categories"
import Image from "next/image"

const getCategories = async () => await prisma.category.findMany()

const OrderSidebar = async () => {
    const categories = await getCategories()

    return (
        <aside className="w-72 md:h-screen bg-white">
            <Image 
                width={250}
                height={250}
                src="/logo.svg"
                alt="logo"
                className="mb-8 object-cover p-5 mx-auto"
            />
            <nav className="flex flex-col">
                {categories.map(category => (
                    <Categories key={category.id} category={category} />
                ))}
            </nav>
        </aside>
    )
}

export default OrderSidebar
