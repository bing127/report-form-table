<template>
  <el-dialog
    title="预览表格"
    v-show="show"
    :visible.sync="show"
    @close="onConfirm"
    width="30%"
  >
    <GeneratorTable v-if="data" :tree_data="data[0]" :border-color="borderColor"
                :border-width="borderWidth"
                :deep="0" />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="onConfirm"
        >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import GeneratorTable from "./GeneratorTable";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => []
   },
   borderColor: {
      type: String,
      default: "#000000",
    },
    borderWidth: {
      type: Number,
      default: 1,
    },
  },
  components: {
    GeneratorTable,
  },
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="scss" scoped></style>
