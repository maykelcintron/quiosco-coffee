"use server"

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

const completeOrder = async (formData: FormData) => {
    const orderId = formData.get("orderId")!;

    try {
        await prisma.order.update({
            where: {
                id: +orderId,
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now()),
            },
        });

        revalidatePath("/admin/orders");
    } catch (error) {
        console.error("Error completing order:", error);
    }
}

export default completeOrder