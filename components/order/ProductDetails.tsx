import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/utils/formatCurrency"
import { useStore } from "@/src/zustand/store"

type ProductDetailsProps = {
    item: OrderItem
}   

const ProductDetails = ({item}: ProductDetailsProps) => {
    const increaseQuantity = useStore(state => state.increaseQuantity)
    const decreaseQuantity = useStore(state => state.decreaseQuantity)
    const deleteOrderItem = useStore(state => state.deleteOrderItem)

    return (
        <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button
                    type="button"
                    onClick={() => deleteOrderItem(item.id)}
                    >
                    <XCircleIcon className="text-red-600 h-8 w-8"/>
                    </button>
            </div>
            <p className="text-2xl text-yellow-500 font-black">
                {formatCurrency(item.price)}
            </p>
            <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                <button
                type="button"
                onClick={() => decreaseQuantity(item.id)}
                >
                    <MinusIcon className="h-6 w-6"/>
                </button>

                <p className="text-lg font-black ">
                    {item.quantity}
                </p>

                <button
                type="button"
                onClick={() => increaseQuantity(item.id)}
                >
                    <PlusIcon className="h-6 w-6"/>
                </button>
            </div>
            <p className="text-xl font-black text-gray-700">
                Subtotal: {formatCurrency(item.subtotal)}
                <span className="font-normal"> 

                </span>
            </p>
            </div>
        </div>
    )
}

export default ProductDetails
