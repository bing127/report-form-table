<template>
  <div class="basic-container"
       :style="styleName"
       :class="{'basic-container--block':block}">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "basicContainer",
  props: {
    radius: {
      type: [String, Number],
      default: 10
    },
    background: {
      type: String
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styleName () {
      return {
        borderRadius: "10px",
        background: "#f0f1f5",
      }
    }
  }
};
</script>

<style lang="scss">
.basic-container {
  padding: 10px 6px;
  box-sizing: border-box;
  height: 100%;
  &--block {
    height: 100%;
    .el-card {
      height: 100%;
    }
  }
  .el-card {
    width: 100%;
    height: 100%;
  }
  .el-card__body{
    height: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
