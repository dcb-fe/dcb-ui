<template>
  <div class="list">
    <template v-if="!avatars.length">无</template>
    <div v-for="item in avatars" v-else :key="item.username" class="item">
      <img
        class="avatar"
        :src="item.url"
        :title="item.username"
        @click="handleClick(item)"
      />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { uniqBy } from 'vtils';

  export default Vue.extend({
    props: {
      src: {
        type: String,
        required: true,
      },
    },

    data: () => ({
      // username, url
      avatars: [],
    }),

    async mounted() {
      const list = uniqBy(
        (
          await Promise.all(
            ['.vue', '.md', '.test.js'].map(async ext => {
              const res = await fetch(
                `https://proapi.azurewebsites.net/doc/getAvatarList?filename=src/components/${this.src}/${this.src}${ext}&owner=dcb-fe&repo=dcb-ui`,
                {
                  mode: 'cors',
                },
              );
              const list = await res.json();
              return Array.isArray(list) ? list : [];
            }),
          )
        ).flat(),
        item => item.username,
      );
      this.avatars = list;
    },

    methods: {
      handleClick(item) {
        window.open(`https://github.com/${item.username}`, '_target');
      },
    },
  });
</script>

<style lang="scss" scoped>
  .list {
    margin-top: -6px;
    margin-left: -6px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .item {
      margin-top: 6px;
      margin-left: 6px;
      user-select: none;
      cursor: pointer;
      display: flex;

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
  }
</style>
