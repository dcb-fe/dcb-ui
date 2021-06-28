<template>
  <div>
    <select v-model="selectedComponents" class="select" multiple>
      <option v-for="item in components" :key="item.name" :value="item.name">
        {{ `${item.name} ${item.cname}` }}
      </option>
    </select>
    <textarea v-model="imports" rows="6" class="textarea" disabled />
    <button class="button" @click="handleCopyClick">复制按需引入代码</button>
  </div>
</template>

<script>
  import { copyTextToClipboard, dedent } from 'vtils';
  import { meta } from '@/meta';

  export default {
    data: () => ({
      selectedComponents: [],
    }),
    computed: {
      components() {
        return meta.componentGroups.map(group => group.list).flat();
      },
      imports() {
        return dedent`
          // 按需引入多彩宝移动端组件库
          import { ${this.selectedComponents.join(', ')} } from '@dcbfe/ui';
          ${this.selectedComponents.map(name => `Vue.use(${name});`).join('\n')}
        `;
      },
    },
    methods: {
      handleCopyClick() {
        copyTextToClipboard(this.imports);
        alert('复制成功');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .select {
    width: 100%;
    outline: none;
  }

  .textarea {
    margin-top: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .button {
    margin-top: 6px;
    cursor: pointer;
  }
</style>
