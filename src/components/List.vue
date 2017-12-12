<template>

  <div class="tTable container body-content">
    <div class="form-group">
      <div class="form-group">
        <div class="page-header">
          商品列表
        </div>
        <div class="input-group col-md-3" style="margin-top:0px;positon:relative">
          <input type="text" class="form-control"placeholder="请输入字段名" v-model="content">
          <span class="input-group-btn">
             <button class="btn btn-info btn-search" @click="searchProduct(content)">查找</button>
             <button class="btn btn-info btn-search" style="margin-left:3px">添加</button>
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


    <bootstrap-modal ref="theModal" :need-header="false" :need-footer="false" :size="large" :opened="myOpenFunc">
      <div slot="title">
        Your title here
      </div>
      <div slot="body">
        Your body here
      </div>
      <div slot="footer">
        Your footer here
      </div>
    </bootstrap-modal>
  </div>

</template>

<script >
  export default {

    data () {
      return {
        arrayData: []
      }
    },
    methods: {
      showPage () {
        //测试数据 随机生成的
        const getProduct = this.$http.get('/api/product/');
        console.log("ok");
        getProduct
          .then((res) => {
            if (res.status === 200) {
              console.log("ok2");
              this.arrayData = res.data.result
              console.log(this.arrayData);
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
        this.$refs.theModal.open();
        //this.$http.put('/api/product/' + data.id + '/' + data.price)

      },
      myOpenFunc () {
        console.log('hello');
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


