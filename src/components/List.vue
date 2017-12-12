<template>

  <div class="tTable container body-content">
    <div class="form-group">
      <div class="form-group">
        <div class="page-header">
          商品列表
        </div>
        <div class="input-group col-md-3" style="margin-top:0px;positon:relative">
          <input type="text" class="form-control"placeholder="关键字" v-model="content">
          <span class="input-group-btn">
             <button class="btn btn-info btn-search" @click="searchProduct(content)">查找</button>
             <button class="btn btn-info btn-search" style="margin-left:3px" @click="insert">添加</button>
          </span>
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
            <td><button class="btn btn-info btn-search"  @click="update(item)">修改</button>
              <button class="btn btn-info btn-search" @click="remove(item)">删除</button></td>
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
        <input type="hidden" class="form-control" placeholder="id" v-model="productid" >
        <input type="text" class="form-control" placeholder="价格" v-model="productprice" >
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
        <input type="text" class="form-control" placeholder="商品名" v-model="iname" >
        <input type="text" class="form-control" placeholder="描述" v-model="idescription" >
        <input type="text" class="form-control" placeholder="价格" v-model="iprice" >
      </div>
      <div slot="footer">
        <button class="btn btn-info btn-search"  @click="saveinsert(iname, idescription, iprice)">保存</button>
      </div>
    </bootstrap-modal>
  </div>

</template>

<script >
  export default {
    data () {
      return {
        productid: '',
        productprice: '',
        arrayData: []
      }
    },
    methods: {
      showPage () {
        //测试数据 随机生成的
        const getProduct = this.$http.get('/api/product/');
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
          });
      },
      searchProduct (content) {
        if (content == null || content == '') {
          this.showPage () ;
        } else {
          this.$http.get('/api/productone/' + content)
            .then((res) => {
              if (res.status === 200) {
                let result = res.data.result
                const product = new Array();
                for (var i=0; i<result.length; i++){
                  let obj = {};
                  obj.name = result[i]._source.name;
                  obj.description = result[i]._source.description;
                  obj.price = result[i]._source.price;
                  obj.id = result[i]._id;
                  product.push(obj);
                }
                this.arrayData = product;
              } else {
                this.$message.error('查询失败！')
              }
            }, (err) => {
              this.$message.error('查询失败！');
              console.log(err)
            })
        }
      },
      update (data) {
        this.productid = data.id;
        this.productprice = data.price;
        this.$refs.updateModal.open();
      },
      saveupdate () {
        this.$http.put('/api/product/' + this.productid + '/' + this.productprice);
        this.$refs.updateModal.close();
        this.showPage();
      },
      insert () {
        this.$refs.insertModal.open();
      },
      saveinsert (iname, idescription, iprice) {
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
              this.$refs.insertModal.close();
              this.showPage();
            } else {
              this.$message.error('创建失败！')
            }
          }, (err) => {
            this.$message.error('创建失败！')
            console.log(err)
          });

      },
      remove (data) {
        this.$http.delete('/api/product/' + data.id)
          .then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '任务删除成功！'
              });
              this.showPage();
            } else {
              this.$message.error('任务删除失败！')
            }
          }, (err) => {
            this.$message.error('任务删除失败！')
            console.log(err)
          })
    }},
    mounted () {
      this.showPage();
    },
    components: {
      'bootstrap-modal': require('vue2-bootstrap-modal')
    },
    computed: {
    }
  }
</script>


