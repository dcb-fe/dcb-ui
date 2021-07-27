import Vue from 'vue';

export const isServer = Vue.prototype.$isServer;

export function isAndroid() {
  /* istanbul ignore next */
  return isServer ? false : /android/.test(navigator.userAgent.toLowerCase());
}

export function isIOS() {
  /* istanbul ignore next */
  return isServer
    ? false
    : /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}
