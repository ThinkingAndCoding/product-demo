import api from '../controllers/product.js'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/product', api.getProduct)
router.get('/productone/:content', api.getProductone)
router.post('/product', api.createProduct)
router.delete('/product/:id', api.removeProduct)
router.put('/product/:id/:price', api.updateProduct)

export default router
