"use client"

import useSWR from "swr"
import OrderCard from "@/components/order/OrderCard"
import Heading from "@/components/ui/Heading"
import { OrderWithProducts } from "@/src/types"


const OrdersPage = () => {
    const url = '/admin/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })

    if (isLoading) return <p className="text-center">Cargando...</p>
    if (error) return <p className="text-center">Error al cargar las ordenes</p>

    return (
    <>
        <Heading>
            Administrar Ordenes
        </Heading>

        {data?.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                {data.map((order) => (
                    <OrderCard 
                        key={order.id} 
                        order={order} 
                    />
                ))}
            </div>
        ): 
            <p className="text-center">No hay ordenes pendientes</p>
        }
    </>
    )
}

export default OrdersPage
