import { create } from 'zustand'
import { OrderItem } from '../types'
import { Product } from '@/app/generated/prisma'

interface Store{
    order: OrderItem[],
    addToOrder: (Product: Product) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    deleteOrderItem: (id: Product['id']) => void,
    totalPriceOrder: () => number
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const {categoryId, image, ...data} = product

        let order: OrderItem[] = []
        if(get().order.find(item => item.id === product.id)){
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * product.price
            }: item)
        }else{
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price,                                                
            }]
        }

        set(() => ({
            order
        }))

    },
    increaseQuantity: (id) => {
        set(() => ({
            order: get().order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity < 5 ? item.quantity + 1 : item.quantity,
                subtotal:  item.quantity < 5 ? (item.quantity + 1) * item.price : item.subtotal
            }: item)
        }))
    },
    decreaseQuantity: (id) => {
        set(() => ({
            order: get().order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                subtotal: item.quantity > 1 ? (item.quantity - 1) * item.price : item.price
            }: item)
        }))
    },
    deleteOrderItem: (id) => {
        set(() => ({
            order: get().order.filter(item => item.id !== id)
        }))
    },
    totalPriceOrder: () =>  get().order.reduce((total, item) => total + item.subtotal, 0)
}))