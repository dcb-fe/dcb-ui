<template>
  <table v-if="type === 'props' && componentProps.length">
    <thead>
      <tr>
        <td :class="$style.name">名称</td>
        <td :class="$style.desc">说明</td>
        <td>类型</td>
        <td>默认值</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="prop in componentProps" :key="prop.name">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <td :class="$style.name">
          {{ prop.name }}
          <div :class="$style.tags">
            <div
              v-if="prop.isModelProp"
              :class="$style.tag"
              title="可使用 v-model 双向绑定"
            >
              v-model
            </div>
          </div>
        </td>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <td v-html="prop.desc" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <td v-html="prop.typeText" />
        <td>
          <div v-if="prop.isRequired" :class="$style.required">必填</div>
          <template v-else>{{ prop.default }}</template>
        </td>
      </tr>
    </tbody>
  </table>
  <table v-else-if="type === 'slots' && componentSlots.length">
    <thead>
      <tr>
        <td :class="$style.name">名称</td>
        <td :class="$style.desc">说明</td>
        <td>参数</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="slot in componentSlots" :key="slot.name">
        <td>{{ slot.name }}</td>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <td v-html="slot.desc" />
        <td>
          <template v-if="!slot.params.length">无</template>
          <table v-else>
            <thead>
              <tr>
                <td :class="$style.name">名称</td>
                <td>说明</td>
                <td>类型</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="param in slot.params" :key="param.name">
                <td>{{ param.name }}</td>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <td v-html="param.desc" />
                <!-- eslint-disable-next-line vue/no-v-html -->
                <td v-html="param.typeText" />
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table v-else-if="type === 'emits' && componentEmits.length">
    <thead>
      <tr>
        <td :class="$style.name">名称</td>
        <td :class="$style.desc">说明</td>
        <td>参数</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="emit in componentEmits" :key="emit.name">
        <td>{{ emit.name }}</td>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <td v-html="emit.desc" />
        <td>
          <template v-if="!emit.params.length">无</template>
          <table v-else>
            <thead>
              <tr>
                <td :class="$style.name">名称</td>
                <td>说明</td>
                <td>类型</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="param in emit.params" :key="param.name">
                <td>{{ param.name }}</td>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <td v-html="param.desc" />
                <!-- eslint-disable-next-line vue/no-v-html -->
                <td v-html="param.typeText" />
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>无</div>
</template>

<script>
  import * as components from './ui';
  import Vue from 'vue';
  import { pascalCase } from 'vtils';

  export default Vue.extend({
    props: {
      src: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['props', 'slots', 'emits'],
        required: true,
      },
    },

    computed: {
      componentName() {
        return pascalCase(this.src);
      },
      componentProps() {
        const props = components[this.componentName].props;
        const model = {
          prop: 'value',
          event: 'input',
          ...components[this.componentName].model,
        };
        const getType = prop => {
          return Array.isArray(prop.enum)
            ? prop.enum.map(item => `<code>${item}</code>`).join(' | ')
            : typeof prop.type === 'function'
            ? prop.type.name.toLowerCase()
            : Array.isArray(prop.type)
            ? prop.type
                .map(type =>
                  getType({
                    ...prop,
                    type: type,
                  }),
                )
                .join(' | ')
            : 'any';
        };
        return Object.keys(props || {}).map(key => ({
          name: key,
          isModelProp: model.prop === key,
          isRequired: !!props[key].required,
          typeText: getType(props[key]),
          ...props[key],
        }));
      },
      componentSlots() {
        const slots = components[this.componentName].slots;
        return Object.keys(slots || {}).map(key => ({
          name: key,
          params: Object.keys(slots[key].payload || {}).map(k => ({
            name: k,
            typeText: Array.isArray(slots[key].payload[k].enum)
              ? slots[key].payload[k].enum
                  .map(item => `<code>${item}</code>`)
                  .join(' | ')
              : typeof slots[key].payload[k].type === 'function'
              ? slots[key].payload[k].type.name.toLowerCase()
              : 'any',
            ...slots[key].payload[k],
          })),
          ...slots[key],
        }));
      },
      componentEmits() {
        const emits = components[this.componentName].emits;
        return Object.keys(emits || {}).map(key => ({
          name: key,
          params: Object.keys(emits[key].payload || {}).map(k => ({
            name: k,
            typeText: Array.isArray(emits[key].payload[k].enum)
              ? emits[key].payload[k].enum
                  .map(item => `<code>${item}</code>`)
                  .join(' | ')
              : typeof emits[key].payload[k].type === 'function'
              ? emits[key].payload[k].type.name.toLowerCase()
              : 'any',
            ...emits[key].payload[k],
          })),
          ...emits[key],
        }));
      },
    },
  });
</script>

<style lang="scss" module>
  thead {
    td {
      white-space: nowrap;
    }
  }

  .name {
    width: 4em;
    white-space: nowrap;

    .tags {
      display: flex;
      align-items: center;

      .tag {
        background-color: #d2d0d0;
        padding: 4px;
        border-radius: 4px;
        line-height: 1;
        font-size: 12px;
      }
    }
  }

  .required {
    display: inline-flex;
    background-color: #fdec58;
    padding: 4px;
    border-radius: 4px;
    line-height: 1;
    font-size: 12px;
  }

  .desc {
    width: 20em;
  }
</style>
