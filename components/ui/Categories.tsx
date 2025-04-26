import { Category } from "@/app/generated/prisma/client/index"
import Image from "next/image"
import Link from "next/link"

type CategoriesIconProps = {
    category: Category
}

const Categories = ({category}: CategoriesIconProps) => {
    return (
        <div 
            className="flex items-center h-24 gap-5 p-4 border-t last-of-type:border-b border-gray-200 hover:bg-yellow-300 cursor-pointer"
        >
            <Image 
                width={64}
                height={64}
                src={`/icon_${category.slug}.svg`}
                alt="category icon"
            />
            <Link 
                className="text-xl font-bold"
                href={`/order/${category.slug}`}
            >{category.name}
            </Link>
        </div>
    )
}

export default Categories
