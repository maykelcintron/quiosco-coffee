import { Product } from "@/app/generated/prisma/client/index"

export type OrderItem = Omit<Product, 'image' | 'categoryId'> & {
    quantity: number
    subtotal: number
}