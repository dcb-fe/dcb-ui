const { kebabCase, memoize, dedent } = require('vtils');

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
      const demoMatches = token.content.match(
        /<demo\s+src=["']([^/]+?)\/([^/]+?)["']/,
      );
      if (demoMatches) {
        const [, $1, $2] = demoMatches;
        postRuns.unshift(() => {
          state.tokens.splice(
            index,
            1,
            ...md.parse(dedent`
              <div class="x-demo-container">

                <div>
                  <demo-${_kebabCase($1)}-${_kebabCase($2)} />
                </div>

                <<< @/src/components/${$1}/__demo__/${$2}.vue

              </div>
            `),
          );
        });
      }

      const apiMatches = token.content.match(/<api\s+src=["']([^/]+?)["']/);
      if (apiMatches) {
        const [, $1] = apiMatches;
        postRuns.unshift(() => {
          state.tokens.splice(
            index,
            1,
            ...md.parse(dedent`
              ### 属性

              <p><api-table src="${$1}" type="props" /></p>

              ### 插槽

              <p><api-table src="${$1}" type="slots" /></p>

              ### 事件

              <p><api-table src="${$1}" type="emits" /></p>
            `),
          );
        });
      }
    });
    postRuns.forEach(run => run());
    postRuns.length = 0;
  });
};
