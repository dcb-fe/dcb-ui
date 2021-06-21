// const fs = require('fs');

module.exports = (
  /**
   * @type {import('markdown-it')}
   */
  md,
) => {
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args;
    const token = tokens[idx];
    const src = token.src;
    if (src) {
      token.content = `-------- ${src} =========`;
    }
    return fence(...args);
  };

  md.block.ruler.before('fence', 'demo', state => {
    if (state.src.includes('@@')) {
      console.log(state.src);
      throw state.src;
    }
    return state.src.startsWith('@@');
  });
};
