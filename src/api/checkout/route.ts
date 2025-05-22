import { useStore } from '@/src/zustand/store'
import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
const secret = process.env.PAYPAL_CLIENT_SECRET!

const environment = new paypal.core.SandboxEnvironment(clientId, secret)
const client = new paypal.core.PayPalHttpClient(environment)


// Usa el tipo en el código
export async function POST() {
    const order = useStore(state => state.order);
    const totalPriceOrder = useStore(state => state.totalPriceOrder);
    
    const orderItems = order.map((item) => ({
        name: item.name,
        unit_amount: {
            currency_code: 'USD',
            value: item.price.toString(),
        },
        quantity: item.quantity.toString()
    }))

    const request = new paypal.orders.OrdersCreateRequest();

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: '100.00',
                },
                //@ts-ignore
                items: orderItems
            }
        ]
    });

    const response = await client.execute(request);

    return NextResponse.json({
        id: response.result.id
    }) 
}
