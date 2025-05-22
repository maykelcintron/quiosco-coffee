import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'

const Paypal = () => {
    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                currency: 'USD',
                intent: 'capture'
            }}
        >
            <PayPalButtons
                style={
                    {
                        color: 'gold',
                        shape: 'rect',
                        label: 'pay',
                        height: 50
                    }
                }
                createOrder={async (data, actions) => {
                    const order = await fetch('/api/checkout', {
                        method: 'POST',
                    })

                    const response = await order.json()
                    console.log(response)
                    return response.id
                }}
                onApprove={async () => {
                    toast.success('Pago realizado correctamente')
                }}
                onCancel={(data) => {
                    toast.error('Pago cancelado')
                    console.log(data)
                }}
            />
        </PayPalScriptProvider>
    )
}

export default Paypal
