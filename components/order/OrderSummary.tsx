"use client"

import { useStore } from "@/src/zustand/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/utils/formatCurrency"
import { createOrderAction } from "@/actions/create-order-action"
import { UserSchema } from "@/src/schema"
import { toast } from "react-toastify"

const OrderSummary = () => {
    const order = useStore(state => state.order)
    const totalPriceOrder = useStore(state => state.totalPriceOrder)

    const handleCreateOrder = (formData: FormData) => {
        const data = {
            name: formData.get('name')
        }

        const result = UserSchema.safeParse(data)

        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
        }

        // createOrderAction()
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

            {order.length === 0 ? 
                <p className="mt-5 text-center text-2xl">El pedido esta vacio</p> 
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

            <form 
                action={handleCreateOrder}
                className="w-full mt-10 space-y-5"
            >
                <input 
                    type="text" 
                    placeholder="Tu Nombre"
                    className="bg-white border border-gray-100 p-2 w-full"
                    name="name"
                />

                <input 
                    type="submit"
                    className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold" 
                    value="Confirmar Pedido" 
                />
            </form>
        </aside>
    )
}

export default OrderSummary
