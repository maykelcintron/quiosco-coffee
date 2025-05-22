import Link from "next/link"

type ProductPaginationProps = {
    totalPages: number
    page: number
}

const ProductsPagination = ({totalPages, page}: ProductPaginationProps) => {
  const pages = Array.from({length: totalPages}, (_, i) => i + 1)

  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
            href={`/admin/products?page=${page - 1}`}
            className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >&laquo;</Link>
      )}

      {pages.map((p) => (
        <Link
            key={p}
            href={`/admin/products?page=${p}`}
            className={`bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${p === page ? 'bg-yellow-300' : ''} font-bold`}
        >{p}</Link>
      ))}

      {page < totalPages && (
        <Link
            href={`/admin/products?page=${page + 1}`}
            className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >&raquo;</Link>
      )}
    </nav>
  )
}

export default ProductsPagination
