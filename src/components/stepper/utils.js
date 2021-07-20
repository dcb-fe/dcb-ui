import Vue from 'vue';

export const isServer = Vue.prototype.$isServer;

export function isDef(value) {
  return value !== undefined && value !== null;
}

export function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}

export function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumber(value) ? `${value}px` : value;
}

export function isIOS() {
  /* istanbul ignore next */
  return isServer
    ? false
    : /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

export function getRootScrollTop() {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}
