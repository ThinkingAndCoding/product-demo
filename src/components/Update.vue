<script type="text/x-template" id="modal-template-update">
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            信息查看
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">姓名</label>
                                <div class="col-sm-8">
                                    <input type="text" name="name"  class="form-control" v-model="myTagUpdateR.name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">年纪</label>
                                <div class="col-sm-8">
                                    <input type="text" name="age"  class="form-control" v-model="myTagUpdateR.age">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">性别</label>
                                <div class="col-sm-8">
                                    <input type="text" name="sex"  class="form-control" v-model="myTagUpdateR.sex">
                                </div>
                            </div>
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <button class=" btn btn-primary" @click="$emit('update')"  :msg = 'myTagUpdateR'>提交 </button>
                        <button class="modal-default-button btn btn-primary" @click="$emit('close')">放弃</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</script>
