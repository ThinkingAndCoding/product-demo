import db from '../config/db.js' // 引入表结构
import elastic from '../config/elastic.js'

const productModel = '../schema/product.js'
const ProductDb = db.Product // 引入数据库
const EsClient = elastic.EsClient;

const Product = ProductDb.import(productModel)

const getProduct = async function () {
  EsClient.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
  }, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });

  const product = await Product.findAll({
    attributes: ['id', 'name', 'description', 'price']
  })

  return product // 返回数据
}

const createProduct = async function (data) {
  await Product.create({
    name: data.name,
    description: data.description,
    price: data.price
  })
  return true
}

const removeProduct = async function (id) {
  const result = await Product.destroy({
    where: {
      id
    }
  })
  return result === 1 // 如果成功删除了记录，返回1，否则返回0
}

const updateProduct = async function (id, price) {
  const result = await Product.update(
    {
      price
    },
    {
      where: {
        id
      }
    }
  )
  return result[0] === 1 // 返回一个数组，更新成功的条目为1否则为0。由于只更新一个条目，所以只返回一个元素
}

export default {
  getProduct,
  createProduct,
  removeProduct,
  updateProduct
}
