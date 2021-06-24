/**
 * @param {String} content
 */
module.exports.readVersion = content => {
  return content.match(/version:\s*'(.+?)',/)[1];
};

/**
 * @param {String} content
 * @param {String} version
 */
module.exports.writeVersion = (content, version) => {
  return content.replace(new RegExp(/(?<=version:\s*').+?(?=',)/), version);
};
