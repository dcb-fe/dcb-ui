<template>
  <ul class="list">
    <li
      v-for="item in icons"
      :key="item"
      class="item"
      @click="handleClick(item)"
    >
      <d-icon :name="item" class="icon" />
      <div class="name">{{ item }}</div>
    </li>
  </ul>
</template>

<script>
  import { copyTextToClipboard } from 'vtils';
  import { Icon } from '@dcbfe/ui';

  export default {
    data() {
      return {
        icons: Icon.props.name.enum,
      };
    },
    methods: {
      handleClick(name) {
        copyTextToClipboard(`<d-icon name="${name}" />`);
        alert('已复制');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      border: 1px solid #e8e8e8;
      height: 100px;
      flex: 0 0 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 5px 0;
      cursor: pointer;
      background-color: white;
      border-radius: 4px;

      .icon {
        font-size: 24px;
      }

      .name {
        font-size: 12px;
        white-space: nowrap;
      }

      &:active {
        background-color: mix(black, white, 10%);
      }
    }
  }
</style>
