"use client"

import { Product } from "@/app/generated/prisma"
import { useStore } from "@/src/zustand/store"

type AddProductButtonProps = {
    product: Product
}

const AddProductButton = ({product}: AddProductButtonProps) => {
    const addToOrder = useStore(state => state.addToOrder)
  return (
    <button
        onClick={() => addToOrder(product)}
        type="button"
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        >Agregar
    </button>
  )
}

export default AddProductButton
