<template>
  <el-form ref="form" :model="form" label-width="110px" label-position="left">
      <el-form-item label="后端对应参数" prop="params">
        <el-input v-model="form.params" size="small" @input="handleChange" placeholder="请输入参数"></el-input>
      </el-form-item>
      <el-form-item label="小标题参数" prop="subParams">
        <el-input v-model="form.subParams" size="small" @input="handleChange" placeholder="请输入参数"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" size="small" @input="handleChange" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="小标题" prop="subTitle">
        <el-input v-model="form.subTitle" size="small" @input="handleChange" placeholder="请输入小标题"></el-input>
      </el-form-item>
      <el-form-item label="宽度" prop="width">
        <el-input v-model="form.width" @input="handleChange" size="small" placeholder="请输入宽度"></el-input>
      </el-form-item>
      <el-form-item label="高度" prop="height">
        <el-input-number v-model="form.height" @change="handleChange" size="small" :min="1" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="字体颜色" prop="fontColor">
        <el-color-picker v-model="form.fontColor" @change="handleChange" size="small" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="字体大小" prop="fontSize">
        <el-input-number v-model="form.fontSize" @change="handleChange" size="small" :min="1" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="字体加粗" prop="fontWeight">
        <el-select v-model="form.fontWeight" @change="handleChange" placeholder="请选择" size="small">
          <el-option
            v-for="item in fontWeightList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题对齐方式" prop="textAlign">
        <el-radio-group @change="handleChange" v-model="form.textAlign" size="small">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="center">居中</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="小标题对齐方式" prop="subTextAlign">
        <el-radio-group @change="handleChange" v-model="form.subTextAlign" size="small">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="center">居中</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否使用input" prop="input">
        <el-switch
          @change="handleChange"
          v-model="form.input"
          active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否使用文本域" prop="textarea">
        <el-switch
          @change="handleChange"
          v-model="form.textarea"
          active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item @blur="handleChange" label="额外样式(对象)" size="small" prop="extraStyle">
        <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 10}"
            placeholder="请输入内容,例如：fontWeight: 500;逗号分隔"
            v-model="form.extraStyle">
          </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import Bus from "../../utils/bus.js";
export default {
  name: "AttrView",
  data() {
    return {
      show: true,
      fontWeightList: [
        {
          value: "normal",
          label: "标准",
        },
        {
          value: "bold",
          label: "粗体",
        },
        {
          value: "bolder",
          label: "更粗",
        },
        {
          value: "lighter",
          label: "更细",
        },
        {
          value: "100",
          label: "100",
        },
        {
          value: "200",
          label: "200",
        },
        {
          value: "300",
          label: "300",
        },
        {
          value: "400",
          label: "400",
        },
        {
          value: "500",
          label: "500",
        },
        {
          value: "600",
          label: "600",
        },
        {
          value: "700",
          label: "700",
        },
        {
          value: "800",
          label: "800",
        },
        {
          value: "900",
          label: "900",
        },
      ],
      form: {
        params: "",
        title: "",
        subtitle: "",
        width: "100%",
        height: 40,
        fontColor: "#000",
        subTextAlign: "center",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "normal",
        id: "",
        pId: "",
        subParams: null,
        input: false,
        textarea: false,
        isInput: false
      },
      oldForm: {
      }
    };
  },
  // beforeDestroy () {
  //     Bus.$off('changeTableDataValue')
  // },
  mounted() {
    Bus.$on("changeTableNode", (e) => {
      this.show = e.id !== '1' ? true : false
      const jsonData = {
        title: e.title,
        subtitle: e.subTitle,
        width: e.width,
        height: parseInt(e.height),
        fontColor: e.fontColor,
        subTextAlign: e.subTextAlign,
        textAlign: e.align,
        fontSize: parseInt(e.fontSize),
        fontWeight: e.fontWeight,
        id: e.id,
        pId: e.pId,
        input: e.isInput ? ( e.slotType === 'input' ? true : false ) : false,
        textarea: e.isInput ? ( e.slotType === 'textarea' ? true : false ) : false,
        isInput: e.isInput ? true : false,
        subParams: e.subParams,
        params: e.params
      };
      this.form = jsonData
      this.oldForm = jsonData
    });
  },
  methods: {
    isArray(b) {
      return Object.prototype.toString.call(b).slice(8, -1) === "Array";
    },
    handleChange() {
      if(this.form.textarea) {
        this.form.input = false
      }
      if(this.form.input) {
        this.form.textarea = false
      }
      let form = {
        ...this.form,
        height:this.form.height+'px',
        fontSize:this.form.fontSize+'px',
      }
      if(!this.form.id) {
        return false;
      }
      form.isInput = (form.input || form.textarea) || false
      Bus.$emit("changeTableAttr",form)
    },
    onReset() {
      this.$refs.form.resetFields();
      Bus.$emit("changeTableAttr",this.oldForm)
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form{
  padding:0 10px;
  box-sizing:border-box;
}
</style>