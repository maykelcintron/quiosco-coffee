"use client"
import LastOrderItem from "@/components/order/LastOrderItem"
import Logo from "@/components/ui/Logo"
import { OrderWithProducts } from "@/src/types"
import useSWR from "swr"

const OrdersPage = () => {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })

    if (isLoading) return <p className="text-center">Cargando...</p>
    if (error) return <p className="text-center">Error al cargar las ordenes</p>

    return (
    <>
        <h1 className="text-5xl text-center font-semibold mt-20 mb-4">Ordenes Listas</h1>
        <Logo />

        {data?.length ? (
            <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
                {data.map((order) => (
                    <LastOrderItem
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
            
        ) : <p className="text-center">No hay ordenes listas</p>}
    </>
    )
}

export default OrdersPage
