"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type AdminRouteProps = {
    link: {
        url: string,
        text: string,
        blank: boolean
    }
}

const AdminRoute = ({link}: AdminRouteProps) => {
    const pathname = usePathname()
    const isActive = pathname === link.url
    return (
        <Link
            className={`${isActive? 'bg-yellow-300': ''} font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b`} 
            href={link.url}
            target={link.blank ? '_blank' : ''}
        >
            {link.text}
        </Link>
    )
}

export default AdminRoute
