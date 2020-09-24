<template>
  <div>
    <generator-table :tree_data="data[0]" :deep="0"> </generator-table>
  </div>
</template>

<script>
import GeneratorTable from "./DesignTable";
import RenderFunc from "../utils/renderTable";
export default {
  components: {
    GeneratorTable,
  },
  data() {
    return {
      jsonList: {
        "oa-list-0": [
          {
            $index: 0,
            $cellEdit: true,
            "oa-list-0-col-0": "1",
            "oa-list-0-col-1": "2",
          },
          {
            $index: 1,
            $cellEdit: true,
            "oa-list-0-col-0": "3",
            "oa-list-0-col-1": "4",
          },
        ],
        oatextfiled5: "否",
        oatextfiled6: "飞机",
        $oatextfiled5: "否",
        $oatextfiled6: "飞机",
        "oa-text-filed-0": "2020-09-24",
        "oa-text-filed-1": "2020-09-24",
        "oa-text-filed-2": "5",
        "oa-text-filed-3": "6",
        "oa-text-filed-4": "7",
        "oa-text-filed-7": "sdf",
      },
      data: [
        {
          type: "col",
          id: "1",
          title: "表格",
          children: [
            {
              id: "a2d3f32a4bed4ec2ade267b87d4d4157",
              type: "label",
              focus: false,
              subTitle: "",
              title: "未命名",
              width: "33.333333333333336%",
              height: "40px",
              subTextAlign: "center",
              align: "center",
              fontColor: "#000",
              fontSize: "15px",
              fontWeight: "normal",
              style: {},
              isInput: false,
              slotType: "slot",
              params: null,
              subParams: null,
              children: [],
            },
            {
              id: "28f3a01c1483475fa05767957ff245d1",
              type: "row",
              focus: false,
              subTitle: "",
              title: "未命名",
              width: "33.333333333333336%",
              height: "40px",
              subTextAlign: "center",
              align: "center",
              fontColor: "#000",
              fontSize: "15px",
              fontWeight: "normal",
              style: {},
              isInput: false,
              slotType: "slot",
              params: null,
              subParams: null,
              children: [
                {
                  id: "1eaddd27345c4ce79dacd72cf9fafa18",
                  type: "label",
                  focus: false,
                  subTitle: "",
                  title: "未命名",
                  width: "33.333333333333336%",
                  height: "40px",
                  subTextAlign: "center",
                  align: "center",
                  fontColor: "#000",
                  fontSize: "15px",
                  fontWeight: "normal",
                  style: {},
                  isInput: false,
                  slotType: "slot",
                  params: null,
                  subParams: null,
                  children: [],
                },
                {
                  id: "a33132b00d934481b8c091611991fbc4",
                  type: "label",
                  focus: true,
                  title: "未命名",
                  width: "33.333333333333336%",
                  height: "40px",
                  subTextAlign: "center",
                  align: "center",
                  fontColor: "#000",
                  fontSize: "15px",
                  fontWeight: "normal",
                  style: {},
                  isInput: false,
                  slotType: "slot",
                  params: "oa-list-0",
                  subParams: null,
                  children: [],
                },
                {
                  id: "ed5b22df84d7401c8c7d3c1bf17b8e7d",
                  type: "label",
                  focus: false,
                  subTitle: "",
                  title: "未命名",
                  width: "33.333333333333336%",
                  height: "40px",
                  subTextAlign: "center",
                  align: "center",
                  fontColor: "#000",
                  fontSize: "15px",
                  fontWeight: "normal",
                  style: {},
                  isInput: false,
                  slotType: "slot",
                  params: null,
                  subParams: null,
                  children: [],
                },
              ],
            },
            {
              id: "5121eacae3a14255b04e0dbb98b34a70",
              type: "label",
              focus: false,
              subTitle: "",
              title: "未命名",
              width: "33.333333333333336%",
              height: "40px",
              subTextAlign: "center",
              align: "center",
              fontColor: "#000",
              fontSize: "15px",
              fontWeight: "normal",
              style: {},
              isInput: false,
              slotType: "slot",
              params: null,
              subParams: null,
              children: [],
            },
          ],
          focus: false,
        },
      ],
    };
  },
  mounted() {
    RenderFunc(this.jsonList, this.data);
    console.log(JSON.stringify(this.data))
  },
};
</script>

<style>
</style>