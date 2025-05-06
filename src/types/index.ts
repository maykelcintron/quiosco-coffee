import { Order, OrderProducts } from "@/app/generated/prisma"
import { Product } from "@/app/generated/prisma/client/index"

export type OrderItem = Omit<Product, 'image' | 'categoryId'> & {
    quantity: number
    subtotal: number
}

export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}