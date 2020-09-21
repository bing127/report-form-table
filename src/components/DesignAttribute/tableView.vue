<template>
  <el-form ref="form" :model="form" label-width="100px" label-position="left">
      <el-form-item label="表格边框颜色" prop="borderColor">
         <el-color-picker v-model="form.borderColor" show-alpha @change="handleChange()"></el-color-picker>
      </el-form-item>
      <el-form-item label="表格边框宽" prop="borderWidth">
         <el-input-number v-model="form.borderWidth" size="small" :min="1" :max="10" @change="handleChange()"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import Bus from "../../utils/bus.js";
export default {
  data() {
    return {
      form: {
        borderColor: '#000',
        borderWidth: 1,
      }
    }
  },
  beforeDestroy () {
      Bus.$off('changeTable')
  },
  methods: {
    onReset() {
      this.$refs['form'].resetFields();
      Bus.$emit("changeTable",{
        borderColor: '#000',
        borderWidth: 1
      })
    },
    handleChange() {
        Bus.$emit("changeTable",this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form{
  padding:0 10px;
  box-sizing:border-box;
}
</style>