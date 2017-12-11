<template>



  <div class="tTable container body-content">
    <div class="form-group">
      <div class="form-group">
        <div class="page-header">
          商品列表
        </div>

        <table class="table table-bordered table-responsive table-striped">
          <thead>
          <tr>
            <th>编号</th>
            <th>商品名</th>
            <th>商品描述</th>
            <th>价格</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in arrayData">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.description}}</td>
            <td>{{item.price}}</td>
          </tr>
          </tbody>
        </table>
        <div class="pager" id="pager">
                    <span class="form-inline">
                        <select class="form-control" v-model="pagesize" v-on:change="showPage(pageCurrent,$event,true)" number>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </span>
          <span v-for="item in pageCount+1">
                        <span v-if="item==1" class="btn btn-default" v-on:click="showPage(1,$event)" :class="{'disabled':fDisabled}">
                            首页
                        </span>
                        <span v-if="item==1" class="btn btn-default" v-on:click="showPage(pageCurrent-1,$event)" :class="{'disabled':fDisabled}">
                            上一页
                        </span>
                        <span v-if="item==1" class="btn btn-default" v-on:click="showPage(item,$event)">
                            {{item}}
                        </span>
                        <span v-if="item==1&&item<showPagesStart-1" class="btn btn-default disabled">
                            ...
                        </span>
                        <span v-if="item>1&&item<=pageCount-1&&item>=showPagesStart&&item<=showPageEnd&&item<=pageCount" class="btn btn-default" v-on:click="showPage(item,$event)">
                            {{item}}
                        </span>
                        <span v-if="item==pageCount&&item>showPageEnd+1" class="btn btn-default disabled">
                            ...
                        </span>
                        <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(item,$event)"  >
                            {{item}}
                        </span>
                        <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCurrent+1,$event)" :class="{'disabled':lDisabled}">
                            下一页
                        </span>
                        <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCount,$event)" :class="{'disabled':lDisabled}">
                            尾页
                        </span>
                    </span>
          <span>{{pageCurrent}}/{{pageCount}}</span>
        </div>
      </div>
    </div>
  </div>

</template>
<script >
  export default {

    data () {
      return {
        fDisabled: false,
        lDisabled: false,
        totalCount: 200,
        pageCount: 20,
        pageCurrent: 1,
        pagesize: 10,
        showPages: 11,
        showPagesStart: 1,
        showPageEnd: 100,
        arrayData: []
      }
    },
    methods: {
      showPage (pageIndex, $event, forceRefresh) {

        if (pageIndex > 0) {
          if (pageIndex > this.pageCount) {
            pageIndex = this.pageCount;
          }
          var currentPageCount = Math.ceil(this.totalCount / this.pagesize);
          if (currentPageCount !== this.pageCount) {
            pageIndex = 1;
            this.pageCount = currentPageCount;
          }
          else if (this.pageCurrent == pageIndex && currentPageCount == this.pageCount && typeof (forceRefresh) == "undefined") {
            console.log("not refresh");
            return;
          }

          //处理分页点中样式
          var buttons = $("#pager").find("span");
          for (var i = 0; i < buttons.length; i++) {
            if (buttons.eq(i).html() != pageIndex) {
              buttons.eq(i).removeClass("active");
            }
            else {
              buttons.eq(i).addClass("active");
            }
          }

          //测试数据 随机生成的
          var newPageInfo = [];
          const getProduct = this.$http.get('/api/product/');
          console.log("ok");
          getProduct
            .then((res) => {
              if (res.status === 200) {
                console.log("ok2");
                this.pageCurrent = pageIndex;
                this.arrayData = res.data.result
                console.log(this.arrayData);
              } else {
                this.$message.error('获取列表失败！')
              }
            }, (err) => {
              this.$message.error('获取列表失败！')
              console.log(err)
            });
          console.log("ok3");

          /*for (var i = 0; i < newPageInfo.length; i++) {
            newPageInfo[newPageInfo.length] = {
              id: i+1,
              name: "test",
              description: "sfs",
              price: "58"
            };
          }*/

          //如果当前页首页或者尾页，则上一页首页就不能点击，下一页尾页就不能点击
          if(this.pageCurrent===1){
            this.fDisabled=true;
          }else if(this.pageCurrent===this.pageCount){
            this.lDisabled=true;
          }else{
            this.fDisabled=false;
            this.lDisabled=false;
          }

          //计算分页按钮数据
          if (this.pageCount > this.showPages) {
            if (pageIndex <= (this.showPages - 1) / 2) {
              this.showPagesStart = 1;
              this.showPageEnd = this.showPages - 1;
              console.log("showPage1")
            }
            else if (pageIndex >= this.pageCount - (this.showPages - 3) / 2) {
              this.showPagesStart = this.pageCount - this.showPages + 2;
              this.showPageEnd = this.pageCount;
              console.log("showPage2")
            }
            else {
              console.log("showPage3")
              this.showPagesStart = pageIndex - (this.showPages - 3) / 2;
              this.showPageEnd = pageIndex + (this.showPages - 3) / 2;
            }
          }
          console.log("showPagesStart:" + this.showPagesStart + ",showPageEnd:" + this.showPageEnd + ",pageIndex:" + pageIndex);
        }
      }
    },
    mounted () {
      this.showPage(this.pageCurrent, null, true);
    },
    computed: {
    }
  }
</script>


