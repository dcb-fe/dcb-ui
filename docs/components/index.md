# 组件列表

<table>
  <thead>
    <tr>
      <td>分类</td>
      <td>列表</td>
    </tr>
  </thead>
  <tbody>
    <tr v-for="group in groups" :key="group.title">
      <td>{{ group.title }}</td>
      <td>
        <div :class="$style.list">
          <template v-for="item in group.list">
            <a
              :href="`/components/${snakeCase(item.name)}.html`"
              :key="item.name"
              @click.prevent="handleClick(item)">
              {{ item.name }}
            </a>
            <span :class="$style.divider" :key="item.name">,</span>
          </template>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<script>
  import { meta } from '@/meta'
  import { snakeCase, memoize } from 'vtils'

  export default {
    data: () => ({
      groups: meta.componentGroups,
      snakeCase: memoize(snakeCase),
    }),

    methods: {
      handleClick(item) {
        this.$router.push({
          path: `/components/${this.snakeCase(item.name)}.html`
        })
      }
    }
  }
</script>

<style lang="scss" module>
  .list {
    display: flex;
    flex-wrap: wrap;

    .divider {
      margin-right: 4px;

      &:last-child {
        display: none;
      }
    }
  }
</style>
