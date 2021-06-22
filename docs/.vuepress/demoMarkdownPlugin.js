const { kebabCase, memoize } = require('vtils');
const path = require('path');

const _kebabCase = memoize(kebabCase);

module.exports = (
  /**
   * @type {import('markdown-it')}
   */
  md,
) => {
  md.core.ruler.at('replacements', state => {
    const postRuns = [];
    state.tokens.forEach((token, index) => {
      const matches = token.content.match(
        /<demo\s+src=["']([^/]+)\/([^/]+)["']/,
      );
      if (matches) {
        token.type = 'html_inline';
        token.content = `<demo-${_kebabCase(matches[1])}-${_kebabCase(
          matches[2],
        )} /> `;
        postRuns.unshift(() => {
          state.tokens.splice(
            index,
            1,
            {
              type: 'html_block',
              content: '<div class="x-demo-container">',
            },
            {
              type: 'html_block',
              content: '<div>',
            },
            token,
            {
              type: 'html_block',
              content: '</div>',
            },
            {
              type: 'fence',
              info: 'vue',
              src: path.join(
                __dirname,
                `../../src/components/${matches[1]}/__demo__/${matches[2]}.vue`,
              ),
              markup: '```',
            },
            {
              type: 'html_block',
              content: '</div>',
            },
          );
        });
      }
    });
    postRuns.forEach(run => run());
    postRuns.length = 0;
  });
};
