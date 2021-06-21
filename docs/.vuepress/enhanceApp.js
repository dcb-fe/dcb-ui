import * as DcbUI from '../../src';
import * as demos from './demo';

export default ({ Vue }) => {
  Vue.use(DcbUI);
  Object.keys(demos).forEach(name => {
    Vue.component(name, demos[name]);
  });
};
