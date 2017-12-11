import product from '../models/product.js'

const getProduct = async function (ctx) {
  const result = await product.getProduct() // 通过await “同步”地返回查询结果
  ctx.body = {
    success: true,
    result // 将请求的结果放到response的body里返回
  }
}

const createProduct = async function (ctx) {
  const data = ctx.request.body
  const success = await product.createProduct(data)
  ctx.body = {
    success
  }
}

const removeProduct = async function (ctx) {
  const id = ctx.params.id
  const success = await product.removeProduct(id)

  ctx.body = {
    success
  }
}

const updateProduct = async function (ctx) {
  const id = ctx.params.id
  let price = ctx.params.price

  const success = await product.updateProduct(id, price)

  ctx.body = {
    success
  }
}

export default {
  getProduct,
  createProduct,
  removeProduct,
  updateProduct
}
