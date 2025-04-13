import products from '@/data/products.json'

//trae un producto por id
export function findProductById(id: string) {
  const product = products.find(p => p.id.toString() === id)
  if (!product) return null
  return product
}
//trae un producto por nombre
export function findProductByName(name: string) {
  const product = products.find(p => p.name.toString() === name)
  if (!product) return null
  return product
}
//trae los productos relacionados (relacionados por categoria)
export function getRelatedProducts(productId: string) {
  const product = findProductById(productId)
  if (!product) return null

  const related = products.filter(
    (p) => p.category === product.category && p.id.toString() !== productId
  )
  return related
}

//trae los productos paginados y filtrados por categoria
export function getPaginatedProducts({ name,category, page = 1, limit = 10 }: {
  name?:string
  category?: string
  page?: number
  limit?: number
}) {
  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (name) {
    filtered = filtered.filter((p) => p.name.includes(name));
  }

  const start = (page - 1) * limit
  const paginated = filtered.slice(start, start + limit)

  return {
    products: paginated,
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit)
  }
}
