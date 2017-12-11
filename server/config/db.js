import '../../env'
import Sequelize from 'sequelize'

const Product = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost/postgres`, {
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
})

export default {
  Product
}
