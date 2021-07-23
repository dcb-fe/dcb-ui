<template>
  <d-address-list 
  v-model="chosenAddressId" 
  :list="list" 
  @chose-default="handleChose"
  @delete="handleDelete"
  @edit="handleEdit"
  @select="handleSelect"
  @add="handleAdd"
  >
  </d-address-list>
</template>

<script>
  export default {
    data () {
      return {
        chosenAddressId: '1',
        list: [
          {
            id: '1',
            receiver: '张三',
            phoneNo: '13000000000',
            detail: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
            defaultFlag: true,
            serviceFlag: false
          },
          {
            id: '2',
            receiver: '李四',
            phoneNo: '1310000000',
            detail: '浙江省杭州市拱墅区莫干山路 50 号',
            defaultFlag: false,
            serviceFlag: true
          },
          {
            id: '3',
            receiver: '王五',
            phoneNo: '1310000000',
            detail: '浙江省杭州市拱墅区莫干山路 50 号',
            defaultFlag: false,
            serviceFlag: false
          },
          {
            id: '4',
            receiver: '王五',
            phoneNo: '1310000000',
            detail: '浙江省杭州市拱墅区莫干山路 50 号',
            defaultFlag: false,
            serviceFlag: false
          },
        ]
      }
    },

    methods: {
      handleChose (label, item, index) {
        console.log(label, item, index);
      },

      handleDelete (item, index) {
        // 删除接口处理交互逻辑
        this.list = this.list.filter((item, key) => key !== index);
      },

      handleEdit (item, index) {
        console.log(item, index);
        // 跳转编辑页面路由地址
      },

      handleSelect (item, index) {
        // 处理选中地址后的逻辑
        console.log(item, index);
      },

      // 添加地址
      handleAdd () {
        // 切换编辑路由地址
      }
    },
  };
</script>
