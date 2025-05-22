"use client"

import { SearchProductSchema } from "@/src/schema"
import { redirect, useRouter } from "next/navigation"
import { toast } from "react-toastify"

const ProductSearchForm = () => {
    const router = useRouter()

    const handleSearchProduct = (formData: FormData) => {
        const search = formData.get("search")

        const result = SearchProductSchema.safeParse({ search })
        
        if(!result.success) {
            result.error.issues.forEach(issue => toast.error(issue.message))
            return
        }

        router.push(`/admin/search?search=${search}`)
    }

    return (
        <form 
            action={handleSearchProduct}
            className="flex items-center">
            <input
                type="text"
                placeholder="Buscar producto..."
                className="p-2 placeholder-gray-400 w-full"
                name="search"
            />
            <button
                type="submit"
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
                value={"Buscar"}
            >
                Buscar
            </button>
        </form>
    )
}

export default ProductSearchForm
