import db from '../config/db.js' // 引入表结构
import elastic from '../config/elastic.js'

const productModel = '../schema/product.js'
const ProductDb = db.Product // 引入数据库
const EsClient = elastic.EsClient;

const Product = ProductDb.import(productModel)

const getProduct = async function () {
  const product = await Product.findAll({
    attributes: ['id', 'name', 'description', 'price']
  })

  return product // 返回数据
}

const getProductone = async function (content) {
  const product = await EsClient.search({
    index: 'productindex',
    type: 'producttype',
    body: {
      query: {
        bool: {
          should: [
            {
              match: {
                name: {
                  query: content,
                  boost: "1000"
                }
              }
            },
            {
              match: {
                description: {
                  query: content
                }
              }
            }
          ]
        }
      }
    }
  }).then(function (body) {
    var hits = body.hits.hits;
  }, function (error) {
    console.trace(error.message);
  });
  console.log(product)
  return product // 返回数据
}

const createProduct = async function (data) {
  await Product.create({
    name: data.name,
    description: data.description,
    price: data.price
  }).then(result => EsClient.create({
    index: 'productindex',
    type: 'producttype',
    id: result.id,
    body: {
      name: data.name,
      description: data.description,
      price: data.price
    }
  }, function (error, response) {
    console.log(error);
    console.log(response);
  }));

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
  getProductone,
  createProduct,
  removeProduct,
  updateProduct
}
