import AddProductForm from '@/components/product/AddProductForm'
import ProductForm from '@/components/product/ProductForm'
import Heading from '@/components/ui/Heading'

const CreateProductPage = () => {
  return (
    <>
      <Heading>Nuevo Producto</Heading>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  )
}

export default CreateProductPage
