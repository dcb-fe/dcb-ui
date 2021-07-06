<template>
  <ul class="icon-list">
    <li v-for="(item, index) in types" :key="index">
      <d-icon :type="item" size="24px" @click="handleClick(item)"/>
      <p>{{item}}</p>
    </li>
  </ul>
</template>

<script>
  import Icon from '@/components/icon/icon.vue'

  export default {
    data () {
      return {
        types: Icon.props.type.enum
      }
    },
    methods: {
      handleClick (text) {
        console.log(text);
      }
    }
  };
</script>

<style lang="scss">
  .icon-list {
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      border: 1px solid #e8e8e8;
      height: 100px;
      flex: 0 0 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 5px 0;

      p {
        font-size: 12px;
        white-space: nowrap;
      }
    }
  }
</style>
