"use client"

import { useStore } from "@/src/zustand/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/utils/formatCurrency"

const OrderSummary = () => {
    const order = useStore(state => state.order)
    const totalPriceOrder = useStore(state => state.totalPriceOrder)

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

            {order.length === 0 ? 
                <p className="mt-5 text-center text-2xl">No hay productos en el carrito</p> 
                    :
                <div className="mt-5">
                    {order.map(item => (
                        <ProductDetails 
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            }
            <p className="text-2xl mt-20 text-center ">
                Total a pagar: <span className="font-bold">{formatCurrency(totalPriceOrder())}</span>
            </p>
        </aside>
    )
}

export default OrderSummary
