<template>
  <basic-container>
    <div class="generator">
      <div class="generator-left">
        <el-card>
          <div slot="header" class="clearfix left-title">
            <span class="title">表格树</span>
          </div>
          <el-scrollbar style="height: 100%">
            <el-tree
              ref="tableTree"
              draggable
              default-expand-all
              highlight-current
              :expand-on-click-node="false"
              :data="tree_data"
              node-key="id"
              @node-contextmenu="rightKeyClick"
              @node-click="handleNodeClick"
              :props="defaultProps"
            ></el-tree>
          </el-scrollbar>
        </el-card>
      </div>
      <div class="generator-middle">
        <el-card class="box-card">
          <div slot="header" class="clearfix box-card-header">
            <span class="title">设计表格</span>
            <el-button style="float: right;" type="primary" size="small" @click="handleGenerator">预览</el-button>
            <el-button style="float: right;" type="primary" plain size="small" @click="handleSubmit">提交</el-button>
          </div>
          <div class="generator-table">
            <div class="generator-table-inner">
              <design-table
                :tree_data="tree_data[0]"
                :border-color="tableStyle.color"
                :border-width="tableStyle.width"
                :deep="0"
              />
            </div>
          </div>
        </el-card>
      </div>
      <div class="generator-right">
         <el-card class="box-card">
            <el-tabs v-model="activeName" stretch>
              <el-tab-pane label="属性" name="1">
                <el-scrollbar style="height:100%">
                  <attr-view />
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane label="表格整体设置" name="2">
                <table-view />
              </el-tab-pane>
            </el-tabs>
         </el-card>
      </div>
    </div>

    <div
      v-show="visible"
      id="perTreeMenu"
      :style="{ ...rightMenu }"
      class="contextmenu"
    >
      <div
        v-show="clickNode && clickNode.currentData.id !== '1'"
        class="contextMenu-item left-contextMenu-item"
        @click="handleAction(1)"
      >
        <span>插入同级表格</span>
      </div>
      <el-divider />
      <div
        class="contextMenu-item left-contextMenu-item"
        @click="handleAction(2)"
      >
        <span>插入子级表格</span>
      </div>
      <el-divider />
      <div
        v-show="clickNode && clickNode.currentData.id !== '1'"
        class="contextMenu-item left-contextMenu-item"
        @click="handleAction(3)"
      >
        <span>删除当前表格</span>
      </div>
      <el-divider />
      <div
        class="contextMenu-item left-contextMenu-item"
        @click="handleAction(4)"
      >
        <span>修改为竖型表格</span>
      </div>
      <el-divider />
      <div
        class="contextMenu-item left-contextMenu-item"
        @click="handleAction(5)"
      >
        <span>修改为水平表格</span>
      </div>
      <el-divider />
      <div
        class="contextMenu-item left-contextMenu-item"
        @click="handleAction(6)"
      >
        <span>水平平均分割子表格</span>
      </div>
    </div>


    <preview :show="previewShow" :borderColor="tableStyle.color" :borderWidth="tableStyle.width" :data="previewData" @confirm="handlePreviewConfirm"/>
  </basic-container>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import DesignTable from "./DesignTable.vue";
import AttrView from "./DesignAttribute/attrView.vue"
import TableView from "./DesignAttribute/tableView.vue"
import Preview from "./preview.vue"
import Bus from "../utils/bus.js";
import UrlParams from "../utils/urlParams";

import axios from "axios"
export default {
  name: "Design",
  components: {
    DesignTable,
    AttrView,
    TableView,
    Preview
  },
  props: {
    jsonData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      previewShow: false,
      previewData: [],
      activeName: "1",
      tableStyle: {
        color: "#000",
        width: 1,
      },
      defaultProps: {
        children: "children",
        label: "id",
      },
      rightMenu: {},
      visible: false,
      tree_data: [
        {
          type: "col",
          id: "1",
          title: "表格",
          children: [],
        },
      ],
      clickNode: null
    };
  },
  mounted() {
      Bus.$on('changeTableAttr',(e) => {
          this.changeTableData(this.tree_data, e)
      })
      Bus.$on('changeTable',(e) => {
        this.tableStyle = {
          color: e.borderColor,
          width: e.borderWidth
        }
      })

      
  },
  watch: {
    jsonData(e) {
      if(e && e.length > 0) {
        this.tree_data = e;
      }
      return e;
    }
  },
  methods: {
    handlePreviewConfirm() {
      this.previewShow = false
    },
    generatorUUId() {
        return uuidv4()
        .split("-")
        .join("");
    },
    handleNodeClick(e) {
      this.changeFocus(this.tree_data,e.id)
      Bus.$emit("changeTableNode", e);
    },
    rightKeyClick(e, a, c) {
      this.rightMenu = { top: e.pageY + "px", left: e.pageX + "px" };
      this.visible = true;
      this.clickNode = {
        currentNode: c,
        currentData: a
      }
      document.onclick = (ev) => {
        if (ev.target !== document.getElementById("perTreeMenu")) {
          this.visible = false;
          this.clickNode = null;
          this.changeTreeFocus(this.tree_data[0])
        }
      };
    },
    changeTableData(a, nodeData) {
      if (this.isArray(a) && a.length) {
        for (let i = 0; i < a.length; i++) {
          if (a[i].id === nodeData.id) {
            a[i].params = nodeData.params;
            a[i].subParams = nodeData.subParams;
            a[i].title = nodeData.title;
            a[i].width = nodeData.width;
            a[i].height = nodeData.height;
            a[i].subTitle = nodeData.subTitle;
            a[i].fontSize = nodeData.fontSize;
            a[i].fontColor = nodeData.fontColor;
            a[i].subTextAlign = nodeData.subTextAlign
            a[i].align = nodeData.textAlign
            a[i].fontWeight = nodeData.fontWeight
            a[i].isInput = nodeData.isInput;
            a[i].slotType = nodeData.input ? 'input' : ( nodeData.textarea ? 'textarea' : 'slot' )
          }
          if (a[i].children) {
            this.changeTableData(a[i].children, nodeData);
          }
        }
      }
    },
    /**
     * 修改状态
     */
    changeFocus(a, id) {
      if (this.isArray(a) && a.length) {
        for (let i = 0; i < a.length; i++) {
          if (a[i].id === id) {
            a[i].focus = a[i].focus ? false : true;
          } else {
            a[i].focus = false;
          }
          if (a[i].children) {
            this.changeFocus(a[i].children, id);
          }
        }
      }
    },
    /**
     * 修改所有叶子状态
     */
    changeTreeFocus(a) {
      if (this.isArray(a) && a.length) {
        for (let i = 0; i < a.length; i++) {
          a[i].focus = false;
          if (a[i].children) {
            this.changeTreeFocus(a[i].children);
          }
        }
      }
    },
    changeTreeType(a,id,type) {
        if (this.isArray(a) && a.length) {
            for (let i = 0; i < a.length; i++) {
                if(a[i].id === id) {
                    a[i].type = type;
                }
                if (a[i].children) {
                    this.changeTreeType(a[i].children,id,type);
                }
            }
        }
    },
    /**
     * 寻找父级节点路径
     */
    treeFindPath(tree, func, path = []) {
      if (!tree) return [];
      for (const data of tree) {
        path.push(data);
        if (func(data)) return path;
        if (data.children) {
          const findChildren = this.treeFindPath(data.children, func, path);
          if (findChildren.length) return findChildren;
        }
        path.pop();
      }
      return [];
    },
    changeCarveUpTree(a,id) {
      if (this.isArray(a) && a.length) {
        for (let i = 0; i < a.length; i++) {
          if (a[i].id === id) {
            a[i].children.forEach(item => {
              item.width = `${100 / a[i].children.length}%`
            })
          }
          if (a[i].children) {
            this.changeCarveUpTree(a[i].children,id);
          }
        }
      }
    },
    isArray(b) {
      return Object.prototype.toString.call(b).slice(8, -1) === "Array";
    },
    handleAction(e) {
      switch(e) {
          case 1:
              if(this.clickNode.currentData.id === '1') {
                  return false;
              }
              this.$refs.tableTree.insertAfter({
                    id: this.generatorUUId(),
                    type: "label",
                    focus: false,
                    subTitle: "",
                    title: "未命名",
                    width: "100%",
                    height: "40px",
                    subTextAlign: "center",
                    align: "center",
                    fontColor: "#000",
                    fontSize: "15px",
                    fontWeight: "normal",
                    isInput: false,
                    slotType: 'slot',
                    style: {},
                    params: null,
                    subParams: null,
                    children: []
                },this.clickNode.currentData.id)
              break;
          case 2:
              this.changeTreeType(this.tree_data,this.clickNode.currentData.id,'row')
              this.$refs.tableTree.append({
                    id: this.generatorUUId(),
                    type: "label",
                    focus: false,
                    subTitle: "",
                    title: "未命名",
                    width: "100%",
                    height: "40px",
                    subTextAlign: "center",
                    align: "center",
                    fontColor: "#000",
                    fontSize: "15px",
                    fontWeight: "normal",
                    style: {},
                    isInput: false,
                    slotType: 'slot',
                    params: null,
                    subParams: null,
                    children: []
                },this.clickNode.currentData.id)
              break;
        case 3:
            if(this.clickNode.currentData.id === '1') {
                  return false;
              }
            this.$refs.tableTree.remove(this.clickNode.currentNode)
            break;
        case 4:
            this.changeTreeType(this.tree_data,this.clickNode.currentData.id,'col')
            break;
        case 5:
            this.changeTreeType(this.tree_data,this.clickNode.currentData.id,'row')
            break;
        case 6:
            if(this.clickNode.currentData.type === 'row') {
              this.changeCarveUpTree(this.tree_data,this.clickNode.currentData.id)
            }
            break;
      }
    },
    handleGenerator() {
        this.previewData = this.tree_data
        this.previewShow = true;
        console.log(JSON.stringify(this.tree_data))
    },
    handleSubmit() {
      const kid = UrlParams('kid');
      if(kid) {
        axios.post("/oa-wkflow/form/json/save",{
          kid,
          json:JSON.stringify(this.tree_data)
        }).then(ret => {
          if(ret) {
            this.$message.success("提交成功")
          }
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.contextmenu {
  background: #fff;
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  border-radius: 4px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  .el-divider--horizontal {
    margin: 0;
  }
  .contextMenu-item {
    height: 46px;
    cursor: pointer;
    line-height: 46px;
    padding: 0 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:active{
        background: #0f82ff;
        color: #fff;
    }
    span {
      font-size: 14.3px;
    }
  }
}
.generator /deep/{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .el-card__body{
    padding: 0;
  }
  .el-tabs__item{
    height: 53px;
    line-height: 53px;
  }
  .el-card__header{
    padding: 10px 10px!important;
  }
  .generator-middle {
    width: 60%;
    position: absolute;
    top: 0;
    left: 20%;
    bottom: 0;
    box-sizing: border-box;
    border-left: 1px solid #eee;
    .title {
      font-size: 16px;
      font-weight: bolder;
    }
    .box-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .generator-table {
      display: flex;
      justify-content: center;
      align-items: center;
      .generator-table-inner {
        width: 90%;
      }
    }
  }
  .generator-left {
    width: 20%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    .el-scrollbar__wrap::-webkit-scrollbar {
      display: none;
    }
    .el-tree-node__content{
      height: 32px;
    }
    .left-title{
      height: 32px;
      line-height: 32px;
    }
  }
  .generator-right {
    width: 20%;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-left: 1px solid #eee;
    box-sizing: border-box;
    .el-scrollbar__wrap::-webkit-scrollbar {
      display: none;
    }
    .el-scrollbar__wrap{
      margin-right: 0!important;
    }
    .el-tabs{
      height: 100%;
    }
    .el-tabs__content{
      height: 100%;
    }
    .el-tab-pane{
      height: 100%;
    }
  }
  .high-block {
    border: 1px dotted #0f82ff !important;
  }
}
.border {
  border: 1px solid #000;
  cursor: pointer;
}
.border-active {
  border-color: #0f82ff !important;
}

</style>