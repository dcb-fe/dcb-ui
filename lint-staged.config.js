module.exports = {
  '*.{css,less,scss,sass,html,htm,yml,yaml,json,md}': ['prettier --write'],
  '*.{js,jsx,ts,tsx,.vue}': ['eslint --fix', 'prettier --write'],
};
