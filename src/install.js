import * as components from './components';

export function install(Vue) {
  Object.keys(components).forEach(key => {
    Vue.use(components[key]);
  });
}
