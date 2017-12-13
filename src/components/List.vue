<template>
  <div class="tTable container body-content">
    <div class="form-group">
      <div class="form-group">
        <div class="page-header">
          <div class="input-group col-md-3">
            <input type="text" class="form-control"placeholder="关键字" v-model="content"　@keyup.enter="searchProduct(content)">
            <span class="input-group-btn">
             <button class="btn btn-info btn-search" @click="searchProduct(content)">查找</button>
             <button class="btn btn-info btn-search" style="margin-left:3px" @click="insert">添加</button>
            </span>
          </div>
        </div>
        <table class="table table-bordered table-responsive table-striped">
          <thead>
          <tr>
            <th>编号</th>
            <th>商品名</th>
            <th>商品描述</th>
            <th>价格</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in arrayData">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.description}}</td>
            <td>{{item.price}}</td>
            <td><button class="btn btn-info btn-primary"  @click="update(item)">修改</button>
              <button class="btn btn-info btn-danger" @click="remove(item)">删除</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <bootstrap-modal ref="updateModal" :need-header="true" :need-footer="true" :size="large" >
      <div slot="title">
        编辑
      </div>
      <div slot="body">
        <div class="row">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">价格：</label>
              <div class="col-sm-5">
                <input type="hidden" class="form-control" placeholder="id" v-model="uid" >
                <input type="text" class="form-control" placeholder="价格" v-model="uprice" v-verify.update="uprice">
                <p class="help-block" v-verified="verifyError.uprice"></p>
              </div>
            </div>
          </form>
        </div>

      </div>
      <div slot="footer">
        <button class="btn btn-info btn-search"  @click="saveupdate">保存</button>
      </div>
    </bootstrap-modal>

    <bootstrap-modal ref="insertModal" :need-header="true" :need-footer="true" :size="large" >
      <div slot="title">
        新增
      </div>
      <div slot="body">
        <div class="row">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">商品名：</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" placeholder="商品名" v-model="iname" v-verify.insert="iname">
                <p class="help-block" v-verified="verifyError.iname"></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">描述：</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" placeholder="描述" v-model="idescription">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">价格：</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" placeholder="价格" v-model="iprice" v-verify.insert="iprice">
                <p class="help-block" v-verified="verifyError.iprice"></p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-info btn-search"  @click="saveinsert(iname, idescription, iprice)">保存</button>
      </div>
    </bootstrap-modal>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        iname: '',
        iprice: '',
        idescription: '',
        uid: '',
        uprice: '',
        arrayData: []
      }
    },
    methods: {
      showPage () {
        const getProduct = this.$http.get('/api/product/')
        getProduct
          .then((res) => {
            if (res.status === 200) {
              this.arrayData = res.data.result
            } else {
              this.$message.error('获取列表失败！')
            }
          }, (err) => {
            this.$message.error('获取列表失败！')
            console.log(err)
          })
      },
      searchProduct (content) {
        if (content == null || content === '') {
          this.showPage()
        } else {
          this.$http.get('/api/productone/' + content)
            .then((res) => {
              if (res.status === 200) {
                let result = res.data.result
                const product = []
                for (var i = 0; i < result.length; i++) {
                  let obj = {}
                  obj.name = result[i]._source.name
                  obj.description = result[i]._source.description
                  obj.price = result[i]._source.price
                  obj.id = result[i]._id
                  product.push(obj)
                }
                this.arrayData = product
              } else {
                this.$message.error('查询失败！')
              }
            }, (err) => {
              this.$message.error('查询失败！')
              console.log(err)
            })
        }
      },
      update (data) {
        this.uid = data.id
        this.uprice = data.price
        this.$refs.updateModal.open()
      },
      saveupdate () {
        if (this.$verify.check('update')) {
          this.$http.put('/api/product/' + this.uid + '/' + this.uprice)
            .then((res) => {
              this.$refs.updateModal.close()
              this.showPage()
            })
        } else {
          this.$message.error('请校验参数！')
        }
      },
      insert () {
        this.$refs.insertModal.open()
      },
      saveinsert (iname, idescription, iprice) {
        if (this.$verify.check('insert')) {
          let obj = {
            name: iname,
            description: idescription,
            price: iprice
          }
          this.$http.post('/api/product/', obj)
            .then((res) => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '创建成功！'
                })
                this.iname = ''
                this.iprice = ''
                this.idescription = ''
                this.$refs.insertModal.close()
                this.showPage()
              } else {
                this.$message.error('创建失败！')
              }
            }, (err) => {
              this.$message.error('创建失败！')
              console.log(err)
            })
        } else {
          this.$message.error('请校验参数！')
        }
      },
      remove (data) {
        this.$http.delete('/api/product/' + data.id)
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
              this.showPage()
            } else {
              this.$message.error('删除失败！')
            }
          }, (err) => {
            this.$message.error('删除失败！')
            console.log(err)
          })
      }},
    mounted () {
      this.showPage()
    },
    verify: {
      iname: [
        'required',
        {
          test (val) {
            if (val.length < 2) {
              return false
            }
            return true
          },
          message: '名称不得小于2位'
        }
      ],
      iprice: [
        'required',
        {
          test (val) {
            if (isNaN(val)) {
              return false
            }
            return true
          },
          message: '价格需为数字'
        }
      ],
      uprice: [
        'required',
        {
          test (val) {
            if (isNaN(val)) {
              return false
            }
            return true
          },
          message: '价格需为数字'
        }
      ]
    },
    components: {
      'bootstrap-modal': require('vue2-bootstrap-modal')
    },
    computed: {
      verifyError () {
        return this.$verify.$errors
      }
    }
  }
</script>


