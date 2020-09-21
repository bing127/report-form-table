<template>
  <div class="table-wrapper" style="height:100%">
    <table
      class="infinite-split-table"
      :style="{
        borderLeft: `${deep === 0 ? borderWidth : 0}px solid ${borderColor}`,
        borderTop: `${deep === 0 ? borderWidth : 0}px solid ${borderColor}`,
      }"
      :class="{ 'top-border': deep == 0, 'left-border': deep == 0 }"
    >
      <template>
        <tr
          v-for="line in for_data"
          :key="line.id"
          style="width: 100%;"
          :style="{
            height:
              typeof line[0].height != 'undefined' ? line[0].height : 'auto',
          }"
        >
          <td
            rowspan="1"
            colspan="1"
            v-for="item in line"
            :key="item.id"
            :style="{
              width: typeof item.width != 'undefined' ? item.width : 'auto',
            }"
          >
            <div
              v-if="item.type != 'row' && item.type != 'col'"
              :style="{
                borderRight: `${borderWidth}px solid ${borderColor}`,
                borderBottom: `${borderWidth}px solid ${borderColor}`,
                ...item.style,
              }"
              class="text"
            >
              <span v-if="item.isInput === true" name="label" class="cell">
                <input
                  v-if="item.slotType === 'input'"
                  type="text"
                  :style="{ textAlign: item.align }"
                />
                <textarea v-else :style="{ textAlign: item.align }" />
              </span>
              <div class="cell" v-if="!item.isInput">
                <div
                  :style="{
                    paddingBottom: '1px',
                    textAlign: item.align,
                    fontSize: item.fontSize ? item.fontSize : '14px',
                    fontWeight: item.fontWeight ? item.fontWeight : 'normal',
                    color: item.fontColor ? item.fontColor : '#333',
                    height: '100%',
                    width: '100%',
                  }"
                >
                  <div v-if="item.params" style="height:100%;height:100%;display:flex;align-items: center;">
                    <ul
                      class="mp-list"
                      v-if="isArray(item.params)"
                      :class="
                        item.params.length <= 1
                          ? 'mp-list1'
                          : item.params.length === 2
                          ? 'mp-list2'
                          : 'mp-list3'
                      ">
                      <li v-for="(v, k) in item.params" :key="k" v-text="v"></li>
                    </ul>
                    <ul
                      class="mp-list"
                      v-else-if="isObject(item.params)"
                      :class="
                        objectLength(item.params) <= 1
                          ? 'mp-list1'
                          : objectLength(item.params) === 2
                          ? 'mp-list2'
                          : 'mp-list3'
                      "
                    >
                      <li v-for="(v, k) of item.params" :key="k" v-text="v"></li>
                    </ul>
                    <span
                      :style="{
                        textAlign: item.align,
                      }"
                      v-else
                      v-html="item.params"
                    ></span>
                  </div>
                  <div v-else style="height:100%;display:flex;align-items: center;">
                    <span
                      :style="{
                        textAlign: item.align,
                      }"
                      v-html="item.title"
                    ></span>
                  </div>
                </div>

                <span
                  v-if="item.subTitle && item.subTitle.length"
                  class="sub"
                  v-html="item.subTitle"
                  :style="{
                    textAlign: item.subTextAlign,
                  }"
                ></span>
              </div>
            </div>
            <!--递归调用-->
            <generator-table
              v-else
              :border-color="borderColor"
              :border-width="borderWidth"
              :tree_data="item"
              :deep="deep + 1"
            ></generator-table>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script>
export default {
  name: "GeneratorTable",
  props: {
    tree_data: Object,
    deep: Number,
    borderColor: {
      type: String,
      default: "#000000",
    },
    borderWidth: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      actualWidth: null,
    };
  },
  computed: {
    for_data() {
      if (this.tree_data) {
        let type = this.tree_data.type;
        let data = this.tree_data.children;
        let result = [];
        if (type === "row") {
          result.push(data);
        } else if (type === "col") {
          for (let i = 0; i < data.length; i++) {
            result.push([data[i]]);
          }
        }
        return result;
      }
    },
  },
  methods: {
    isArray(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Array";
    },
    isObject(e) {
      return Object.prototype.toString.call(e).slice(8, -1) === "Object";
    },
    objectLength(obj) {
      return Object.keys(obj).length;
    },
    isEmpty(e) {
      if (
        !e ||
        e === null ||
        e === undefined ||
        e === "" ||
        e === {} ||
        e === []
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
ul li {
  list-style: none;
}
ul {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.mp-list1 {
  position: relative;
  overflow: hidden;
  z-index: 0;
  background-color: #fff;
}
.mp-list1:before {
  content: "";
  position: absolute;
  width: 100%;
  left: 100%;
  height: 100%;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.mp-list1 li {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: -1px;
  float: left;
  position: relative;
  box-sizing: border-box;
  z-index: 10;
  color: #212121;
}

.mp-list3 {
  position: relative;
  overflow: hidden;
  z-index: 0;
  background-color: #fff;
}
.mp-list3:before {
  content: "";
  position: absolute;
  width: 33.3333333333333333333333333%;
  left: 33.3333333333333333333333333%;
  height: 100%;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.mp-list3 li {
  width: 33.3333333333333333333333333%;
  height: 40px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: -1px;
  float: left;
  position: relative;
  z-index: 10;
  color: #212121;
}

.mp-list2 {
  position: relative;
  overflow: hidden;
  z-index: 0;
  background-color: #fff;
}
.mp-list2:before {
  content: "";
  position: absolute;
  width: 50%;
  left: 50%;
  height: 100%;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.mp-list2 li {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: -1px;
  float: left;
  position: relative;
  z-index: 10;
  color: #212121;
  box-sizing: border-box;
}

.infinite-split-table {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.left-border {
  border-left: 1px solid black;
}
.top-border {
  border-top: 1px solid black;
}
.text {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  height: 100%;
  min-height: 40px;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  justify-content: center;
  align-items: center;
}
.text input {
  min-height: 39px;
  height: 100%;
  border: none;
  box-sizing: border-box;
  width: 100%;
}
.text textarea {
  height: 100%;
  border: none;
  box-sizing: border-box;
  width: 100%;
  resize: none;
}
input:focus {
  border: none;
  outline: none;
  border-width: 0;
}
textarea:focus {
  border: none;
  outline: none;
  border-width: 0;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 1px;
}
.cell span {
  display: inline-block;
  width: 100%;
  text-align: center;
}
.cell input {
  width: 100%;
}
.sub {
  margin-top: 5px;
}
tr,
td {
  cursor: pointer;
  position: relative;
  padding: 0;
}

.m-select {
  position: absolute;
  top: -15px;
  right: calc((100% - 33px) / 2);
  z-index: 999;
}
.high {
  box-shadow: inset 0px 0px 4px #0f82ff;
}
.infinite-split-table {
  border-spacing: 0;
}
</style>
