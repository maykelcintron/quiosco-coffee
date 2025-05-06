import { prisma } from "@/src/lib/prisma"
import Categories from "../ui/Categories"
import Image from "next/image"
import Logo from "../ui/Logo"

const getCategories = async () => await prisma.category.findMany()

const OrderSidebar = async () => {
    const categories = await getCategories()

    return (
        <aside className="w-72 md:h-screen bg-white overflow-y-auto">
            <Logo />
            <nav className="flex flex-col">
                {categories.map(category => (
                    <Categories key={category.id} category={category} />
                ))}
            </nav>
        </aside>
    )
}

export default OrderSidebar
