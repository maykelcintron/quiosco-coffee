"use server"
import { prisma } from "@/src/lib/prisma"
import { UserSchema } from "@/src/schema"

export async function createOrderAction(data: unknown){
    const result = UserSchema.safeParse(data)

    if(!result.success){
        return {
            error: result.error.issues
        }
    }

    try {
      await prisma.order.create({
        data: {
            name: result.data.name,
            total: result.data.total,
            orderProducts: {
                create: result.data.order.map(product => ({
                    productId: product.id,
                    quantity: product.quantity
                }))
            }
        }
      })  
    } catch (error) {
        console.log(error);
    }
}